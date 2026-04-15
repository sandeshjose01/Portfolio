"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FramerWrapper from "./animation/FramerWrapper";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";
import { useState } from "react";

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

  return (
    <>
      <FramerWrapper
        className="max-w-[48%] max-lg:max-w-full relative" // Increased width for a "bigger" gallery feel
        y={0}
        scale={0.9}
        delay={num / 4}
        duration={0.15}
      >
        <Card className="group w-full h-full flex flex-col border-0 bg-transparent shadow-none overflow-hidden">
          {/* LARGE GALLERY IMAGE CONTAINER */}
          <div
            className="relative w-full aspect-[16/10] overflow-hidden rounded-xl cursor-pointer shadow-md border dark:border-gray-800"
            onClick={() => setIsFullScreen(true)}
          >
            <img
              src={value.imageLink}
              alt={value.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Hover Overlay with Icon */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                  <ZoomIn className="text-white w-6 h-6" />
               </div>
            </div>
          </div>

          {/* GALLERY CONTENT - Minimalist style */}
          <div className="mt-4 px-1 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-2xl font-bold text-primary tracking-tight">
                {value.title}
              </CardTitle>
              <Link
                href={value.link}
                target="_blank"
                className="text-primary hover:text-blue-600 transition-colors"
              >
                <ArrowUpRight className="h-6 w-6" />
              </Link>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed line-clamp-2">
              {value.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              {value.tags.map((tag: string, index: number) => {
                const tagStyles: Record<string, string> = {
                  Nextjs: "bg-teal-100 text-teal-800 dark:bg-teal-900/30",
                  Freelancing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30",
                  "Shadcn Ui": "bg-blue-100 text-blue-800 dark:bg-blue-900/30",
                  Typescript: "bg-red-100 text-red-800 dark:bg-red-900/30",
                  "Logo Design": "bg-rose-100 text-rose-800 dark:bg-rose-900/30",
                  "Branding": "bg-amber-100 text-amber-800 dark:bg-amber-900/30",
                  "Photoshop": "bg-blue-100 text-blue-800 dark:bg-blue-900/30",
                  "Illustrator": "bg-orange-100 text-orange-800 dark:bg-orange-900/30",
                };

                const currentStyle = tagStyles[tag] || "bg-gray-100 text-gray-800 dark:bg-gray-800";

                return (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold transition-colors duration-200 ${currentStyle}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </Card>
      </FramerWrapper>

      {/* FULL-SCREEN IMAGE PREVIEW (LIGHTBOX) */}
      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300"
          onClick={() => setIsFullScreen(false)}
        >
          <button
            className="absolute top-6 right-6 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-all z-[110]"
            onClick={() => setIsFullScreen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <img
            src={value.imageLink}
            alt={value.title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center">
             <h2 className="text-2xl font-bold">{value.title}</h2>
             <p className="text-gray-400 mt-2">Click anywhere to close</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCards;
