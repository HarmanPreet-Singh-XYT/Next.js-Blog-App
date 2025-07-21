import { mainFooterConfig } from "@/config/main";
import Link from "next/link";
import { v4 } from "uuid";
import MainNewsletter from "./main-newsletter";

const MainFooter = () => {
  return (
    <footer
      className="border-t border-gray-800 bg-black"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-8 pt-20 sm:pt-24 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-6">
                  Categories
                </h3>
                <ul role="list" className="space-y-3">
                  {mainFooterConfig.categories.map((category) => (
                    <li key={v4()}>
                      <Link
                        href={
                          category.slug === "/"
                            ? category.slug
                            : `/category/${category.slug}`
                        }
                        className="text-sm leading-6 text-gray-400 hover:text-emerald-400 transition-colors duration-200 inline-flex items-center group"
                      >
                        <span className="w-0 h-[1px] bg-emerald-400 transition-all duration-300 group-hover:w-4 group-hover:mr-2"></span>
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-6">
                  Pages
                </h3>
                <ul role="list" className="space-y-3">
                  {mainFooterConfig.pages.map((page) => (
                    <li key={v4()}>
                      <Link
                        href={page.slug}
                        className="text-sm leading-6 text-gray-400 hover:text-emerald-400 transition-colors duration-200 inline-flex items-center group"
                      >
                        <span className="w-0 h-[1px] bg-emerald-400 transition-all duration-300 group-hover:w-4 group-hover:mr-2"></span>
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-6">
                  Socials
                </h3>
                <ul role="list" className="space-y-3">
                  {mainFooterConfig.socials.map((social) => (
                    <li key={v4()}>
                      <Link
                        href={social.url}
                        target="_blank"
                        className="text-sm leading-6 text-gray-400 hover:text-emerald-400 transition-colors duration-200 inline-flex items-center group"
                      >
                        <span className="w-0 h-[1px] bg-emerald-400 transition-all duration-300 group-hover:w-4 group-hover:mr-2"></span>
                        {social.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-6">
                  Legal
                </h3>
                <ul role="list" className="space-y-3">
                  {mainFooterConfig.legals.map((legal) => (
                    <li key={v4()}>
                      <Link
                        href={legal.slug}
                        className="text-sm leading-6 text-gray-400 hover:text-emerald-400 transition-colors duration-200 inline-flex items-center group"
                      >
                        <span className="w-0 h-[1px] bg-emerald-400 transition-all duration-300 group-hover:w-4 group-hover:mr-2"></span>
                        {legal.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <MainNewsletter />
        </div>
        
        {/* Glitch effect divider */}
        <div className="relative mt-16 sm:mt-20 lg:mt-24">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-black px-3">
              <div className="h-1 w-20 bg-gradient-to-r from-[#ff00c1] via-emerald-500 to-[#00fff9] rounded-full animate-pulse"></div>
            </span>
          </div>
        </div>

        <div className="mt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {mainFooterConfig.socials.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <span className="sr-only">{item.name}</span>
                <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <item.icon 
                  className="relative h-5 w-5 text-gray-400 hover:text-emerald-400 transition-all duration-300 group-hover:scale-110" 
                  aria-hidden="true" 
                />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm leading-5 text-gray-400 md:order-1 md:mt-0 font-mono">
            {mainFooterConfig.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;