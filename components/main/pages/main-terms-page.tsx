import { mainPageTermsConfig } from "@/config/main/pages";
import React from "react";

const MainTermsPage = () => {
  return (
    <div className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
            {mainPageTermsConfig.title}
          </p>

          {mainPageTermsConfig.paragraphs.map((item, index) => (
            <React.Fragment key={index}>
              <p className="text-md mt-8 leading-8 text-gray-400">
                {item.description}
              </p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainTermsPage;