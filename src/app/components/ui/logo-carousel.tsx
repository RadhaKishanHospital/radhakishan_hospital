import React from "react";

interface LogoCarouselProps {
  children: React.ReactNode;
  speed?: number;
}

export function LogoCarousel({ children, speed = 20 }: LogoCarouselProps) {
  return (
    <div className="relative w-full overflow-hidden bg-white py-12">

      {/* scrolling track */}
      <div
        className="flex w-max animate-scroll"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {children}
        {children}
      </div>

      {/* left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>

      {/* right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>

    </div>
  );
}

interface LogoItemProps {
  children: React.ReactNode;
}

export function LogoItem({ children }: LogoItemProps) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center h-12 mx-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      {children}
    </div>
  );
}