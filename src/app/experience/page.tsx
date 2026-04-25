"use client";
import React from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building2, Quote, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { experiencesData, recommendations } from "./experiences";

const ExperiencePage = () => {
  // Helper to calculate months/years automatically
  const calculateDuration = (start: string, end: string) => {
    const parseDate = (str: string) => {
        const normalized = str.toLowerCase();
        if (normalized === "present") return new Date();
        // Standardize date parsing
        return new Date(str);
    };
    
    const startDate = parseDate(start);
    const endDate = parseDate(end);
    
    // Calculate total months
    const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    const result = [];
    if (years > 0) result.push(`${years} yr${years > 1 ? "s" : ""}`);
    if (months > 0) result.push(`${months} mo${months > 1 ? "s" : ""}`);
    
    return result.join(" ") || "1 mo";
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
          <FramerWrapper key={exp.id} y={30} delay={index * 0.15}>
            <motion.div className="group relative flex flex-col sm:flex-row gap-6 w-full bg-white/40 rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm backdrop-blur-xl hover:border-blue-300 transition-all">
              
              {/* Company Logo */}
              <div className="flex shrink-0 items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
                {exp.logo ? (
                  <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-8 h-8 text-blue-600" />
                )}
              </div>

              {/* Roles and Timeline (LinkedIn Style) */}
              <div className="flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-slate-900">{exp.company}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-4">
                  <MapPin className="w-3.5 h-3.5" /> {exp.location}
                </div>

                {/* Vertical Timeline for Roles */}
                <div className="flex flex-col gap-8 relative border-l-2 border-slate-200 ml-2 pl-6">
                  {exp.roles.map((role, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline Dot */}
                      <span className="absolute -left-[31px] top-1.5 w-[14px] h-[14px] rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors border-2 border-white shadow-sm"></span>
                      
                      <h4 className="text-xl font-bold text-slate-800">{role.title}</h4>
                      <p className="text-sm font-semibold text-slate-500">
                        {role.startDate} - {role.endDate} · {calculateDuration(role.startDate, role.endDate)}
                      </p>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-0.5">{role.workType}</p>

                      <ul className="space-y-3 mt-4">
                        {role.description.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-base">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
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
