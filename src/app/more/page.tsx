"use client";

import React, { useState } from "react";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { PackagePlus, ArrowUpRight, X } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FramerWrapper from "@/components/animation/FramerWrapper";

type LinkItem = {
  title: string;
  description: string;
  link: string;
  bentoClass: string;
};

const MorePage = () => {
  const [selectedProject, setSelectedProject] = useState<LinkItem | null>(null);

  const morelink: LinkItem[] = [
    {
      title: "Vercel",
      description: "Develop, preview, and ship. The frontend cloud. Vercel provides the developer experience and infrastructure to build, scale, and secure a faster, more personalized web.",
      link: "https://vercel.com",
      bentoClass: "md:col-span-2 md:row-span-2", 
    },
    {
      title: "Tailwind CSS",
      description: "Rapidly build modern websites without ever leaving your HTML.",
      link: "https://tailwindcss.com",
      bentoClass: "md:col-span-1 md:row-span-1", 
    },
    {
      title: "Next.js",
      description: "The React Framework for the Web. Used by some of the world's largest companies.",
      link: "https://nextjs.org",
      bentoClass: "md:col-span-1 md:row-span-1", 
    },
    {
      title: "Framer Motion",
      description: "A production-ready motion library for React. Utilize the power of declarative animations to build fluid, beautiful user interfaces.",
      link: "https://www.framer.com/motion/",
      bentoClass: "md:col-span-3 md:row-span-1", 
    },
  ];

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-hidden p-4">
      
      {/* Decorative Background for Glassmorphism */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <Badge variant="secondary" className="gap-1.5 py-1 backdrop-blur-md bg-secondary/50">
        <PackagePlus className="h-4 w-4" />
        More
      </Badge>
      
      <div className="flex flex-col gap-3">
        <Heading>More Links</Heading>
      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full py-4 auto-rows-[minmax(320px,auto)]">
        {morelink.map((value, indx) => {
          
          const previewImageUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(value.link)}?w=800`;

          return (
            <FramerWrapper 
              key={indx} 
              className={cn("w-full h-full", value.bentoClass)} 
              y={0} 
              scale={0.8} 
              delay={indx / 4} 
              duration={0.15}
            >
              {/* Card Container - Clicking opens modal */}
              <div 
                onClick={() => setSelectedProject(value)}
                className="block w-full h-full group cursor-pointer"
              >
                <Card 
                  className={cn(
                    "w-full h-full flex flex-col overflow-hidden transition-all duration-500 relative",
                    "border border-white/20 dark:border-white/10", 
                    "bg-white/10 dark:bg-black/20", 
                    "backdrop-blur-xl", 
                    "shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]", 
                    "hover:bg-white/20 dark:hover:bg-white/5 hover:border-white/30" 
                  )}
                >
                  <div className="w-full h-48 md:h-56 overflow-hidden relative border-b border-white/10">
                    <img
                      src={previewImageUrl}
                      alt={`Preview of ${value.title}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>

                  <div className="flex flex-col flex-grow p-5">
                    <CardTitle className="text-xl md:text-2xl mb-2">{value.title}</CardTitle>
                    <p className="text-sm md:text-base font-poppins text-muted-foreground flex-grow line-clamp-2 mb-4">
                      {value.description}
                    </p>
                    
                    {/* BUTTON ON THE GRID CARD */}
                    <div className="mt-auto relative z-20">
                      <Link
                        href={value.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        // e.stopPropagation() prevents the card's onClick from firing when the button is clicked
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300",
                          "bg-white/20 hover:bg-white/30 text-foreground", 
                          "border border-white/30 hover:border-white/50",
                          "backdrop-blur-md shadow-sm"
                        )}
                      >
                        Visit
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            </FramerWrapper>
          );
        })}
      </div> 

      {/* FULL SCREEN MASSIVE GLASSY MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6">
          
          {/* Dark blurred background backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedProject(null)} 
          />

          {/* Huge Modal Content Container (95vw wide, 90vh tall) */}
          <div className="relative w-[95vw] max-w-7xl h-[90vh] bg-white/10 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Side: Massive Image taking up 60% width on desktop */}
            <div className="w-full md:w-[60%] h-[40%] md:h-full relative border-b md:border-b-0 md:border-r border-white/10 bg-black/20">
              <img
                src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(selectedProject.link)}?w=1200`}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right Side: Info & Visit Button taking up 40% width on desktop */}
            <div className="w-full md:w-[40%] p-6 md:p-12 flex flex-col h-[60%] md:h-full overflow-y-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
                {selectedProject.title}
              </h2>
              <p className="text-base md:text-xl leading-relaxed text-muted-foreground mb-8">
                {selectedProject.description}
              </p>

              {/* BUTTON INSIDE THE OPENED POPUP CARD */}
              <div className="mt-auto pt-8">
                <Link
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg transition-all duration-300",
                    // Super visible glassy styling for the huge modal
                    "bg-white/20 hover:bg-white/30 text-foreground", 
                    "border-2 border-white/40 hover:border-white/60",
                    "backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  )}
                >
                  Visit Website
                  <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
      
    </div>
  );
};

export default MorePage;
