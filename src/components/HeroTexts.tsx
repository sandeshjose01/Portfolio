"use client";
import React from "react";
import TextRotator from "./TextRotator";

interface HeroTextsProps {
  roles?: string[];
  name?: string;
}

const HeroTexts = ({ roles, name }: HeroTextsProps) => {
  return (
    <div className="flex flex-col items-start">
      {/* text: This is now a standard white heading, it will always show */}
      <h3 className="font-poppins text-2xl max-sm:text-xl text-white mb-2">
        My Name is
      </h3>
      
      <h1 className="font-rubik text-8xl name_underline text-primary max-sm:text-6xl text-white leading-none">
        {name || "Sandesh Joshi"} .
      </h1>
      
      {/* text: Pass the roles array to the rotator */}
      <TextRotator items={roles || []} />
    </div>
  );
};

export default HeroTexts;
