"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { mainNewsLetterConfig } from "@/config/main";
import { emailSchema } from "@/lib/validation/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 as SpinnerIcon, ArrowRight } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const MainNewsletter = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof emailSchema>) {
    setIsLoading(true);

    const response = await fetch("/api/subscribe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    });

    if (!response?.ok) {
      setIsLoading(false);
      return toast.error(mainNewsLetterConfig.error);
    }

    setIsLoading(false);
    toast.success(mainNewsLetterConfig.success);
    form.reset();
    return true;
  }

  return (
    <div className="mt-10 xl:mt-0">
      <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-emerald-500/50 transition-colors duration-300">
        <h3 className="text-lg font-bold leading-6 text-white mb-2">
          {mainNewsLetterConfig.title}
        </h3>
        <p className="text-sm leading-6 text-gray-400 mb-6">
          {mainNewsLetterConfig.description}
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full appearance-none rounded-lg bg-gray-800/50 border border-gray-700 px-4 py-3 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all duration-200"
                      placeholder={mainNewsLetterConfig.email}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm mt-1" />
                </FormItem>
              )}
            />
            <button
              disabled={isLoading}
              type="submit"
              className="group w-full flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-emerald-500/30 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <SpinnerIcon className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {mainNewsLetterConfig.subscribe}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MainNewsletter;