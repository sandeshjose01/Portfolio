"use client";
import React from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building2, Quote, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import { experiencesData, recommendations } from "./experiences";

// Types for our new structure
interface Role {
  title: string;
  workType: string;
  startDate: string;
  endDate: string;
  description: string[];
}

interface Experience {
  id: number;
  company: string;
  logo: string;
  location: string;
  roles: Role[];
}

const ExperiencePage = () => {
  // --- HELPER FUNCTIONS FOR DATE CALCULATION ---
  const getMonthsDifference = (startDateStr: string, endDateStr: string) => {
    const parseDate = (str: string) => {
      if (str.toLowerCase() === "present") return new Date();
      return new Date(str); // e.g., "May 2025"
    };

    const start = parseDate(startDateStr);
    const end = parseDate(endDateStr);

    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months -= start.getMonth();
    months += end.getMonth();
    return months <= 0 ? 1 : months + 1; // Inclusive of start month
  };

  const formatDuration = (totalMonths: number) => {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    let result = [];
    if (years > 0) result.push(`${years} yr${years > 1 ? "s" : ""}`);
    if (months > 0) result.push(`${months} mo${months > 1 ? "s" : ""}`);
    return result.join(" ") || "Less than a month";
  };

  const calculateDuration = (start: string, end: string) => {
    return formatDuration(getMonthsDifference(start, end));
  };

  const calculateTotalCompanyDuration = (roles: Role[]) => {
    // Assuming roles are ordered from newest to oldest
    const earliestStart = roles[roles.length - 1].startDate;
    const latestEnd = roles[0].endDate;
    return formatDuration(getMonthsDifference(earliestStart, latestEnd));
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
            <motion.div className="group relative flex flex-col sm:flex-row gap-6 w-full bg-white/40 rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm backdrop-blur-xl transition-all hover:border-blue-300">
              
              {/* COMPANY LOGO */}
              <div className="flex shrink-0 items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
                {exp.logo ? (
                  <img 
                    src={exp.logo} 
                    alt={`${exp.company} logo`} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-indigo-600" />
                )}
              </div>

              {/* DETAILS */}
              <div className="flex flex-col flex-1 w-full">
                
                {exp.roles.length === 1 ? (
                  /* ===== SINGLE ROLE LAYOUT ===== */
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{exp.roles[0].title}</h3>
                      <h4 className="text-lg font-semibold text-slate-800 mt-1">
                        {exp.company} <span className="font-normal text-slate-600">· {exp.roles[0].workType}</span>
                      </h4>
                      <p className="text-sm font-medium text-slate-500 mt-1">
                        {exp.roles[0].startDate} - {exp.roles[0].endDate} · {calculateDuration(exp.roles[0].startDate, exp.roles[0].endDate)}
                      </p>
                      <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-1">
                        {exp.location}
                      </p>
                    </div>

                    <ul className="space-y-3 mt-2">
                      {exp.roles[0].description.map((point: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-base">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  /* ===== MULTIPLE ROLES LAYOUT (LINKEDIN STYLE) ===== */
                  <div className="flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-slate-900">{exp.company}</h3>
                      <p className="text-sm font-medium text-slate-500 mt-1">
                        {calculateTotalCompanyDuration(exp.roles)}
                      </p>
                      <p className="text-sm font-medium text-slate-500 mt-1">
                        {exp.location}
                      </p>
                    </div>

                    {/* Timeline Line wrapper */}
                    <div className="flex flex-col gap-8 relative border-l-2 border-slate-200 ml-2 pl-6">
                      {exp.roles.map((role: Role, idx: number) => (
                        <div key={idx} className="relative">
                          {/* Timeline Dot */}
                          <span className="absolute -left-[31px] top-1.5 w-[14px] h-[14px] rounded-full bg-slate-400 group-hover:bg-blue-500 transition-colors border-[3px] border-white shadow-sm"></span>
                          
                          <h4 className="text-xl font-bold text-slate-800">{role.title}</h4>
                          <p className="text-sm font-medium text-slate-500 mt-1">
                            {role.startDate} - {role.endDate} · {calculateDuration(role.startDate, role.endDate)}
                          </p>
                          <p className="text-sm font-medium text-slate-500 mt-1">
                            {role.workType}
                          </p>

                          <ul className="space-y-3 mt-4">
                            {role.description.map((point: string, i: number) => (
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
                )}
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
