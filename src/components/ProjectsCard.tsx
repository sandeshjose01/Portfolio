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
import { ArrowUpRight, X } from "lucide-react";
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
        className="max-w-[32%] max-lg:max-w-full relative"
        y={0}
        scale={0.8}
        delay={num / 4}
        duration={0.15}
      >
        <Card
          className="w-full h-full flex flex-col hover:shadow-xl transition-all duration-300 border-2 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
        >
          {/* Image inside Card */}
          <div
            className="relative w-full h-64 overflow-hidden cursor-pointer"
            onClick={() => setIsFullScreen(true)}
          >
            <img
              src={value.imageLink}
              alt={value.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-colors duration-300" />
          </div>

          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold text-primary tracking-tight">
              {value.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow flex flex-col gap-4 px-4">
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {value.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {value.tags.map((tag: string, index: number) => {
                const tagStyles =
                  {
                    Nextjs:
                      "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
                    Freelancing:
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                    "Shadcn Ui":
                      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                    Typescript:
                      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                    MySQL:
                      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                    Zustand:
                      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                    Supabase:
                      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
                    Npx: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
                    Library:
                      "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
                    Zod: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
                    "React Hook Form":
                      "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
                  }[tag] ||
                  "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

                return (
                  <span
                    key={index}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-200 ${tagStyles}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </CardContent>

          <CardFooter className="pt-2 px-4 pb-4">
            <Link
              href={value.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "sm",
                }),
                "w-fit transition-all hover:translate-y-[-2px] hover:shadow-md group bg-primary text-white hover:bg-primary/90"
              )}
            >
              Visit Project
              <ArrowUpRight className="h-4 w-4 ml-1 hidden group-hover:block -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </Link>
          </CardFooter>
        </Card>
      </FramerWrapper>

      {/* Full-Screen Image Preview */}
      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsFullScreen(false)}
        >
          <button
            className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
            onClick={() => setIsFullScreen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={value.imageLink}
            alt={value.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
};

export default ProjectCards;
