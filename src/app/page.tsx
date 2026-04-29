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

export default function Home() {
  // // text: State to store data from Admin Panel
  const [homeData, setHomeData] = useState<any>(null);

  useEffect(() => {
    // // text: Real-time connection to Firebase
    const unsub = onSnapshot(doc(db, "siteData", "home"), (doc) => {
      if (doc.exists()) {
        setHomeData(doc.data());
      }
    });
    return () => unsub();
  }, []);

  // // text: Show nothing until data is loaded to prevent layout jump
  if (!homeData) return null;

  return (
    <>
      {/* LEFT SIDE  */}
      <FramerWrapper
        className="h-full w-auto flex flex-col justify-start gap-4"
        y={0}
        x={-100}
      >
        {/* // text: Passing dynamic data to HeroTexts */}
        <HeroTexts 
          staticRole={homeData.staticRole} 
          roles={homeData.roles} 
          name={homeData.name}
        />
        <div className="h-fit w-full p-4 flex gap-4">
          {/* // text: Passing dynamic socials */}
          <SocialLinks socials={homeData.socials} />
        </div>
        
        <DownLoadResumeBtn />
      </FramerWrapper>

      {/* RIGHT SIDE image  */}
      <FramerWrapper
        className="h-full w-[47%] relative block max-lg:hidden"
        y={0}
        x={100}
      >
        {/* // text: Passing dynamic hero image */}
        <HeroImage url={homeData.heroImage} />
      </FramerWrapper>

      <GithubBtn />
    </>
  );
}
