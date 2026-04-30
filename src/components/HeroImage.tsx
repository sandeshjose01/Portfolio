"use client";
import React from "react";
import Image from "next/image";

export default function HeroImage({ adminUrl }: any) {
  return (
    <div className="relative w-full max-w-[550px] aspect-square">
      {/* // text: Using Next.js Image component to fix the LCP warnings in your build log */}
      <Image 
        src={adminUrl || "/portfolioLogo.png"} 
        alt="Sandesh Joshi Hero" 
        width={1000}
        height={1000}
        priority // // text: This ensures the image loads instantly
        className="w-full h-full object-contain drop-shadow-2xl" 
      />
    </div>
  );
}
