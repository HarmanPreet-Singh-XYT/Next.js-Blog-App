
'use server'
import { 
  Calendar,
  Clock,
} from 'lucide-react';
import {
  DetailPostFloatingBar,
} from "@/components/detail/post";
import { DetailPostShareButton } from "@/components/detail/post/buttons";
import { getMinutes, shimmer, toBase64 } from "@/lib/utils";
import {
  CommentWithProfile,
  PostWithCategoryWithProfile,
} from "@/types/collection";
import { ReadTimeResults } from "reading-time";
import Image from 'next/image';

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
          <div className="relative my-8 flex justify-center w-full">
            <Image
              src={data.post.image as string}
              alt={data.post.title as string}
              width={712}
              height={400}
              className="h-[400px] rounded-2xl bg-gray-100 object-cover"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(712, 400),
              )}`}
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          
          {/* Author & Meta Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Image
                src={data.post.profiles.avatar_url as string} 
                alt={data.post.profiles.full_name || "Avatar"}
                width={42}
                height={42}
                className="rounded-full border-2 border-emerald-500"
              />
              <div>
                <h3 className="font-medium text-lg">{data.post.profiles.full_name}</h3>
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
            <DetailPostFloatingBar isBookmarked={data.isBookmarked} totalComments={data.comments.length} id={data.post.id} title={data.post.title as string} text={data.post.description as string} url={`${process.env.NEXT_PUBLIC_WEB_URL}/posts/${data.post.slug}`}/>
            
            {/* <div className="relative">
              <DetailPostShareButton title={data.post.title as string} text={data.post.description as string}/>
            </div> */}
          </div>
        </div>
    )
}