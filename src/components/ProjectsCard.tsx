"use client";
import { useState } from "react";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Layers, X, ArrowRight } from "lucide-react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import { motion, AnimatePresence } from "framer-motion";

const ProjectPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const categories = [
    {
      title: "Personal Project",
      description: "Showcasing my own work.",
      subcategories: ["Logo Design", "Typography Choices", "Brand Color Palettes", "Corporate Stationery"],
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
    },

    {
      title: "Brand Identity & Logo Design",
      description: "Creating a recognizable face for businesses.",
      subcategories: ["Logo Design", "Typography Choices", "Brand Color Palettes", "Corporate Stationery"],
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Social Media & Digital Marketing",
      description: "High-engagement content for modern platforms.",
      subcategories: ["Instagram Grids", "Ad Banners", "Cohesive Social Media Posts", "Email Templates"],
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Print & Large Format Media",
      description: "Technical knowledge of physical production.",
      subcategories: ["Flex Designs", "Calendars", "Brochures", "Event Posters"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Photo Manipulation",
      description: "Creative, out-of-the-box Photoshop work.",
      subcategories: ["Surreal Composites", "Cinematic Scenes", "Before & After Edits", "Digital Painting"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    }
    {
      title: "UI/UX & Web Design",
      description: "Designing digital experiences and user navigation.",
      subcategories: ["Website Landing Pages", "Mobile App Interfaces", "Portfolio Designs", "Wireframing"],
      image: "https://images.unsplash.com/photo-1581291518062-c9a79e7df0f0?q=80&w=1000&auto=format&fit=crop",
    },

  ];

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-20 px-4 md:px-10">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Layers className="w-4 h-4" />
        My Projects
      </Badge>

      <div className="flex flex-col gap-3">
        <Heading>Main Categories</Heading>
        <p className="font-poppins text-lg w-full text-muted-foreground max-w-2xl">
          Click on a category to explore sub-categories and specific works.
        </p>
      </div>

      {/* 3-COLUMN GRID (3 items per row) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
        {categories.map((cat, index) => (
          <FramerWrapper key={cat.id} y={20} delay={index * 0.1}>
            <div 
              onClick={() => setSelectedCategory(cat)}
              className="group cursor-pointer flex flex-col w-full"
            >
              {/* BIG PICTURE (Square corners as requested) */}
              <div className="relative aspect-video w-full overflow-hidden border border-gray-200 dark:border-gray-800">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* TEXT SECTION BELOW IMAGE */}
              <div className="pt-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                   <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Category {index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-primary group-hover:text-blue-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{cat.description}</p>
              </div>
            </div>
          </FramerWrapper>
        ))}
      </div>

      {/* GLASSMORPHISM POPUP MODAL */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark Overlay (Clicking here closes the popup) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Glass Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl p-8 md:p-12"
            >
              <button 
                onClick={() => setSelectedCategory(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold text-white tracking-tight">
                    {selectedCategory.title}
                  </h2>
                  <p className="text-blue-200 font-medium">Sub-categories available:</p>
                </div>

                {/* Sub-category list inside glass modal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {selectedCategory.subcategories.map((sub: string, i: number) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={i} 
                      className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white"
                    >
                      <div className="h-2 w-2 bg-blue-400 rounded-full" />
                      <span className="font-poppins">{sub}</span>
                    </motion.div>
                  ))}
                </div>

                <button 
                   onClick={() => setSelectedCategory(null)}
                   className="mt-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back to My Projects
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectPage;
