"use server";

import { postUpdateSchema } from "@/lib/validation/post";
import type { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";

export async function UpdatePost(context: z.infer<typeof postUpdateSchema>) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const post = postUpdateSchema.parse(context);

    const { data, error } = await supabase
      .from("posts")
      .update({
        id: post.id,
        title: post.title,
        slug: post.slug,
        category_id: post.categoryId,
        description: post.description,
        image: post.image,
        content: post.content,
        content_html: post.content_html
      })
      .match({ id: post.id })
      .select()
      .single();

    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
