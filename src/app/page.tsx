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
  const [homeData, setHomeData] = useState<any>({
    name: "Sandesh Joshi",
    roles: ["Graphic Designer", "Freelancer"],
    heroImage: "",
    socials: {}
  });

  useEffect(() => {
    // text: Listening to siteData/home (Matches Admin Panel)
    const unsub = onSnapshot(doc(db, "siteData", "home"), (docSnap) => {
      if (docSnap.exists()) {
        console.log("Firebase Data Received:", docSnap.data());
        setHomeData(docSnap.data());
      } else {
        console.log("NO DATA IN FIREBASE - Check Admin Panel");
      }
    });
    return () => unsub();
  }, []);

  return (
    <>
      <FramerWrapper className="h-full w-auto flex flex-col justify-start gap-4" y={0} x={-100}>
        <HeroTexts 
          roles={homeData.roles} 
          name={homeData.name}
        />
        <div className="h-fit w-full p-4 flex gap-4">
          <SocialLinks socials={homeData.socials} />
        </div>
        <DownLoadResumeBtn />
      </FramerWrapper>

      <FramerWrapper className="h-full w-[47%] relative block max-lg:hidden" y={0} x={100}>
        <HeroImage url={homeData.heroImage} />
      </FramerWrapper>

      <GithubBtn />
    </>
  );
}
