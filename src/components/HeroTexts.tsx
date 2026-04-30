"use client";
import React from "react";
import TextRotator from "./TextRotator";

interface HeroTextsProps {
  roles?: string[];
  name?: string;
  staticRole?: string;
}

const HeroTexts = ({ roles, name, staticRole }: HeroTextsProps) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <h3 className="font-poppins text-2xl max-sm:text-xl" >My Name is
      </h3>
      
      {/* // text: name_underline is your original CSS class. 
          // text: .split(" ").join("\n") forces the second name to a new line. */}
      <h1 className="font-rubik text-8xl name_underline text-primary max-sm:text-6xl">
        {name ? name.split(" ").join("\n") : "Sandesh\nJoshi"} .
      </h1>
      
      <TextRotator items={roles} staticRole={staticRole} />
    </div>
  );
};

export default HeroTexts;
