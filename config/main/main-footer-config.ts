import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/icons/socials";
import { FooterType } from "@/types";
import { default as mainCategoryConfig } from "./main-category-config";
import { Linkedin, XIcon } from "lucide-react";

const mainFooterConfig: FooterType = {
  categories: mainCategoryConfig,
  pages: [
    {
      title: "Home",
      slug: "https://harmanita.com",
    },
    {
      title: "Services",
      slug: "https://harmanita.com/services",
    },
    {
      title: "Contact",
      slug: "https://harmanita.com/contact-us",
    },
  ],

  socials: [
    {
      name: "Github",
      url: "https://github.com/HarmanPreet-Singh-XYT",
      icon: GithubIcon,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/harman-developer/",
      icon: Linkedin,
    },
    {
      name: "X",
      url: "https://x.com/harmanpreet277",
      icon: XIcon,
    },
    {
      name: "Youtube",
      url: "https://www.youtube.com/@HarmanDeveloper",
      icon: YoutubeIcon,
    },
  ],
  legals: [
    {
      title: "Terms",
      slug: "/terms",
    },
    {
      title: "Policy",
      slug: "/policy",
    },
  ],
  copyright: "© 2025 Harmanita. All rights reserved.",
};

export default mainFooterConfig;
