"use client";
import React from "react";
import TextRotator from "./TextRotator";

interface HeroTextsProps {
  staticRole?: string;
  roles?: string[];
  name?: string;
}

const HeroTexts = ({ staticRole, roles, name }: HeroTextsProps) => {
  return (
    <>
      <h3 className="font-poppins text-2xl max-sm:text-xl text-white/70">
        {staticRole || "My Name is"}
      </h3>
      <h1 className="font-rubik text-8xl name_underline text-primary max-sm:text-6xl text-white">
        {name || "Sandesh Joshi"} .
      </h1>
      <TextRotator items={roles || []} />
    </>
  );
};

export default HeroTexts;
