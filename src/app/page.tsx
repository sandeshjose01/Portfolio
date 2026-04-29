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
  const [homeData, setHomeData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // text: Listening to siteData/home
    const unsub = onSnapshot(doc(db, "siteData", "home"), 
      (docSnap) => {
        if (docSnap.exists()) {
          setHomeData(docSnap.data());
        } else {
          setError("Database connected, but 'siteData/home' is empty. Please save data in Admin Panel.");
        }
      },
      (err) => {
        console.error("Firebase Error:", err);
        setError("Connection failed: " + err.message);
      }
    );
    return () => unsub();
  }, []);

  // text: If there is an error or no data yet, show a clear message
  if (error) return <div className="h-screen bg-black text-red-500 flex items-center justify-center p-10 text-center font-bold">{error}</div>;
  if (!homeData) return <div className="h-screen bg-black text-white flex items-center justify-center animate-pulse font-black uppercase tracking-widest">Connecting to SJ.STUDIO...</div>;

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
