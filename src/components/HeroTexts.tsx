"use client";
import React from "react";
import TextRotator from "./TextRotator";

export default function HeroTexts({ name, staticRole, roles }: any) {
  return (
    <div className="flex flex-col items-start gap-2">
      <h3 className="font-poppins text-xl max-sm:text-xl" >My Name is</h3>
      <div className="relative inline-block">
        <h1 className="font-rubik text-8xl name_underline text-primary max-sm:text-6xl">
          {/* OR STATEMENT: Admin Name OR Original Hardcoded Name */}
          {name ? name.replace(" ", "\n") : "Sandesh \n Joshi"} .
        </h1>
        <div className="absolute bottom-4 left-0 w-24 h-2 bg-[#2f7df4] rounded-full" />
      </div>
      <TextRotator staticRole={staticRole} items={roles} />
    </div>
  );
}
