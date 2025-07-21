"use client";

import { PostComment } from "@/actions/comment/post-comment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { detailCommentConfig } from "@/config/detail";
import { commentFormSchema } from "@/lib/validation/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2 as SpinnerIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

type FormValues = z.infer<typeof commentFormSchema>;

interface DetailPostCommentFormProps {
  postId: string;
  userId: string;
}

// This can come from your database or API.
const defaultValues: Partial<FormValues> = {
  comment: "",
};

const DetailPostCommentForm: React.FC<DetailPostCommentFormProps> = ({
  postId,
  userId,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);

    const formData = {
      postId: postId,
      userId: userId,
      comment: data.comment,
    };

    const response = await PostComment(formData);

    if (response) {
      setIsLoading(false);
      toast.success(detailCommentConfig.successAdd);
      form.reset(); // Reset form after successful submission
      router.refresh();
    } else {
      setIsLoading(false);
      toast.error(detailCommentConfig.errorAdd);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Share your thoughts..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:border-emerald-500 focus:outline-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <SpinnerIcon className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default DetailPostCommentForm;