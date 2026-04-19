"use client";
import React from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, Building2 } from "lucide-react";
import { motion } from "framer-motion";

// IMPORT DATA FROM THE NEW FILE
import { experiencesData } from "./experiences";

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
       {/* ... the rest of your UI code stays exactly as it was ... */}
       {/* Use experiencesData.map instead of experiences.map */}
       {experiencesData.map((exp, index) => (
          <FramerWrapper key={exp.id} y={30} delay={index * 0.15}>
             {/* ... card code ... */}
          </FramerWrapper>
       ))}
    </div>
  );
};

export default ExperiencePage;
