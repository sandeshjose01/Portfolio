"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import FramerWrapper from "./animation/FramerWrapper";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  value: {
    title: string;
    description: string;
    tags: string[];
    link: string;
    imageLink: string;
  };
  num: number;
}

const ProjectCards: React.FC<ProjectCardProps> = ({ value, num }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Fixed Tag Styling (No duplicate keys to avoid Vercel build errors)
  const getTagStyle = (tag: string) => {
    const styles: Record<string, string> = {
      Photoshop: "bg-blue-100 text-blue-800 dark:bg-blue-900/40",
      Illustrator: "bg-orange-100 text-orange-800 dark:bg-orange-900/40",
      "UI Design": "bg-teal-100 text-teal-800 dark:bg-teal-900/40",
      Logo: "bg-rose-100 text-rose-800 dark:bg-rose-900/40",
      Freelancing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40",
      Personal: "bg-purple-100 text-purple-800 dark:bg-purple-900/40",
    };
    return styles[tag] || "bg-gray-100 text-gray-800 dark:bg-gray-800";
  };

  return (
    <>
      <FramerWrapper
        className="w-full relative"
        y={0}
        scale={0.95}
        delay={num * 0.1}
        duration={0.2}
      >
        <div className="group flex flex-col w-full bg-white dark:bg-transparent transition-all duration-300">
          
          {/* 1. BIG IMAGE PREVIEW (Sharp corners as requested) */}
          <div 
            className="relative aspect-video w-full overflow-hidden border border-gray-200 dark:border-gray-800 cursor-pointer"
            onClick={() => setIsFullScreen(true)}
          >
            <img
              src={value.imageLink}
              alt={value.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Hover Indicator */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                    <ZoomIn className="text-white w-6 h-6" />
                </div>
            </div>
          </div>

          {/* 2. PROJECT INFO SECTION (Below Image) */}
          <div className="pt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-primary tracking-tight group-hover:text-blue-600 transition-colors">
                {value.title}
              </h3>
              {value.link !== "#" && (
                <Link 
                   href={value.link} 
                   target="_blank" 
                   className="text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {value.description}
            </p>

            {/* TAGS SECTION */}
            <div className="flex flex-wrap gap-2 mt-1">
              {value.tags.map((tag, index) => (
                <span
                  key={index}
                  className={cn(
                    "px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm border border-transparent",
                    getTagStyle(tag)
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FramerWrapper>

      {/* 3. GLASSMORPHISM LIGHTBOX (Matches Category Modal) */}
      <AnimatePresence>
        {isFullScreen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Background Overlay - Clicking here closes it */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFullScreen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg cursor-zoom-out"
            />

            {/* Image Content Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-white/10 backdrop-blur-2xl border border-white/20 p-2 shadow-2xl"
            >
              <button
                className="absolute -top-12 right-0 text-white hover:text-blue-400 transition-colors"
                onClick={() => setIsFullScreen(false)}
              >
                <X className="w-8 h-8" />
              </button>
              
              <img
                src={value.imageLink}
                alt={value.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              <div className="p-6 text-white">
                <h2 className="text-2xl font-bold mb-1">{value.title}</h2>
                <p className="text-white/60 text-sm">{value.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCards;
