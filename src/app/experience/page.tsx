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
        {experiencesData.map((exp, index) => (
          <FramerWrapper key={index} y={30} delay={index * 0.15}>
            <motion.div className="group relative flex flex-col md:flex-row gap-6 w-full bg-white/40 rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm backdrop-blur-xl transition-all hover:border-blue-300">
              
              {/* LOGO / ICON BOX */}
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
                  {exp.description.map((point, i) => (
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
        {recommendations && recommendations.map((rec, index) => (
          <FramerWrapper key={rec.id} y={30} delay={0.2 + index * 0.1}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-3xl bg-white/40 border border-white/60 shadow-sm
