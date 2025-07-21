"use client";

import { LoginMenu } from "@/components/login";
import { SharedBackButton } from "@/components/shared";
import { useReadingProgress } from "@/hooks/use-reading-progress";

interface DetailPostHeaderProps {
  title: string;
}

const DetailPostHeader: React.FC<DetailPostHeaderProps> = ({ title }) => {
  const completion = useReadingProgress();
  
  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm border-b border-gray-700">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
      
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex max-w-4xl mx-auto items-center justify-between py-4">
          {/* Back Button Section */}
          <div className="flex flex-none items-center">
            <div className="group relative">
              <SharedBackButton />
              {/* Subtle glow effect for back button area */}
              <div className="absolute inset-0 bg-emerald-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          {/* Title Section */}
          <div className="flex-1 mx-6">
            <div className="relative">
              {/* Title with glitch effect on hover */}
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight font-mono relative group cursor-default">
                <span className="relative z-10">{title}</span>
                {/* Glitch effect layers */}
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-150 text-[#ff00c1] animate-pulse"
                  style={{ transform: 'translate(-1px, 0)' }}
                >
                  {title}
                </span>
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-200 text-[#00fff9] animate-pulse"
                  style={{ transform: 'translate(1px, 0)', animationDelay: '0.1s' }}
                >
                  {title}
                </span>
              </h1>
              
              {/* Terminal cursor effect */}
              {/* <span className="inline-block w-2 h-5 bg-emerald-400 ml-2 animate-pulse opacity-70" /> */}
            </div>
          </div>

          {/* Login Menu Section */}
          <div className="flex flex-none items-center">
            <div className="relative">
              <LoginMenu />
              {/* Subtle accent border */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
            </div>
          </div>
        </div>
      </nav>

      {/* Reading Progress Bar */}
      <div className="relative h-1 bg-gray-800 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-emerald-400/30 to-emerald-500/20" />
        
        {/* Progress bar with enhanced styling */}
        <div
          style={{ transform: `translateX(${completion - 100}%)` }}
          className="absolute bottom-0 h-full w-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/50 transition-transform duration-300"
        >
          {/* Progress bar glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-emerald-400 blur-sm opacity-60" />
          <div className="absolute right-0 top-0 w-4 h-full bg-white/30 blur-sm" />
        </div>
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 100%'
          }}
        />
      </div>
      
      {/* Terminal-style scan line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/5 to-transparent h-0.5 animate-pulse pointer-events-none" 
           style={{ top: '50%' }} />
    </header>
  );
};

export default DetailPostHeader;