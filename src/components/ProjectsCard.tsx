import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Layers, ChevronRight } from "lucide-react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Link from "next/link";

const ProjectPage = () => {
  const categories = [
    {
      title: "Visual Identity Design",
      count: "6 subcategories",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      slug: "visual-identity"
    },
    {
      title: "Marketing & Advertising Design",
      count: "5 subcategories",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1000&auto=format&fit=crop",
      slug: "marketing-advertising"
    },
    {
      title: "UI & Digital Design",
      count: "5 subcategories",
      image: "https://images.unsplash.com/photo-1581291518062-c9a79e7df0f0?q=80&w=1000&auto=format&fit=crop",
      slug: "ui-digital"
    },
    {
      title: "Packaging Design",
      count: "5 subcategories",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop",
      slug: "packaging"
    },
    {
      title: "Publication Design",
      count: "5 subcategories",
      image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1000&auto=format&fit=crop",
      slug: "publication"
    },
    {
      title: "Motion Graphics",
      count: "5 subcategories",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
      slug: "motion-graphics"
    }
  ];

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-20 px-6">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Layers className="w-4 h-4" />
        Projects
      </Badge>

      <div className="flex flex-col gap-3">
        <Heading>My Projects</Heading>
        <p className="font-poppins text-lg w-full text-muted-foreground max-w-2xl">
          A curated collection of my work. Choose a category to see more.
        </p>
      </div>

      {/* BIG IMAGE CARD GRID */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {categories.map((cat, index) => (
          <FramerWrapper 
            key={index} 
            y={50} 
            delay={index * 0.1}
            className="group"
          >
            <Link href={`/projects/${cat.slug}`} className="block h-full">
              {/* THE BIG IMAGE CARD CONTAINER */}
              <div className="relative h-[400px] w-full overflow-hidden rounded-[2rem] border border-transparent shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                
                {/* Full Background Image */}
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Text Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
                        {cat.title}
                      </h2>
                      <p className="text-gray-300 text-sm font-medium">
                        {cat.count}
                      </p>
                    </div>

                    {/* Action Icon */}
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white mb-1 transition-transform group-hover:translate-x-1">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
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
