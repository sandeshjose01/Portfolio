"use client"; // Required because we are using useState for the full-screen modal

import React, { useState } from "react";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, PackagePlus, ArrowUpRight, X } from "lucide-react";
import {
  Card,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FramerWrapper from "@/components/animation/FramerWrapper";

// Define the type for your links so TypeScript doesn't complain
type LinkItem = {
  title: string;
  description: string;
  link: string;
  bentoClass: string;
};

const MorePage = () => {
  // State to control which project is currently open in the full-screen modal
  const [selectedProject, setSelectedProject] = useState<LinkItem | null>(null);

  const morelink: LinkItem[] = [
    {
      title: "Vercel",
      description: "Develop, preview, and ship. The frontend cloud.",
      link: "https://vercel.com",
      bentoClass: "md:col-span-2 md:row-span-2", 
    },
    {
      title: "Tailwind CSS",
      description: "Rapidly build modern websites without leaving your HTML.",
      link: "https://tailwindcss.com",
      bentoClass: "md:col-span-1 md:row-span-1", 
    },
    {
      title: "Next.js",
      description: "The React Framework for the Web.",
      link: "https://nextjs.org",
      bentoClass: "md:col-span-1 md:row-span-1", 
    },
    {
      title: "Framer Motion",
      description: "A production-ready motion library for React.",
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
        <Heading>More</Heading>
      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full py-4 auto-rows-[minmax(280px,auto)]">
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
              {/* Clicking this wrapper opens the full screen modal */}
              <div 
                onClick={() => setSelectedProject(value)}
                className="block w-full h-full group cursor-pointer"
              >
                <Card 
                  className={cn(
                    "w-full h-full flex flex-col overflow-hidden transition-all duration-500",
                    "border border-white/20 dark:border-white/10", 
                    "bg-white/10 dark:bg-black/20", 
                    "backdrop-blur-xl", 
                    "shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]", 
                    "group-hover:bg-white/20 dark:group-hover:bg-white/5 group-hover:border-white/30" 
                  )}
                >
                  <div className="w-full h-48 md:h-56 overflow-hidden relative border-b border-white/10">
                    <img
                      src={previewImageUrl}
                      alt={`Preview of ${value.title}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>

                  <div className="flex flex-col flex-grow p-5">
                    <CardTitle className="text-xl md:text-2xl mb-2">{value.title}</CardTitle>
                    <p className="text-sm md:text-base font-poppins text-muted-foreground flex-grow line-clamp-2">
                      {value.description}
                    </p>
                    <p className="text-xs font-semibold text-primary/80 mt-4 group-hover:text-primary transition-colors">
                      Click to view details &rarr;
                    </p>
                  </div>
                </Card>
              </div>
            </FramerWrapper>
          );
        })}
      </div> 

      {/* FULL SCREEN GLASSY MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          
          {/* Dark blurred background backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedProject(null)} // Close when clicking outside
          />

          {/* Modal Content Container */}
          <div className="relative w-full max-w-4xl bg-white/10 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Large Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative border-b md:border-b-0 md:border-r border-white/10">
              <img
                src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(selectedProject.link)}?w=1000`}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Right Side: Info & Visit Button */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {selectedProject.title}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-8">
                {selectedProject.description}
              </p>

              {/* The Visible Glassy "Visit" Button with Tilted Arrow */}
              <div className="mt-auto">
                <Link
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300",
                    // STRONG GLASS EFFECT & HIGH VISIBILITY:
                    "bg-white/20 hover:bg-white/30 text-foreground", 
                    "border-2 border-white/30 hover:border-white/50",
                    "backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  )}
                >
                  Visit 
                  {/* The 45-degree tilted arrow icon */}
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
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
