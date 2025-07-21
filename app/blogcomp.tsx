
'use client'
import React, { useState } from 'react';
import { 
  Heart, 
  Bookmark, 
  Share2, 
  MessageCircle, 
  ArrowUp, 
  ArrowDown,
  Send,
  Calendar,
  Clock,
  Tag,
  User,
  Twitter,
  Facebook,
  Link,
  ChevronDown
} from 'lucide-react';
import { GetBookmark } from "@/actions/bookmark/get-bookmark";
import {
  DetailPostComment,
  DetailPostFloatingBar,
  DetailPostHeading,
} from "@/components/detail/post";
import { DetailPostScrollUpButton } from "@/components/detail/post/buttons";
import { seoData } from "@/config/root/seo";
import { getMinutes, getOgImageUrl, getUrl } from "@/lib/utils";
import {
  CommentWithProfile,
  PostWithCategoryWithProfile,
} from "@/types/collection";
import type { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect, useRouter } from "next/navigation";
import readingTime, { ReadTimeResults } from "reading-time";
import { cache } from "react";
import toast from 'react-hot-toast';
import { AddBookmark } from "@/actions/bookmark/add-bookmark";
import { DeleteBookmark } from "@/actions/bookmark/delete-bookmark";
import { LoginSection } from "@/components/login";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { detailBookMarkConfig } from "@/config/detail";
import { BookMarkOutlineIcon, BookMarkSolidIcon } from "@/icons";
import { createClient as subabaseClient } from "@/utils/supabase/client";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Loader2 as SpinnerIcon } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostComment } from "@/actions/comment/post-comment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { detailCommentConfig } from "@/config/detail";
import { commentFormSchema } from "@/lib/validation/comment";
import * as z from "zod";
import moment from 'moment';
import { DetailPostCommentDeleteButton, DetailPostCommentForm, DetailPostSignInToComment } from '@/components/detail/post/comment';
import Image from 'next/image';
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
export const BlogDetailHeader = ({data,date}:{data:PostData,date:string})=>{
    const [isHovering, setIsHovered] = React.useState(false);
    const router = useRouter();
    const [session, setSession] = React.useState<Session | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    // Add a bookmark
  async function addBookmark() {
    setIsLoading(true);

    if (data.post.id && session?.user.id) {
      const bookmark = {
        id: data.post.id,
        user_id: session?.user.id,
      };

      const response = await AddBookmark(bookmark);
      if (response) {
        toast.success(detailBookMarkConfig.successAdd);
        router.refresh();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(detailBookMarkConfig.errorAdd);
      }
    } else {
      setIsLoading(false);
      toast.error(detailBookMarkConfig.errorAdd);
    }
  }

  // Delete a bookmark
  async function deleteBookmark() {
    setIsLoading(true);

    if (data.post.id && session?.user.id) {
      const bookmark = {
        id: data.post.id,
        user_id: session?.user.id,
      };

      const response = await DeleteBookmark(bookmark);
      if (response) {
        setIsLoading(false);
        toast.success(detailBookMarkConfig.successDelete);
        router.refresh();
      } else {
        setIsLoading(false);
        toast.error(detailBookMarkConfig.errorDelete);
      }
    } else {
      setIsLoading(false);
      toast.error(detailBookMarkConfig.errorDelete);
    }
  }

    return(
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-medium">
              {data.post.categories?.title}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {data.post.title}
          </h1>
          
          {/* Author & Meta Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Image
                src={data.userSession.profileImage as string} 
                alt={data.userSession.username || "Avatar"}
                width={42}
                height={42}
                className="rounded-full border-2 border-emerald-500"
              />
              <div>
                <h3 className="font-medium text-lg">{data.userSession.username}</h3>
                <p className="text-gray-400 text-sm">{"Author"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-gray-300 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {getMinutes(data.readTime.minutes)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isLiked 
                  ? 'bg-emerald-500 text-black' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              {likes}
            </button> */}
            
            <button 
              onClick={()=>{data.isBookmarked ? deleteBookmark() : addBookmark()}}
              className={`p-2 rounded-lg transition-all duration-300 ${
                data.isBookmarked
                  ? 'bg-emerald-500 text-black' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${data.isBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <div className="relative">
              <button 
                // onClick={handleShare}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300"
              >
                <Share2 className="w-4 h-4" />
              </button>
              
              {/* {showShareMenu && (
                <div className="absolute top-12 right-0 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 min-w-48 z-20">
                  <div className="flex flex-col gap-2">
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded text-left">
                      <Twitter className="w-4 h-4 text-cyan-400" />
                      Share on Twitter
                    </button>
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded text-left">
                      <Facebook className="w-4 h-4 text-blue-400" />
                      Share on Facebook
                    </button>
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded text-left">
                      <Link className="w-4 h-4 text-gray-400" />
                      Copy Link
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
    )
}
export const BlogDetailComments = ({comments,post,user}:{comments:CommentWithProfile[],post:PostWithCategoryWithProfile,user:UserSession})=>{
    const [showComments, setShowComments] = useState(true);

    return(
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-lg p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-emerald-400" />
              Comments ({comments.length})
            </h2>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showComments ? '' : 'rotate-180'}`} />
            </button>
          </div>
          {showComments && (
              <div>
                {
                    user ? <DetailPostCommentForm postId={post.id!.toString()} userId={user.userId!.toString()} /> : <DetailPostSignInToComment />
                }

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-gray-700 pl-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src={comment.profiles.avatar_url as string}
                        alt={comment.profiles.full_name || "Comment"}
                        className="rounded-full"
                        width={40}
                        height={40}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                            <div className='flex items-center gap-2 mb-2'>
                                <h4 className="font-medium">{comment.profiles.full_name}</h4>
                                <span className="text-gray-400 text-sm">{moment(comment.created_at).fromNow()}</span>
                            </div>
                        <DetailPostCommentDeleteButton userId={user.userId as string} id={comment.id}/>
                        </div>
                        <p className="text-gray-300 mb-3">{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
    )
}