"use client";
import React from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, Building2, Quote } from "lucide-react";
import { motion } from "framer-motion";

// Import both experiences and recommendations from your data file
import { experiencesData, recommendations } from "./experiences";

const ExperiencePage = () => {
  const renderIcon = (type: string) => {
    switch (type) {
      case "building": return <Building2 className="w-6 h-6 text-indigo-600" />;
      case "freelance": return <Briefcase className="w-6 h-6 text-slate-600" />;
      default: return <Briefcase className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-32 px-4 md:px-10 max-w-6xl mx-auto">
      
      {/* --- EXPERIENCE SECTION --- */}
      <div className="flex flex-col gap-3 mt-10 w-full">
        <Badge variant="secondary" className="gap-1.5 py-1 w-fit">
          <Briefcase className="w-4 h-4" /> Professional Experience
        </Badge>
        <Heading>My Experience</Heading>
      </div>

      <div className="w-full flex flex-col gap-8 mt-4">
        {experiencesData && experiencesData.map((exp: any, index: number) => (
          <FramerWrapper key={index} y={30} delay={index * 0.15}>
            <motion.div className="group relative flex flex-col md:flex-row gap-6 w-full bg-white/40 rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm backdrop-blur-xl transition-all hover:border-blue-300">
              
              <div className="flex shrink-0 items-center justify-center w-16 h-16 rounded-2xl bg-white border border-white shadow-sm overflow-hidden">
                {exp.logo ? (
                  <img 
                    src={exp.logo} 
                    alt={`${exp.company} logo`} 
                    className="w-full h-full object-contain p-2" 
                  />
                ) : (
                  renderIcon(exp.iconType)
                )}
              </div>

              <div className="flex flex-col flex-1 gap-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{exp.role}</h3>
                    <h4 className="text-lg font-semibold text-blue-600">{exp.company}</h4>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700 bg-white/60 px-3 py-1 rounded-lg border border-white shadow-sm">
                      <Calendar className="w-4 h-4 text-blue-500" /> {exp.duration}
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {exp.description.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-base">
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

      {/* --- RECOMMENDATIONS SECTION --- */}
      <div className="flex flex-col gap-3 mt-24 w-full">
        <Badge variant="secondary" className="gap-1.5 py-1 w-fit">
          <Quote className="w-4 h-4" /> Recommendations
        </Badge>
        <Heading>What People Say</Heading>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
        {recommendations && recommendations.map((rec: any, index: number) => (
          <FramerWrapper key={index} y={30} delay={0.2 + index * 0.1}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-3xl bg-white/40 border border-white/60 shadow-sm backdrop-blur-xl flex flex-col gap-4 h-full"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-blue-500/10" />
              
              {/* FIXED: Using &quot; instead of literal " to satisfy build rules */}
              <p className="text-slate-700 italic leading-relaxed z-10 text-base">
                &quot;{rec.text}&quot;
              </p>

              <div className="flex items-center gap-4 mt-auto pt-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 border-2 border-white overflow-hidden shrink-0 flex items-center justify-center">
                   {rec.image ? (
                     <img src={rec.image} alt={rec.name} className="w-full h-full object-cover" />
                   ) : (
                     <span className="font-bold text-blue-600">{rec.name.charAt(0)}</span>
                   )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-tight">{rec.name}</h4>
                  <p className="text-xs text-blue-600 font-semibold">{rec.designation}</p>
                </div>
              </div>
            </motion.div>
          </FramerWrapper>
        ))}
      </div>

      {/* FOOTER LINK */}
      <div className="w-full flex justify-center mt-12">
        <a 
          href="https://www.linkedin.com/in/sanjoshi1/details/recommendations/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-all"
        >
          View more recommendations on LinkedIn
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

    </div>
  );
};

export default ExperiencePage;
