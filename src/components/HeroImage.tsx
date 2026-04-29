"use client";
import React from "react";
import Image from "next/image"; // Import Next.js Image component

interface HeroImageProps {
  url?: string;
}

const HeroImage = ({ url }: HeroImageProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* // text: Using Next.js Image for high performance and priority loading */}
      {url ? (
        <Image 
          src={url} 
          alt="Hero Image" 
          height={1000} 
          width={1000} 
          priority // // text: Tells the browser to load this image first
          className="w-full h-auto max-h-[600px] object-contain rounded-[3rem] shadow-2xl transition-all duration-700" 
        />
      ) : (
        <div className="w-64 h-64 bg-white/5 rounded-[3rem] animate-pulse flex items-center justify-center border border-white/10">
           <span className="text-white/20 font-bold uppercase text-xs tracking-widest">No Image Set</span>
        </div>
      )}
    </div>
  );
};

export default HeroImage;
