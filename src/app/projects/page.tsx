import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import ProjectCards from "@/components/ProjectsCard";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";

const projectsPage = () => {
  const Projects = [
    {
      title: "New Year 2082 BS",
      description: "A vibrant social media post designed for Nepali New Year 2082, created using Photoshop and Illustrator. Focused on cultural aesthetics with modern design elements.",
      tags: ["Social Media", "Photoshop", "Illustrator", "Client Work"],
      link: "https://www.linkedin.com/posts/sanjoshi1_happynewyear2082-leadership-growthmindset-activity-7317287398688669696-jwi-?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEAIaRgB46xLEH58WXwdcGbC3eWaQ-Bo7dY",
      imageLink:
        "https://media.licdn.com/dms/image/v2/D4D22AQEQ9cVqRN-V6Q/feedshare-shrink_2048_1536/B4DZYw6FNIG4Ao-/0/1744577262820?e=1749081600&v=beta&t=6ulyhT3YHPLdfoU2GjCzHKMllcqkGN8Q-pusZOHKJxY",
    },
    {
      title: "Brand Identity Design",
      description: "A complete brand identity project including logo design, color palette, typography selection, and brand guidelines. Designed to give the client a strong and memorable visual presence.",
      tags: ["Logo Design", "Branding", "Illustrator", "Client Work"],
      link: "#",
      imageLink: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
    },
    {
      title: "Social Media Pack",
      description: "A cohesive set of social media post templates designed for a local business. Includes Instagram posts, stories, and Facebook banners — all consistent with the brand identity.",
      tags: ["Social Media", "Canva", "Photoshop", "Freelancing"],
      link: "#",
      imageLink: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    },
    {
      title: "Event Poster Design",
      description: "A bold and eye-catching event poster designed for a local event. Created with strong typography, vibrant colors, and a clear visual hierarchy to attract attention.",
      tags: ["Print Design", "Poster", "Photoshop", "Freelancing"],
      link: "#",
      imageLink: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    },
    {
      title: "Promotional Flyer",
      description: "A professional promotional flyer designed for a product launch. Focused on clean layout, strong call-to-action, and brand consistency across print and digital formats.",
      tags: ["Print Design", "Flyer", "Illustrator", "Client Work"],
      link: "#",
      imageLink: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80",
    },
    {
      title: "Personal Brand Identity",
      description: "A self-branding project showcasing my own logo, color palette, typography, and business card design. Reflects my design style and creative vision as a graphic designer.",
      tags: ["Branding", "Logo Design", "Illustrator", "Personal"],
      link: "#",
      imageLink: "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=800&q=80",
    },
  ];

  return (
    // PROJECT PAGE
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-hidden">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Layers className="h-4 w-4" />
        Projects
      </Badge>
      <div className="flex flex-col gap-3">
        <Heading>My Projects</Heading>
        <FramerWrapper y={0} x={200}>
          <p className="font-poppins text-lg w-full text-primary max-sm:text-base">
            Here is a curated collection of my graphic design work — from brand identities
            and logos to social media content and print designs. Each project reflects my
            passion for clean, purposeful, and visually compelling design.
          </p>
        </FramerWrapper>
      </div>

      <div className="w-full flex flex-row flex-wrap gap-3 max-lg:flex-col">
        {Projects.map((val, indx) => {
          return <ProjectCards key={indx} value={val} num={indx} />;
        })}
      </div>
    </div>
  );
};

export default projectsPage;
