import Editor from "@/components/protected/editor/editor";
import { Separator } from "@/components/ui/separator";
import { protectedEditorConfig } from "@/config/protected";
import { Category, Post } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const revalidate = 0;
interface PostEditorPageProps {
  params: { postId: string };
}

async function getUserId() {
  const cookeStore = cookies();
  const supabase = createClient(cookeStore);
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.log("Error has occured while getting UserId!");
    console.log("Error message : ", error.message);
    return null;
  }

  return session ? session : null;
}

async function getPost(postId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .match({ id: postId, author_id: userId })
    .single<Post>();

  if (error) {
    console.log("Error has occured while getting post data");
    console.log("Error message : ", error.message);
    return null;
  }

  return data ? data : null;
}

// Get Cover image filename and public url
async function getCoverImageFileName(
  bucketName: string,
  userId: string,
  postId: string,
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(`${userId}/${postId}`, {
      limit: 1,
      offset: 0,
      sortBy: { column: "created_at", order: "asc" },
    });

  if (error) {
    console.log("Error has occured while collection filenames from bucket!");
    console.log("Error message : ", error.message);
    return null;
  }

  if (data && data.length > 0) {
    return data[0].name;
  }
  return null;
}

async function getCoverImageUrl(
  bucketName: string,
  userId: string,
  postId: string,
  fileName: string,
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(`${userId}/${postId}/${fileName}`);

  return data.publicUrl;
}

// Get Gallery images filenames and public urls
async function getGalleryImageFileNames(bucketName: string, userId, postId) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(`${userId}/${postId}`, {
      limit: 10,
      offset: 0,
      sortBy: { column: "created_at", order: "asc" },
    });

  if (error) {
    console.log("Error has occured while collection filenames from bucket!");
    console.log("Error message : ", error.message);
    return null;
  }

  if (data) {
    const result = data?.map((item) => item.name);
    return result;
  }
  return null;
}

async function getCategories() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('title', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data as Category[]
}

async function getGalleryImageUrls(
  bucketName: string,
  userId: string,
  postId: string,
  fileNames: string[],
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let filePublicUrls: string[] = [];
  fileNames.map((fileName) => {
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(`${userId}/${postId}/${fileName}`);

    data && filePublicUrls.push(data.publicUrl);
  });

  return filePublicUrls;
}

export default async function PostEditorPage({ params }: PostEditorPageProps) {
  const bucketNameCoverImage =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_COVER_IMAGE!;
  const bucketNameGalleryImage =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_GALLERY_IMAGE!;
  const userId = await getUserId();
  const post = await getPost(params.postId, userId?.user.id || "");

  // Cover image setup
  const coverImageFileName = await getCoverImageFileName(
    bucketNameCoverImage,
    userId?.user.id || "",
    params.postId,
  );
  const coverImagePublicUrl = await getCoverImageUrl(
    bucketNameCoverImage,
    userId?.user.id || "",
    params.postId,
    coverImageFileName || "",
  );

  // Gallery images setup
  const galleryImageFileNames = await getGalleryImageFileNames(
    bucketNameGalleryImage,
    userId,
    params.postId,
  );
  const galleryImagePublicUrls = await getGalleryImageUrls(
    bucketNameGalleryImage,
    userId?.user.id || "",
    params.postId,
    galleryImageFileNames || [],
  );
  const categories = await getCategories();
  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-5xl px-10">
      <div>
        <h3 className="text-lg font-medium">{protectedEditorConfig.title}</h3>
        <p className="py-2 text-sm text-muted-foreground">
          {protectedEditorConfig.description}
        </p>
      </div>
      <Separator className="mb-5 max-w-2xl" />
      <Editor
        categories={categories}
        post={post}
        userId={userId?.user.id || ""}
        accessToken={userId?.access_token || ""}
        coverImageFileName={coverImageFileName || ""}
        coverImagePublicUrl={coverImagePublicUrl || ""}
        galleryImageFileNames={galleryImageFileNames || []}
        galleryImagePublicUrls={galleryImagePublicUrls || []}
      />
    </div>
  );
}
