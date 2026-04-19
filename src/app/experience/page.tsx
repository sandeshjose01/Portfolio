"use client";
import React from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Download, MapPin, Calendar, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const ExperiencePage = () => {
  // REVERSE CHRONOLOGICAL ORDER (Newest first)
  const experiences = [
    {
      id: 1,
      role: "Senior Graphic Designer & UI/UX",
      company: "Creative Studio Solutions",
      duration: "Jan 2022 – Present",
      location: "Remote",
      description: [
        "Led the design of 15+ comprehensive brand identity packages, resulting in a 30% increase in client engagement.",
        "Collaborated with the development team to design intuitive UI/UX for web and mobile applications using Figma.",
        "Managed multiple social media campaigns, designing cohesive grids and ad banners that boosted conversion by 25%.",
      ],
      icon: <Briefcase className="w-6 h-6 text-blue-600" />
    },
    {
      id: 2,
      role: "Graphic Designer",
      company: "Marketing Agency X",
      duration: "Mar 2019 – Dec 2021",
      location: "Kathmandu, Nepal",
      description: [
        "Designed high-quality print materials including flex designs, brochures, and event posters for over 50 corporate events.",
        "Created custom product packaging and labels for local retail brands, improving product shelf-visibility.",
        "Assisted in photo manipulation and typography choices for large-scale digital marketing campaigns.",
      ],
      icon: <Building2 className="w-6 h-6 text-indigo-600" />
    },
    {
      id: 3,
      role: "Freelance Designer",
      company: "Self-Employed",
      duration: "Jun 2017 – Feb 2019",
      location: "Global",
      description: [
        "Provided custom canvas prints and 3D mockups for various e-commerce businesses.",
        "Designed experimental festive social media posts, increasing personal portfolio reach.",
      ],
      icon: <Briefcase className="w-6 h-6 text-slate-600" />
    }
  ];

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-32 px-4 md:px-10 select-none max-w-6xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-6 mt-10">
        <div className="flex flex-col gap-3">
          <Badge variant="secondary" className="gap-1.5 py-1 w-fit">
            <Briefcase className="w-4 h-4" /> Professional Experience
          </Badge>
          <Heading>My Experience</Heading>
          <p className="font-poppins text-lg text-muted-foreground max-w-2xl">
            A reverse-chronological timeline of my professional journey, highlighting my roles, responsibilities, and achievements.
          </p>
        </div>

        {/* ATS-FRIENDLY DOWNLOAD BUTTON */}
        <a 
          href="/Sandesh_Joshi_Resume.pdf" // Ensure you put this PDF in your "public" folder
          download="Sandesh_Joshi_Resume.pdf"
          className="group flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
        >
          <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          Download CV (PDF)
        </a>
      </div>

      {/* EXPERIENCE BOXES (GLASS EFFECT) */}
      <div className="w-full flex flex-col gap-8 mt-4 relative">
        
        {/* Subtle Timeline Background Line */}
        <div className="absolute left-[39px] md:left-[43px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-400 via-slate-300 to-transparent opacity-50 hidden md:block"></div>

        {experiences.map((exp, index) => (
          <FramerWrapper key={exp.id} y={30} delay={index * 0.15}>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="group relative flex flex-col md:flex-row gap-6 w-full bg-white/40 rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm backdrop-blur-xl transition-all hover:border-blue-300 hover:shadow-md"
            >
              
              {/* ICON FLOATER */}
              <div className="hidden md:flex shrink-0 items-center justify-center w-16 h-16 rounded-2xl bg-white/60 border border-white shadow-sm z-10 group-hover:scale-110 transition-transform duration-500">
                {exp.icon}
              </div>

              {/* CONTENT CONTENT */}
              <div className="flex flex-col flex-1 gap-4">
                
                {/* Job Title & Company */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                      {exp.role}
                    </h3>
                    <h4 className="text-lg font-semibold text-blue-600 mt-1">
                      {exp.company}
                    </h4>
                  </div>
                  
                  {/* Date & Location Badges */}
                  <div className="flex flex-col items-start md:items-end gap-2 shrink-0 mt-2 md:mt-0">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700 bg-white/60 px-3 py-1 rounded-lg border border-white shadow-sm">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      {exp.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <hr className="border-white/50 my-2" />

                {/* Professional LinkedIn Style Bullet Points */}
                <ul className="space-y-3">
                  {exp.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-base leading-relaxed font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></span>
                      {point}
                    </li>
                  ))}
                </ul>

              </div>
            </motion.div>
          </FramerWrapper>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;
