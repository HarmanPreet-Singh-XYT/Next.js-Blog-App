
import { GetBookmark } from "@/actions/bookmark/get-bookmark";
import { seoData } from "@/config/root/seo";
import { getOgImageUrl, getUrl } from "@/lib/utils";
import {
  CommentWithProfile,
  PostWithCategoryWithProfile,
} from "@/types/collection";
import { createClient } from "@/utils/supabase/server";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import readingTime, { ReadTimeResults } from "reading-time";
import { cache } from "react";
import { BlogDetailComments } from '../../../blogcomp';
import { BlogDetailHeader } from "@/components/detail/post/BlogDetailHeader";
import Image from "next/image";
export const revalidate = 3600; // Revalidate every hour instead of on every request

interface PostPageProps {
  params: {
    slug: string[];
  };
}

interface UserSession {
  username: string | null;
  profileImage: string | null;
  userId: string | null;
}

interface PostData {
  post: PostWithCategoryWithProfile;
  comments: CommentWithProfile[];
  readTime: ReadTimeResults;
  isBookmarked: boolean;
  userSession: UserSession;
}

// Cache the post data to avoid redundant database calls
const getCachedPost = cache(async (slug: string): Promise<PostWithCategoryWithProfile | null> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data: post, error } = await supabase
      .from("posts")
      .select(`*, categories(*), profiles(*)`)
      .match({ slug, published: true })
      .single<PostWithCategoryWithProfile>();

    if (error) {
      console.error("Error fetching post:", error);
      return null;
    }

    return post;
  } catch (error) {
    console.error("Unexpected error fetching post:", error);
    return null;
  }
});

// Cache comments to improve performance
const getCachedComments = cache(async (postId: string): Promise<CommentWithProfile[]> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  try {
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*, profiles(*)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true })
      .returns<CommentWithProfile[]>();

    if (error) {
      console.error("Error fetching comments:", error);
      return [];
    }

    return comments || [];
  } catch (error) {
    console.error("Unexpected error fetching comments:", error);
    return [];
  }
});

// Enhanced bookmark function with better error handling
async function getBookmarkStatus(postId: string, userId?: string): Promise<boolean> {
  if (!postId || !userId) {
    return false;
  }

  try {
    const bookmark = {
      id: postId,
      user_id: userId,
    };
    const response = await GetBookmark(bookmark);
    return Boolean(response);
  } catch (error) {
    console.error("Error fetching bookmark status:", error);
    return false;
  }
}

// Enhanced user session function
async function getUserSession(): Promise<UserSession> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error getting session:", error);
      return { username: null, profileImage: null, userId: null };
    }

    if (!session?.user) {
      return { username: null, profileImage: null, userId: null };
    }

    const username = session.user.user_metadata?.full_name || null;
    const profileImage = session.user.user_metadata?.picture || 
                        session.user.user_metadata?.avatar_url || null;
    const userId = session.user.id;

    return { username, profileImage, userId };
  } catch (error) {
    console.error("Unexpected error getting session:", error);
    return { username: null, profileImage: null, userId: null };
  }
}

// Centralized data fetching function
async function getPostData(params: { slug: string[] }): Promise<PostData | null> {
  const slug = params?.slug?.join("/");
  
  if (!slug) {
    return null;
  }

  const post = await getCachedPost(slug);
  
  if (!post) {
    return null;
  }

  // Fetch data in parallel for better performance
  const [comments, userSession] = await Promise.all([
    getCachedComments(post.id),
    getUserSession(),
  ]);

  const isBookmarked = await getBookmarkStatus(post.id, userSession.userId || undefined);
  const readTime = readingTime(post.content || "");

  return {
    post,
    comments,
    readTime,
    isBookmarked,
    userSession,
  };
}

// Enhanced metadata generation with better error handling
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const slug = params?.slug?.join("/");
    const post = await getCachedPost(slug);

    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested post could not be found.",
      };
    }

    const truncateDescription = post.description 
      ? `${post.description.slice(0, 100)}${post.description.length > 100 ? "..." : ""}`
      : "Read this interesting post";
    
    const postSlug = `/posts/${post.slug}`;
    const fullUrl = `${getUrl()}${postSlug}`;

    const ogImageUrl = getOgImageUrl(
      post.title || "Untitled Post",
      truncateDescription,
      post.categories?.title ? [post.categories.title] : ["General"],
      postSlug,
    );

    return {
      title: post.title || "Untitled Post",
      description: post.description || truncateDescription,
      authors: {
        name: seoData.author.name,
        url: seoData.author.twitterUrl,
      },
      openGraph: {
        title: post.title || "Untitled Post",
        description: post.description || truncateDescription,
        type: "article",
        url: fullUrl,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: post.title || "Post image",
          },
        ],
        publishedTime: post.created_at || undefined,
        modifiedTime: post.updated_at || undefined,
        authors: [post.profiles?.full_name || "Unknown Author"],
        section: post.categories?.title || "General",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title || "Untitled Post",
        description: post.description || truncateDescription,
        images: [ogImageUrl],
        creator: `@${seoData.author.name}`,
      },
      alternates: {
        canonical: fullUrl,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error Loading Post",
      description: "There was an error loading this post.",
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    // Validate params
    if (!params?.slug || params.slug.length === 0) {
      notFound();
    }

    const postData = await getPostData(params);

    if (!postData) {
      notFound();
    }

    const { post, comments, readTime, isBookmarked, userSession } = postData;
    // Construct the post URL
    const postUrl = `${getUrl()}/posts/${post.slug}`;

    // Format the date safely
    const formattedDate = post.updated_at 
      ? format(parseISO(post.updated_at), "MMMM dd, yyyy")
      : post.created_at 
        ? format(parseISO(post.created_at), "MMMM dd, yyyy")
        : "";

    const data:PostData = {
        post,
        comments,
        readTime,
        isBookmarked,
        userSession
    }
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative">
        <Image 
          src={post.image as string} 
          alt={post.title as string}
          width={1200} // You need to specify width
          height={384} // 384px = h-96 (96 * 0.25rem * 16px/rem)
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Article Header */}
        <BlogDetailHeader date={formattedDate} data={data}/>

        {/* Article Content */}
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8 shadow-lg">
          <div className="prose prose-lg prose-invert max-w-none">
            {/* Post Content */}
              <main className="relative mx-auto border-slate-500/50 py-5">
                {post.content_html ? (
                  <div
                    className="prose prose-lg max-w-none prose-invert"
                    dangerouslySetInnerHTML={{ __html: post.content_html }}
                />
                ) : (
                  <div className="text-gray-300 italic">
                    No content available for this post.
                  </div>
                )}
              </main>
          </div>
        </div>

        {/* Comments Section */}
            <BlogDetailComments post={post} user={userSession} comments={comments}/>
          <div className='h-16'></div>
      </div>
    </div>
  );
  } catch (error) {
    console.error("Unexpected error in PostPage:", error);
    
    // Fallback error handling - redirect to a generic error page or show not found
    notFound();
  }
};

