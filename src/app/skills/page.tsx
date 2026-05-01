"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc } from "firebase/firestore";
import Heading from "@/components/Heading";
import SkillsFooter from "@/components/SkillsFotter"; // Using your exact spelling 'Fotter'
import { Badge } from "@/components/ui/badge";
import { LightbulbIcon } from "lucide-react";
import FramerWrapper from "@/components/animation/FramerWrapper";

export default function SkillPage() {
  const [adminSkills, setAdminSkills] = useState<any[]>([]);
  const [pageData, setPageData] = useState({
    heading: "My Technical Experience/Skills.",
    description: "Currently I am a Graphic Designer with 5+ year of experience and I have a solid understanding of Adobe Photoshop, Adobe Illustrator, Adobe Indesign, Adobe Premiere Pro, Adobe After Effect, Canva, Microsoft office & Other Tools."
  });

  // --- CATEGORY LIST (Matches Admin Panel) ---
  const CATEGORY_LIST = [
      "Brand & Visual Identity",
      "UI/UX & Web Solutions",
      "Video & Motion Graphics",
      "Digital Marketing",
      "Business & Productivity",
      "Creative Assets",
      "Generative AI Art & Creative Direction",
      "3D Creation Tool",
      "Others"
  ];

  // --- ORIGINAL DATA FOR FALLBACK (Safety Net) ---
  const defaultGraphic = [
    { name: "Adobe Creative Suite", icon: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg" },
    { name: "Adobe Photoshop", icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
    { name: "Adobe Illustrator", icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" },
    { name: "Adobe InDesign", icon: "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg" },
    { name: "Canva", icon: "https://img.icons8.com/?size=100&id=iWw83PVcBpLw&format=png&color=000000" },
  ];

  const defaultVideo = [
    { name: "Adobe Premiere Pro", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Adobe_Premiere_Pro_CC_2026_icon.svg/250px-Adobe_Premiere_Pro_CC_2026_icon.svg.png" },
    { name: "Adobe After Effect", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Adobe_After_Effects_CC_2026_icon.svg/250px-Adobe_After_Effects_CC_2026_icon.svg.png" },
  ];

  useEffect(() => {
    // 1. Sync Page Header (Heading & Paragraph)
    const unsubHeader = onSnapshot(doc(db, "siteData", "skillsPage"), (d) => {
      if(d.exists()) setPageData({ heading: d.data().heading, description: d.data().description });
    });

    // 2. Sync Skills List
    const unsubSkills = onSnapshot(query(collection(db, "skills"), orderBy("order", "asc")), (snap) => {
      const items: any[] = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setAdminSkills(items);
    });

    return () => { unsubHeader(); unsubSkills(); };
  }, []);

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-hidden">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <LightbulbIcon className="w-4 h-4" />
        My Skills
      </Badge>

      <div className="flex flex-col gap-3 w-full">
        <Heading>{pageData.heading}</Heading>
        
        <FramerWrapper y={0} x={200}>
          <p className="font-poppins text-xl w-full text-primary max-sm:text-lg">
            {pageData.description}
          </p>
        </FramerWrapper>

        {/* --- DYNAMIC CATEGORY RENDERING --- */}
        {CATEGORY_LIST.map((catName, categoryIndex) => {
          // Filter items belonging to this category
          const itemsFromAdmin = adminSkills.filter(s => s.category === catName);
          
          // Determine what to show (Admin Data OR Fallback for specific categories)
          let finalItems = itemsFromAdmin;
          
          // Fallback logic if Admin is empty
          if (itemsFromAdmin.length === 0) {
            if (catName === "Brand & Visual Identity") finalItems = defaultGraphic;
            if (catName === "Video & Motion Graphics") finalItems = defaultVideo;
          }

          // If no items in Admin and no fallbacks, don't show the section
          if (finalItems.length === 0) return null;

          return (
            <FramerWrapper key={catName} y={100} delay={0.3 + (categoryIndex * 0.1)} className="block w-full">
              <h1 className="gap-2 text-2xl font-poppins text-primary font-semibold flex text_underline relative max-sm:text-xl mb-4">
                {catName}
              </h1>
              <div className="w-full grid grid-cols-7 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4">
                <SkillsFooter items={finalItems} />
              </div>
            </FramerWrapper>
          );
        })}
        
      </div>
    </div>
  );
}
