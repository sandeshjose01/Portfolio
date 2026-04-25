import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, PackagePlus } from "lucide-react";
import {
  Card,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import FramerWrapper from "@/components/animation/FramerWrapper";

const MorePage = () => {
  // 1. DATA WITH BENTO GRID SPANS
  const morelink = [
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
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] -z-10" />

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
          
          // Automatic Website Preview
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
              <Card 
                className={cn(
                  "w-full h-full flex flex-col overflow-hidden group transition-all duration-500",
                  "border border-white/20 dark:border-white/10", 
                  "bg-white/10 dark:bg-black/20", 
                  "backdrop-blur-xl", 
                  "shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]", 
                  "hover:bg-white/20 dark:hover:bg-white/5 hover:border-white/30" 
                )}
              >
                
                {/* Website Preview Image Section */}
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
                  
                  <p className="text-sm md:text-base font-poppins text-muted-foreground flex-grow">
                    {value.description}
                  </p>
                  
                  <div className="pt-4 mt-auto">
                    <Link
                      href={value.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        // ERROR FIXED HERE: Changed "secondary" to "default"
                        buttonVariants({ variant: "default", size: "lg" }),
                        "w-full gap-3 bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors"
                      )}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Website
                    </Link>
                  </div>
                </div>

              </Card>
            </FramerWrapper>
          );
        })}
      </div> 
    </div>
  );
};

export default MorePage;
