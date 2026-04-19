"use client";
import React from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import { motion } from "framer-motion";

// 1. ADD 'export' HERE. This allows the PDF generator to "see" this data.
export const experiences = [
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
    iconType: "briefcase"
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
    iconType: "building"
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
    iconType: "freelance"
  }
];

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
      <div className="flex flex-col gap-3 mt-10 w-full">
        <Badge variant="secondary" className="gap-1.5 py-1 w-fit">
          <Briefcase className="w-4 h-4" /> Professional Experience
        </Badge>
        <Heading>My Experience</Heading>
      </div>

      <div className="w-full flex flex-col gap-8 mt-4 relative">
        {experiences.map((exp, index) => (
          <FramerWrapper key={exp.id} y={30} delay={index * 0.15}>
            <motion.div className="group relative flex flex-col md:flex-row gap-6 w-full bg-white/40 rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm backdrop-blur-xl">
              <div className="hidden md:flex shrink-0 items-center justify-center w-16 h-16 rounded-2xl bg-white/60 border border-white">
                {renderIcon(exp.iconType)}
              </div>
              <div className="flex flex-col flex-1 gap-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{exp.role}</h3>
                    <h4 className="text-lg font-semibold text-blue-600">{exp.company}</h4>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700 bg-white/60 px-3 py-1 rounded-lg border border-white">
                      <Calendar className="w-4 h-4 text-blue-500" /> {exp.duration}
                    </div>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
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
