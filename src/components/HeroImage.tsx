"use client";
import React from "react";
import Image from "next/image";

export default function HeroImage({ adminUrl }: any) {
  return (
    <div className="relative w-full max-w-[550px] aspect-square">
      <Image 
        // // text: If Admin has no photo, it uses your local original photo
        src={adminUrl || "/portfolioLogo.png"} 
        alt="Logo" 
        width={1000}
        height={1000}
        priority 
        className="w-full h-full object-contain drop-shadow-2xl" 
      />
    </div>
  );
}
