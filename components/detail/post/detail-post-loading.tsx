import React from "react";

const DetailPostLoading = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section Loading */}
      <div className="relative">
        <div className="w-full h-96 bg-gray-800 animate-pulse"></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Article Header Loading */}
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8 shadow-lg">
          {/* Category Loading */}
          <div className="mb-4">
            <div className="bg-gray-700 h-6 w-24 rounded-full animate-pulse"></div>
          </div>
          
          {/* Title Loading */}
          <div className="mb-6 space-y-4">
            <div className="bg-gray-700 h-12 w-full rounded animate-pulse"></div>
            <div className="bg-gray-700 h-12 w-4/5 rounded animate-pulse"></div>
            <div className="bg-gray-700 h-12 w-3/5 rounded animate-pulse"></div>
          </div>
          
          {/* Author & Meta Info Loading */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="bg-gray-700 h-4 w-32 rounded animate-pulse"></div>
                <div className="bg-gray-700 h-3 w-24 rounded animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="bg-gray-700 h-4 w-24 rounded animate-pulse"></div>
              <div className="bg-gray-700 h-4 w-20 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Action Buttons Loading */}
          <div className="flex items-center gap-4">
            <div className="bg-gray-700 h-10 w-10 rounded-lg animate-pulse"></div>
            <div className="bg-gray-700 h-10 w-10 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Article Content Loading */}
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8 shadow-lg">
          <div className="space-y-6">
            {/* Paragraph Lines */}
            <div className="space-y-3">
              <div className="bg-gray-700 h-4 w-full rounded animate-pulse"></div>
              <div className="bg-gray-700 h-4 w-5/6 rounded animate-pulse"></div>
              <div className="bg-gray-700 h-4 w-4/5 rounded animate-pulse"></div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-700 h-4 w-full rounded animate-pulse"></div>
              <div className="bg-gray-700 h-4 w-3/4 rounded animate-pulse"></div>
            </div>

            {/* Subheading */}
            <div className="bg-gray-700 h-8 w-2/3 rounded animate-pulse mt-8"></div>
            
            <div className="space-y-3">
              <div className="bg-gray-700 h-4 w-full rounded animate-pulse"></div>
              <div className="bg-gray-700 h-4 w-5/6 rounded animate-pulse"></div>
              <div className="bg-gray-700 h-4 w-4/5 rounded animate-pulse"></div>
              <div className="bg-gray-700 h-4 w-3/4 rounded animate-pulse"></div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-700 h-4 w-full rounded animate-pulse"></div>
              <div className="bg-gray-700 h-4 w-2/3 rounded animate-pulse"></div>
            </div>

            {/* Another subheading */}
            <div className="bg-gray-700 h-8 w-1/2 rounded animate-pulse mt-8"></div>
            
            <div className="space-y-3">
              <div className="bg-gray-700 h-4 w-full rounded animate-pulse"></div>
              <div className="bg-gray-700 h-4 w-5/6 rounded animate-pulse"></div>
              <div className="bg-gray-700 h-4 w-4/5 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Comments Section Loading */}
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-lg p-8 shadow-lg">
          {/* Comments Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-700 rounded animate-pulse"></div>
              <div className="bg-gray-700 h-6 w-32 rounded animate-pulse"></div>
            </div>
            <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Add Comment Loading */}
          <div className="mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="bg-gray-700 h-24 w-full rounded-lg animate-pulse"></div>
                <div className="flex justify-end mt-3">
                  <div className="bg-gray-700 h-10 w-32 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List Loading */}
          <div className="space-y-6">
            {[1, 2].map((index) => (
              <div key={index} className="border-l-2 border-gray-700 pl-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-700 h-4 w-24 rounded animate-pulse"></div>
                      <div className="bg-gray-700 h-3 w-16 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-gray-700 h-4 w-full rounded animate-pulse"></div>
                      <div className="bg-gray-700 h-4 w-3/4 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-700 h-4 w-8 rounded animate-pulse"></div>
                      <div className="bg-gray-700 h-4 w-8 rounded animate-pulse"></div>
                      <div className="bg-gray-700 h-4 w-12 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className='h-16'></div>
      </div>
    </div>
  );
};

export default DetailPostLoading;