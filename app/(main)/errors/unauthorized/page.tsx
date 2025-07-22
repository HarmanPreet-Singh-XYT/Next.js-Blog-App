'use client'
import MainFooter from "@/components/main/footer/main-footer";
import Link from "next/link";
import { useState } from "react";

const SharedUnauthorized = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 500);
  };

  return (
    <div 
      className="bg-black min-h-screen relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(220, 38, 38, 0.3) 0%, rgba(0, 0, 0, 0.8) 50%, black 100%)`,
        }}
      />

      <main className="mx-auto w-full max-w-4xl px-6 pb-16 pt-20 sm:pb-24 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main 401 with glitch effect */}
          <div className="relative inline-block">
            <h1 
              className={`text-8xl sm:text-9xl font-black text-white mb-8 select-none transition-all duration-300 hover:scale-105 ${
                glitchActive ? 'animate-pulse text-red-500' : ''
              }`}
              onClick={triggerGlitch}
              style={{
                textShadow: glitchActive 
                  ? '2px 2px 0px #ff0000, -2px -2px 0px #00ff00, 4px 4px 0px #0000ff'
                  : '0 0 20px rgba(255, 255, 255, 0.3)',
                filter: glitchActive ? 'brightness(1.5) contrast(2)' : 'none',
              }}
            >
              401
            </h1>
            
            {/* Glitch overlay */}
            {glitchActive && (
              <div className="absolute inset-0 text-8xl sm:text-9xl font-black text-cyan-400 opacity-70 animate-bounce"
                   style={{ transform: 'translate(2px, -2px)' }}>
                401
              </div>
            )}
          </div>

          {/* Error message with typing animation */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 opacity-90">
              Access Denied
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              You don{`'`}t have permission to access this resource. Authentication required.
            </p>
          </div>

          {/* Interactive elements */}
          <div className="space-y-6 mb-12">
            {/* Hover effects buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="group relative px-8 py-3 bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:bg-transparent hover:text-white hover:scale-110 border-2 border-transparent hover:border-white"
              >
                <span className="relative z-10">
                  Go Home
                </span>
                <div className="absolute inset-0 bg-white opacity-100 group-hover:opacity-0 transition-opacity duration-300 rounded-lg" />
              </Link>
              
              {/* <Link
                href="/login"
                className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:border-red-500 hover:text-red-500 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105"
              >
                Login
              </Link> */}

              <button
                onClick={triggerGlitch}
                className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:border-red-500 hover:text-red-500 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105"
              >
                Glitch Effect
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with dark theme */}
      <div className="relative z-10">
        <MainFooter />
      </div>
    </div>
  );
};

export default SharedUnauthorized;