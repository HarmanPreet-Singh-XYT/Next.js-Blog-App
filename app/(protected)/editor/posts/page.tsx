import PostTableEmpty from "@/components/protected/post/post-emtpy-table";
import PostRefreshOnce from "@/components/protected/post/post-refresh-once";
import PostTableTitle from "@/components/protected/post/post-table-title";
import { columns } from "@/components/protected/post/table/columns";
import { DataTable } from "@/components/protected/post/table/data-table";
import { protectedPostConfig } from "@/config/protected";
import { Post } from "@/types/collection";
import type { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";

export const revalidate = 0;

export const metadata: Metadata = {
  title: protectedPostConfig.title,
  description: protectedPostConfig.description,
};

interface PostsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PostsPage: FC<PostsPageProps> = async ({ searchParams }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // Fetch user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch posts
  const { data, error } = await supabase
    .from("posts")
    .select(`*, categories(*)`)
    .order("created_at", { ascending: false })
    .match({ author_id: user?.id })
    .returns<Post[]>();

  if (!data || error || !data.length) {
    notFound;
  }
  const formattedData = (data || []).map((post) => ({
    author_id: post.author_id,
    category_id: post.category_id,
    content: post.content,
    created_at: post.created_at ?? "", // fallback to empty string
    description: post.description,
    id: post.id,
    image: post.image,
    slug: post.slug ?? null,
    status: post.published ? "Published" : "Draft", // derive status
    title: post.title ?? null,
    updated_at: post.updated_at,
  }));

  return (
    <>
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        {data?.length && data?.length > 0 ? (
          <>
            <PostTableTitle />
            <DataTable data={formattedData || []} columns={columns} />
          </>
        ) : (
          <PostTableEmpty />
        )}
        <PostRefreshOnce />
      </div>
    </>
  );
};

export default PostsPage;
