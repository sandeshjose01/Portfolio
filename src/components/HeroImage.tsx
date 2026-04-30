"use client";
import React from "react";
import Image from "next/image";

export default function HeroImage({ adminUrl }: any) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image 
        // // text: Updated fallback name to portfolioLogo.png
        src={adminUrl || "/portfolioLogo.png"} 
        alt="Portfolio Logo" 
        width={1000}
        height={1000}
        priority 
        className="w-full h-full object-contain" 
      />
    </div>
  );
}
