"use client";

import { LoginSection } from "@/components/login";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { detailCommentConfig } from "@/config/detail";
import React from "react";

const DetailPostSignInToComment = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="group relative mb-4 w-full rounded-md border border-gray-700 bg-transparent p-2 text-center transition duration-200 hover:bg-gray-900 hover:shadow-sm active:scale-[96%]"
        >
          <span className="text-gray-400 group-hover:text-gray-100">
            {detailCommentConfig.leaveComment}
          </span>
        </Button>

      </DialogTrigger>
      <DialogContent className="font-sans sm:max-w-[425px]">
        <LoginSection />
      </DialogContent>
    </Dialog>
  );
};

export default DetailPostSignInToComment;
