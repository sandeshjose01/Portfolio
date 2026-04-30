"use client";
import React from "react";

export default function HeroImage({ adminUrl }: any) {
  return (
    <div className="relative w-full max-w-[550px] aspect-square">
      {/* OR STATEMENT: Admin Cloudinary URL OR your original local file */}
      <img 
        src={adminUrl || "/portfolioLogo.png"} 
        alt="Hero" 
        className="w-full h-full object-contain drop-shadow-2xl" 
      />
    </div>
  );
}
