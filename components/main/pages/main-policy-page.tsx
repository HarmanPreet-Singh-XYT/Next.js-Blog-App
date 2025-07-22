import { mainPagePolicyConfig } from "@/config/main/pages";
import React from "react";

const MainPolicyPage = () => {
  return (
    <div className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
            {mainPagePolicyConfig.title}
          </p>
          <h2 className="text-md my-6 leading-7 text-gray-400">
            {mainPagePolicyConfig.description}
          </h2>

          {mainPagePolicyConfig.paragraphs.map((item, index) => (
            <React.Fragment key={index}>
              <p className="mt-6 text-xl font-semibold text-gray-200">
                {item.title}
              </p>
              <p className="text-md mt-2 leading-8 text-gray-400">
                {item.description}
              </p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPolicyPage;