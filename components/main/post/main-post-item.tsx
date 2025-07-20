import { mainPostConfig } from "@/config/main";
import { getMinutes, shimmer, toBase64 } from "@/lib/utils";
import { Comment, PostWithCategoryWithProfile } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Clock10Icon, MessageCircleIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import readingTime from "reading-time";

export const dynamic = "force-dynamic";

// Types
interface MainPostItemProps {
  post: PostWithCategoryWithProfile;
}

interface PostMetadata {
  formattedDate: string;
  readingMinutes: number;
  commentCount: number;
}

// Constants
const DEFAULT_AVATAR = "/images/avatar.png";
const DEFAULT_COVER = "/images/not-found.jpg";

// Helper functions
async function getComments(postId: string): Promise<Comment[] | null> {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { data: comments, error } = await supabase
      .from("comments")
      .select()
      .eq("post_id", postId)
      .order("created_at", { ascending: true })
      .returns<Comment[]>();

    if (error) {
      console.error("Failed to fetch comments:", error.message);
      return null;
    }
    
    return comments;
  } catch (error) {
    console.error("Error in getComments:", error);
    return null;
  }
}

// Subcomponents
const CategoryBadge: React.FC<{ category: string }> = ({ category }) => (
  <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 transition-colors hover:bg-gray-200">
    {category}
  </span>
);

const MetadataItem: React.FC<{ icon: React.ElementType; value: string | number }> = ({ 
  icon: Icon, 
  value 
}) => (
  <div className="inline-flex items-center text-gray-500">
    <Icon className="h-4 w-4" />
    <span className="ml-1">{value}</span>
  </div>
);

const PostMetadata: React.FC<{ 
  metadata: PostMetadata; 
  category: string; 
  isMobile?: boolean 
}> = ({ metadata, category, isMobile = false }) => {
  const dateFormat = isMobile ? "dd/MM/yyyy" : "MMMM dd, yyyy";
  
  return (
    <div className={`flex items-center gap-x-3 text-sm ${isMobile ? 'sm:hidden' : 'hidden sm:flex'}`}>
      {isMobile && <CategoryBadge category={category} />}
      <MetadataItem 
        icon={CalendarIcon} 
        value={format(parseISO(metadata.formattedDate), dateFormat)} 
      />
      <MetadataItem 
        icon={Clock10Icon} 
        value={getMinutes(metadata.readingMinutes)} 
      />
      {!isMobile && (
        <MetadataItem 
          icon={MessageCircleIcon} 
          value={metadata.commentCount} 
        />
      )}
    </div>
  );
};

const AuthorInfo: React.FC<{ 
  avatarUrl?: string; 
  fullName?: string; 
  role?: string 
}> = ({ avatarUrl, fullName, role }) => (
  <div className="mt-3 flex border-t border-gray-900/5 pt-2">
    <div className="relative flex items-center gap-x-2">
      <Image
        src={avatarUrl || DEFAULT_AVATAR}
        alt={fullName || "Avatar"}
        height={40}
        width={40}
        priority
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(40, 40))}`}
        className="h-10 w-10 rounded-full bg-gray-50 object-cover"
      />
      <div className="text-sm">
        <p className="font-semibold text-gray-900">{fullName}</p>
        <p className="text-gray-600">{role || mainPostConfig.author}</p>
      </div>
    </div>
  </div>
);

// Main component
const MainPostItem: React.FC<MainPostItemProps> = async ({ post }) => {
  // Early validation
  if (!post?.id) {
    console.error("Post ID is required");
    return null;
  }

  // Fetch data in parallel
  const [comments, readTime] = await Promise.all([
    getComments(post.id),
    Promise.resolve(readingTime(post.content || ""))
  ]);

  const metadata: PostMetadata = {
    formattedDate: post.updated_at || new Date().toISOString(),
    readingMinutes: readTime.minutes || 0,
    commentCount: comments?.length || 0
  };

  return (
    <div className="group relative w-full rounded-2xl bg-white/20 p-2.5 shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 transition duration-200 hover:-translate-y-1">
      {/* Gradient background effect */}
      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 opacity-[0.15] blur-lg" />
      
      <div className="relative max-w-full rounded-[0.62rem] shadow-sm shadow-black/5 ring-[0.8px] ring-black/5">
        <Link href={`/posts/${post.slug}`} className="block">
          <article className="relative isolate flex max-w-3xl flex-col gap-2 rounded-lg bg-white px-5 py-5 shadow-md shadow-gray-300 ring-1 ring-black/5 sm:gap-8 sm:px-10 sm:py-6 lg:flex-row">
            {/* Cover Image */}
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
              <Image
                src={post.image || DEFAULT_COVER}
                alt={post.title || "Cover"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 256px"
                priority
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(256, 256))}`}
                className="rounded-2xl bg-gray-50 object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Desktop category */}
              <div className="hidden items-center gap-x-3 text-sm sm:flex">
                <CategoryBadge category={post.categories?.title || "Uncategorized"} />
              </div>

              <div className="group relative max-w-xl">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 transition-colors group-hover:text-gray-600">
                  {post.title}
                </h3>

                {/* Mobile metadata */}
                <PostMetadata 
                  metadata={metadata} 
                  category={post.categories?.title || "Uncategorized"} 
                  isMobile 
                />

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.description}
                </p>

                {/* Desktop metadata */}
                <PostMetadata 
                  metadata={metadata} 
                  category={post.categories?.title || "Uncategorized"} 
                />
              </div>
              {/* Author info */}
              <AuthorInfo
                avatarUrl={post.profiles?.avatar_url as string}
                fullName={post.profiles?.full_name as string}
                role={mainPostConfig.author}
              />
            </div>
          </article>
        </Link>
      </div>
    </div>
  );
};

export default MainPostItem;