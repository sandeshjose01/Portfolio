"use client";
import React from "react";
import Image from "next/image";

export default function HeroImage({ adminUrl }: any) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* // text: Using Next.js Image component to satisfy the build warnings */}
      <Image 
        src={adminUrl || "/your-local-image.png"} 
        alt="Sandesh Joshi" 
        width={1000}
        height={1000}
        priority 
        className="w-full h-full object-contain drop-shadow-2xl" 
      />
    </div>
  );
}
