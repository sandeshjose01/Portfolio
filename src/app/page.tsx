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

// // text: Restored siteConfig to fix the layout.tsx error
export const siteConfig = {
  name: "Sandesh joshi",
  description: "I am a Passionate Graphic Designer",
  ogImage: "https://sandeshjose01.vercel.app/og-image.png",
  url: "https://www.sandeshjoshi.info.np/",
};

export default function Home() {
  const [homeData, setHomeData] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "siteData", "home"), (doc) => {
      if (doc.exists()) {
        setHomeData(doc.data());
      }
    });
    return () => unsub();
  }, []);

  if (!homeData) return null;

  return (
    <>
      <FramerWrapper
        className="h-full w-auto flex flex-col justify-start gap-4"
        y={0}
        x={-100}
      >
        <HeroTexts 
          staticRole={homeData.staticRole} 
          roles={homeData.roles} 
          name={homeData.name}
        />
        <div className="h-fit w-full p-4 flex gap-4">
          <SocialLinks socials={homeData.socials} />
        </div>
        <DownLoadResumeBtn />
      </FramerWrapper>

      <FramerWrapper
        className="h-full w-[47%] relative block max-lg:hidden"
        y={0}
        x={100}
      >
        <HeroImage url={homeData.heroImage} />
      </FramerWrapper>

      <GithubBtn />
    </>
  );
}
