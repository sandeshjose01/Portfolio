"use client";
import React from "react";
import Image from "next/image";

export default function HeroImage({ adminUrl }: any) {
  return (
    <div className="relative w-full max-w-[550px] aspect-square">
      {/* // text: Using Next.js Image component to fix build warnings and improve speed */}
      <Image 
        src={adminUrl || "/portfolioLogo.png"} 
        alt="Hero" 
        width={1000}
        height={1000}
        priority
        className="w-full h-full object-contain drop-shadow-2xl" 
      />
    </div>
  );
}
