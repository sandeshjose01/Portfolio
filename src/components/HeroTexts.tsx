"use client";
import React from "react";
import TextRotator from "./TextRotator";

interface HeroTextsProps {
  roles?: string[];
  name?: string;
}

const HeroTexts = ({ roles, name }: HeroTextsProps) => {
  return (
    <>
      {/* // text: Hardcoded to always show defaultly as requested */}
      <h3 className="font-poppins text-2xl max-sm:text-xl text-white">
        My Name is
      </h3>
      
      <h1 className="font-rubik text-8xl name_underline text-primary max-sm:text-6xl text-white">
        {/* // text: Shows Admin name or default */}
        {name || "Sandesh Joshi"} .
      </h1>
      
      <TextRotator items={roles || []} />
    </>
  );
};

export default HeroTexts;
