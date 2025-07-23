"use client";

import { sharedLoginConfig } from "@/config/shared";
import { GithubIcon, GoogleIcon, LoadingDots } from "@/icons";
import { getUrl } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const getLoginRedirectPath = (pathname?: string | null): string => {
  return (
    getUrl() +
    "/auth/callback" + // Required for PKCE authentication.
    "?redirect=" + // Passed to auth/route/callback to redirect after auth
    (pathname ? pathname : "/dashboard")
  );
};

const FormSchema = z.object({
  email: z
    .string({
      required_error: sharedLoginConfig.emailRequiredError,
    })
    .email(),
});

interface LoginSectionProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginSection: React.FC<LoginSectionProps> = ({ setOpen }) => {
  const supabase = createClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [signInGoogleClicked, setSignInGoogleClicked] =
    React.useState<boolean>(false);
  const [signInGithubClicked, setSignInGithubClicked] =
    React.useState<boolean>(false);
  const router = useRouter();
  const currentPathname = usePathname();
  const redirectTo = getLoginRedirectPath(currentPathname);

  async function signInWithGoogle() {
    setSignInGoogleClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          prompt: "consent",
        },
      },
    });
    router.refresh();
  }

  async function signInWithGitHub() {
    setSignInGithubClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
        queryParams: {
          prompt: "consent",
        },
      },
    });
    router.refresh();
  }

  return (
    <>
      <div className="mx-auto w-full justify-center rounded-md border border-gray-800 bg-gray-900 align-middle shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-800 px-4 py-6 pt-8 text-center">
          {/* <a href="https://ub.cafe">
            <Image
              src="/images/logo.png"
              alt="Logo"
              className="h-16 w-16 rounded-full"
              width={64}
              height={64}
              priority
            />
          </a> */}
          <h3 className="font-display text-2xl font-bold text-white">
            {sharedLoginConfig.title}
          </h3>
        </div>

        {/* Sign in buttons with Social accounts */}
        <div className="flex flex-col space-y-4 bg-gray-900 px-4 py-8 md:px-16">
          <button
            disabled={signInGoogleClicked}
            className={`${
              signInGoogleClicked
                ? "cursor-not-allowed border-gray-700 bg-gray-800 text-gray-500"
                : "border border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none focus:ring-2 focus:ring-gray-600`}
            onClick={() => signInWithGoogle()}
          >
            {signInGoogleClicked ? (
              <LoadingDots color="#9CA3AF" />
            ) : (
              <>
                <GoogleIcon className="h-5 w-5" />
                <p>{sharedLoginConfig.google}</p>
              </>
            )}
          </button>

          <button
            disabled={signInGithubClicked}
            className={`${
              signInGithubClicked
                ? "cursor-not-allowed border-gray-700 bg-gray-800 text-gray-500"
                : "border border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none focus:ring-2 focus:ring-gray-600`}
            onClick={() => signInWithGitHub()}
          >
            {signInGithubClicked ? (
              <LoadingDots color="#9CA3AF" />
            ) : (
              <>
                <GithubIcon className="h-5 w-5" />
                <p>{sharedLoginConfig.github}</p>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginSection;
