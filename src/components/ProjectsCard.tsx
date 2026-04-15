import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Megaphone, 
  Monitor, 
  BookOpen, 
  Package, 
  Video, 
  Layers, 
  ArrowRight 
} from "lucide-react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Link from "next/link";

const ProjectPage = () => {
  const categories = [
    {
      title: "Visual Identity Design",
      icon: <Palette className="w-8 h-8 text-blue-500" />,
      subcategories: ["Logo Design", "Color Systems", "Typography", "Iconography & Graphic Patterns", "Brand Style Guides", "Corporate Stationery"],
      description: "Crafting unique brand languages and memorable visual identities.",
      gradient: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
    },
    {
      title: "Marketing & Advertising Design",
      icon: <Megaphone className="w-8 h-8 text-orange-500" />,
      subcategories: ["Social Media Graphics", "Print Collateral", "Large-Format Design", "Digital Advertising", "Presentation Design"],
      description: "Strategic visual communication that drives engagement and results.",
      gradient: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
    },
    {
      title: "UI & Digital Design",
      icon: <Monitor className="w-8 h-8 text-teal-500" />,
      subcategories: ["Webpage Design", "App Design", "Wireframing", "Game Interfaces", "Interactive Prototyping"],
      description: "User-centric digital experiences with modern, clean interfaces.",
      gradient: "from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20"
    },
    {
      title: "Publication Design",
      icon: <BookOpen className="w-8 h-8 text-purple-500" />,
      subcategories: ["Magazines", "Book Covers", "Annual Reports", "Newsletters", "Catalogs & Brochures"],
      description: "Professional layout design for print and digital publications.",
      gradient: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
    },
    {
      title: "Packaging Design",
      icon: <Package className="w-8 h-8 text-amber-500" />,
      subcategories: ["Label & Sticker Design", "Container Design", "Inner Packaging", "Outer Packaging", "Mockups & Print-Ready Files"],
      description: "Product packaging that stands out on the shelf and protects with style.",
      gradient: "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20"
    },
    {
      title: "Motion Graphics & Video",
      icon: <Video className="w-8 h-8 text-rose-500" />,
      subcategories: ["Video Editing", "2D Animation", "Explainer Videos", "Title Sequences", "Social Media Motion"],
      description: "Dynamic visuals and cinematic editing to bring stories to life.",
      gradient: "from-rose-50 to-red-50 dark:from-rose-950/20 dark:to-red-950/20"
    }
  ];

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-20 px-4 md:px-8">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Layers className="w-4 h-4" />
        Portfolio Categories
      </Badge>

      <div className="flex flex-col gap-3">
        <Heading>My Creative Projects.</Heading>
        <p className="font-poppins text-lg w-full text-muted-foreground max-w-2xl">
          Explore my work categorized by design discipline. Click a card to see specific projects in that category.
        </p>
      </div>

      {/* THE BIG GALLERY GRID */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <FramerWrapper 
            key={index} 
            y={50} 
            delay={index * 0.1}
            className="group"
          >
            <Link href={`/projects/${cat.title.toLowerCase().replace(/&/g, 'and').replace(/ /g, '-')}`} className="block h-full">
              <div className={`h-full relative overflow-hidden rounded-[2.5rem] border-2 border-white/50 dark:border-white/5 hover:border-primary/30 transition-all duration-500 p-10 flex flex-col gap-8 bg-gradient-to-br ${cat.gradient} shadow-sm hover:shadow-2xl hover:-translate-y-3`}>
                
                {/* ICON & TITLE SECTION */}
                <div className="flex flex-col gap-5">
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-3xl w-fit shadow-md group-hover:rotate-[10deg] transition-all duration-300">
                    {cat.icon}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary leading-tight">
                      {cat.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium italic">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* SUB-CATEGORIES LIST */}
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {cat.subcategories.map((sub, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-full text-primary/80 border border-white dark:border-white/10"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* HOVER ARROW */}
                <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                   <ArrowRight className="w-8 h-8 text-primary" />
                </div>
              </div>
            </Link>
          </FramerWrapper>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
