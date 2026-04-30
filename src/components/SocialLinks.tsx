import { cn } from "@/lib/utils";
import { Facebook, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import FramerWrapper from "./animation/FramerWrapper";

const SocialLinks = () => {
  const links = [
    { name: "Facebook", 
     link: href={socials?.facebook || "https://www.facebook.com/sandesh.josee",
     icon: <Facebook /> 
    },
    { name: "Behance", 
     link: href={socials?.behance || "https://be.net/sandeshjose", 
     icon: <Twitter /> 
    },
    { name: "Linkedin", 
     link: href={socials?.linkedin || "https://www.linkedin.com/in/sanjoshi1", 
     icon: <Linkedin /> 
    },
    { name: "External", 
     link: href={socials?.external || "https://www.sandeshjoshi.info.np", 
     icon: <ExternalLink /> 
    },
  ];
  return (
    <>
      {links.map((itm, indx) => {
        const timing = 0.55 + indx * 0.125
        
        return (
          <FramerWrapper key={indx} delay={timing} y={50}>

          <Link  target="blank"
            href={itm.link}
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
            >{itm.icon}</Link>
            </FramerWrapper>
        );
      })}
    </>
  );
};

export default SocialLinks;
