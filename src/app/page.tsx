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

export const siteConfig = {
  name: "Sandesh joshi",
  description: "I am a Passionate Graphic Designer",
  ogImage: "https://sandeshjose01.vercel.app/og-image.png",
  url: "https://www.sandeshjoshi.info.np/",
};

export default function Home() {
  // // text: Default data so the site shows something even before Firebase loads
  const [homeData, setHomeData] = useState<any>({
    name: "Sandesh Joshi",
    staticRole: "I am a Passionate Graphic Designer &",
    roles: ["Freelancer", "Designer", "Creator"],
    heroImage: "",
    socials: {}
  });

  useEffect(() => {
    // // text: Real-time listener to the EXACT path used in Admin Panel
    const unsub = onSnapshot(doc(db, "siteData", "home"), (docSnap) => {
      if (docSnap.exists()) {
        setHomeData(docSnap.data());
      }
    });
    return () => unsub();
  }, []);

  return (
    <>
      <FramerWrapper
        className="h-full w-auto flex flex-col justify-start gap-4"
        y={0}
        x={-100}
      >
        <HeroTexts 
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
