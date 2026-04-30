"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

// --- ORIGINAL DATA (The "OR" Fallback) ---
const DEFAULT_SKILLS = [
  { id: "1", name: "Adobe Photoshop", category: "Software Proficiency", icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
  { id: "2", name: "Adobe Illustrator", category: "Software Proficiency", icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" },
  { id: "3", name: "Adobe InDesign", category: "Software Proficiency", icon: "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg" },
  { id: "4", name: "After Effects", category: "Software Proficiency", icon: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg" },
  { id: "5", name: "Premiere Pro", category: "Software Proficiency", icon: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" },
  { id: "6", name: "Figma", category: "Software Proficiency", icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
];

export default function SkillsPage() {
  const [adminSkills, setAdminSkills] = useState<any[]>([]);
  
  // // text: OR logic - Use Admin data if exists, otherwise show your original list
  const displaySkills = adminSkills.length > 0 ? adminSkills : DEFAULT_SKILLS;

  useEffect(() => {
    // // text: Real-time sync with Admin Panel
    const unsub = onSnapshot(query(collection(db, "skills"), orderBy("order", "asc")), (snap) => {
      const items: any[] = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setAdminSkills(items);
    });
    return () => unsub();
  }, []);

  const categories = Array.from(new Set(displaySkills.map(s => s.category)));

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-20 px-4 md:px-10">
      <Badge variant="secondary" className="gap-1.5 py-1"><Zap className="w-4 h-4" /> My Skills</Badge>
      <Heading>Technical Proficiencies</Heading>

      <div className="w-full space-y-16">
        {categories.map((cat: any) => (
          <div key={cat} className="space-y-8">
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{cat}</h2>
                <div className="h-[1px] flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {displaySkills.filter(s => s.category === cat).map((skill, index) => (
                /* // text: KEEPING YOUR ORIGINAL FRAMER ANIMATION SETTINGS */
                <FramerWrapper key={skill.id || index} y={20} delay={index * 0.05}>
                  <div className="group bg-white/[0.03] border border-white/5 rounded-3xl p-8 flex flex-col items-center gap-4 hover:bg-white/[0.07] transition-all hover:-translate-y-2 hover:border-blue-500/30">
                    <img src={skill.icon} alt={skill.name} className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-500" />
                    <span className="text-xs font-bold text-white/70 group-hover:text-white text-center uppercase tracking-widest">{skill.name}</span>
                  </div>
                </FramerWrapper>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
