"use client"; // Required for the download function to work

import SocialLinks from "@/components/SocialLinks";
import HeroTexts from "@/components/HeroTexts";
import HeroImage from "@/components/HeroImage";
import GithubBtn from "@/components/animation/GithubBtn";
import FramerWrapper from "@/components/animation/FramerWrapper";
// Import the PDF function and the Download icon
import { downloadATSResume } from "@src/lib/generateResume";
import { Download } from "lucide-react";

export const siteConfig = {
  name: "Sandesh joshi",
  description: "I am a Passionate Graphic Designer",
  ogImage: "https://sandeshjose01.vercel.app/og-image.png",
  url: "https://www.sandeshjoshi.info.np/",
};

export default function Home() {
  return (
    <>
      {/* LEFT SIDE  */}
      <FramerWrapper
        className=" h-full w-auto flex flex-col justify-start gap-4"
        y={0}
        x={-100}
      >
        <HeroTexts />
        <div className="h-fit w-full p-4 flex gap-4">
          <SocialLinks />
        </div>

        {/* NEW FUNCTIONAL DOWNLOAD BUTTON */}
        <div className="px-4">
          <button 
            onClick={downloadATSResume}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30 w-fit"
          >
            <Download className="w-5 h-5" />
            Download CV
          </button>
        </div>
      </FramerWrapper>

      {/* RIGHT SIDE image  */}
      <FramerWrapper
        className="h-full w-[47%] relative block max-lg:hidden"
        y={0}
        x={100}
      >
        <HeroImage />
      </FramerWrapper>

      {/* GITHUB BUTTON  */}
      <GithubBtn />
    </>
  );
}
