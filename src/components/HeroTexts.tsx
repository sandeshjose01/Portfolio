"use client";
import React from "react";
import TextRotator from "./TextRotator";

interface HeroTextsProps {
  roles?: string[];
  name?: string;
}

const HeroTexts = ({ roles, name }: HeroTextsProps) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <h3 className="font-poppins text-xl text-gray-800 font-medium">
        My Name is
      </h3>
      
      <div className="relative inline-block">
        <h1 className="font-rubik text-7xl md:text-8xl text-[#0f172a] font-bold leading-[1.1] tracking-tighter">
          {name || "Sandesh"} <br /> {name ? "" : "Joshi"} .
        </h1>
        {/* THE BLUE UNDERLINE FROM ORIGINAL DESIGN */}
        <div className="absolute bottom-4 left-0 w-24 h-2 bg-[#2f7df4] rounded-full" />
      </div>
      
      <TextRotator items={roles} />
    </div>
  );
};

export default HeroTexts;
