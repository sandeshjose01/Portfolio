"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc } from "firebase/firestore";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

export default function SkillsPage() {
  const [adminSkills, setAdminSkills] = useState<any[]>([]);
  const [pageData, setPageData] = useState({
    heading: "My Technical Experience/Skills.",
    description: "Currently I am a Graphic Designer with 3+ year of experience and I have a solid understanding of Adobe Photoshop, Adobe Illustrator, Adobe Indesign, Adobe Premiere Pro, Adobe After Effect, Canva & Microsoft office."
  });

  useEffect(() => {
    // Sync Page Header
    const unsubHeader = onSnapshot(doc(db, "siteData", "skillsPage"), (d) => {
      if(d.exists()) setPageData({ heading: d.data().heading, description: d.data().description });
    });
    // Sync Skills List
    const unsubSkills = onSnapshot(query(collection(db, "skills"), orderBy("order", "asc")), (snap) => {
      const items: any[] = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setAdminSkills(items);
    });
    return () => { unsubHeader(); unsubSkills(); };
  }, []);

  const categories = ["Graphic Designing Tools", "Video Editing Tools", "Microsoft Office", "Other Tools"];

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-5 pb-20 px-4 md:px-10">
      {/* 1. BADGE */}
      <Badge variant="secondary" className="gap-1.5 py-1 text-[10px] uppercase font-bold">
        <Zap className="w-3.5 h-3.5" /> My Skills
      </Badge>

      {/* 2. HEADING WITH DESIGN UNDERLINE */}
      <div className="relative">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] tracking-tight">
          {pageData.heading}
        </h1>
        {/* This matches the thick blue underline in your screenshot */}
        <div className="absolute -bottom-2 left-0 w-20 h-1.5 bg-[#2f7df4] rounded-full" />
      </div>

      {/* 3. INTRO PARAGRAPH */}
      <p className="max-w-4xl text-gray-600 text-lg md:text-xl font-medium leading-relaxed mt-4">
        {pageData.description}
      </p>

      {/* 4. DYNAMIC CATEGORIES & TOOLS */}
      <div className="w-full space-y-12 mt-8">
        {categories.map((cat) => {
          const filtered = adminSkills.filter(s => s.category === cat);
          if (filtered.length === 0) return null;

          return (
            <div key={cat} className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a]">{cat}</h2>
              <div className="flex flex-wrap gap-x-12 gap-y-10">
                {filtered.map((skill, index) => (
                  <FramerWrapper key={skill.id} y={20} delay={index * 0.1}>
                    <div className="flex flex-col items-center gap-3 group">
                      {/* Exact spacing and icon size from screenshot */}
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-14 h-14 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110" 
                      />
                      <span className="text-[11px] md:text-xs font-bold text-gray-500 uppercase tracking-widest text-center">
                        {skill.name}
                      </span>
                    </div>
                  </FramerWrapper>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
