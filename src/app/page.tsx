"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import SocialLinks from "@/components/SocialLinks";
import HeroTexts from "@/components/HeroTexts";
import HeroImage from "@/components/HeroImage";
import GithubBtn from "@/components/animation/GithubBtn";
import DownLoadResumeBtn from "@/components/DownLoadResumeBtn"; 
import FramerWrapper from "@/components/animation/FramerWrapper";

// // text: ADDING THIS BACK FIXES YOUR LAYOUT.TSX ERROR
export const siteConfig = {
  name: "Sandesh joshi",
  description: "I am a Passionate Graphic Designer",
  ogImage: "https://sandeshjose01.vercel.app/og-image.png",
  url: "https://www.sandeshjoshi.info.np/",
};

export default function Home() {
  const [homeData, setHomeData] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "siteData", "home"), (docSnap) => {
      if (docSnap.exists()) setHomeData(docSnap.data());
    });
    return () => unsub();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-white overflow-hidden flex items-center justify-center px-10 lg:px-20">
      {/* BLUE DOT BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-40" 
        style={{ backgroundImage: `radial-gradient(#2f7df4 1px, transparent 1px)`, backgroundSize: '30px 30px' }} 
      />

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10">
        <FramerWrapper className="flex flex-col gap-8 w-full lg:w-1/2" y={0} x={-100}>
          <HeroTexts 
            name={homeData?.name} 
            roles={homeData?.roles} 
            staticRole={homeData?.staticRole}
          />
          <div className="flex flex-col gap-6">
            <SocialLinks socials={homeData?.socials} />
            <DownLoadResumeBtn />
          </div>
        </FramerWrapper>

        <FramerWrapper className="relative w-full lg:w-[45%] flex justify-center" y={0} x={100}>
          {/* // text: Passing the image URL to the fixed HeroImage component */}
          <HeroImage adminUrl={homeData?.heroImage} />
        </FramerWrapper>
      </div>
      <GithubBtn />
    </main>
  );
}
