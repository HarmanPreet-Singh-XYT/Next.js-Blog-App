"use client";

import { detailShareConfig } from "@/config/detail";
import { ShareOutlineIcon, ShareSolidIcon } from "@/icons";
import {
  CheckIcon,
  CopyIcon,
  FacebookIcon,
  LinkedinIcon,
  MailIcon,
  Share2,
  TwitterIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Drawer } from "vaul";

interface DetailPostShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

const CopyButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  const copy = () => {
    setCopied(true);
    window.navigator.clipboard.writeText(url);
  };

  return (
    <button
      type="button"
      title="Copy url to clipboard"
      onClick={copy}
      className="rounded-lg border-[1.75px] border-gray-700 bg-black p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-gray-700 hover:shadow-md"
    >
      {copied ? (
        <CheckIcon className="h-8 w-8 stroke-[1.5px] text-gray-400" />
      ) : (
        <CopyIcon className="h-8 w-8 stroke-[1.5px] text-gray-400" />
      )}
    </button>
  );
};

const DetailPostShareButton: React.FC<DetailPostShareButtonProps> = ({
  title = "",
  text = "",
  url = window.location.href,
}) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
          <button
            type="button"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-gray-700 bg-transparent py-2 hover:bg-gray-900 hover:shadow-sm"
          >
            {isHovering ? (
              <ShareSolidIcon className="-ml-0.5 h-5 w-5 text-gray-100" />
            ) : (
              <ShareOutlineIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
            )}
            <span className="ml-2 hidden text-sm text-gray-400 group-hover:text-gray-100 md:flex">
              {detailShareConfig.title}
            </span>
          </button>
          {/* <button 
              // onClick={handleShare}
              type="button"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300"
            >
              <Share2 className="w-4 h-4" />
            </button> */}
        </Drawer.Trigger>
        <Drawer.Overlay className="fixed inset-0 bg-black/60" />
        <Drawer.Portal>
          <Drawer.Content className="fixed bottom-0 border-t-2 border-emerald-500 left-0 right-0 z-50 mt-24 flex flex-col rounded-t-[10px] bg-black">
            <div className="flex-1 rounded-t-[10px] bg-black p-4">
              <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-600" />
              <div className="mx-auto max-w-md">
                <Drawer.Title className="mx-auto mb-4 text-center font-sans text-lg font-semibold text-gray-300">
                  {detailShareConfig.title}
                </Drawer.Title>
                <div className="mx-auto my-6 grid grid-cols-3 justify-center gap-8">
                  <div className="mx-auto flex ">
                    <a
                      title={title}
                      target="_blank"
                      href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
                        title,
                      )}`}
                      rel="noopener noreferrer"
                      className="rounded-lg border-[1.75px] border-emerald-700 bg-black p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-md"
                    >
                      <TwitterIcon className="h-8 w-8 stroke-[1.5px] text-gray-400" />
                    </a>
                  </div>
                  <div className="mx-auto flex ">
                    <a
                      title={title}
                      target="_blank"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                      rel="noopener noreferrer"
                      className="rounded-lg border-[1.75px] border-emerald-700 bg-black p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-md"
                    >
                      <FacebookIcon className="h-8 w-8 stroke-[1.5px] text-gray-400" />
                    </a>
                  </div>
                  <div className="mx-auto flex ">
                    <a
                      title={title}
                      target="_blank"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                      rel="noopener noreferrer"
                      className="rounded-lg border-[1.75px] border-emerald-700 bg-black p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-md"
                    >
                      <LinkedinIcon className="h-8 w-8 stroke-[1.5px] text-gray-400" />
                    </a>
                  </div>

                  <div className="mx-auto flex ">
                    <a
                      title={title}
                      target="_blank"
                      href={`mailto:?subject=${encodeURIComponent(
                        title,
                      )}&body=${encodeURIComponent(text + "\n\n")}${url}`}
                      rel="noopener noreferrer"
                      className="rounded-lg border-[1.75px] border-emerald-700 bg-black p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-md"
                    >
                      <MailIcon className="h-8 w-8 stroke-[1.5px] text-gray-400" />
                    </a>
                  </div>

                  <div className="mx-auto flex ">
                    <CopyButton url={url} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black mt-auto border-t border-emerald-700"></div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default DetailPostShareButton;