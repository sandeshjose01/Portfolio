"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Linkedin, Globe, Github, Twitter } from "lucide-react";

// // text: Define the structure of the socials prop
interface SocialLinksProps {
  socials?: {
    facebook?: string;
    linkedin?: string;
    github?: string;
    behance?: string;
    website?: string;
  };
}

const SocialLinks = ({ socials }: SocialLinksProps) => {
  // // text: If no socials are provided, don't render anything
  if (!socials) return null;

  return (
    <div className="flex gap-4">
      {socials.facebook && (
        <Link href={socials.facebook} target="_blank" className="text-white/50 hover:text-blue-500 transition-all">
          <Facebook size={25} />
        </Link>
      )}
      {socials.linkedin && (
        <Link href={socials.linkedin} target="_blank" className="text-white/50 hover:text-blue-700 transition-all">
          <Linkedin size={25} />
        </Link>
      )}
      {socials.github && (
        <Link href={socials.github} target="_blank" className="text-white/50 hover:text-white transition-all">
          <Github size={25} />
        </Link>
      )}
      {socials.behance && (
        <Link href={socials.behance} target="_blank" className="text-white/50 hover:text-blue-400 transition-all">
          <Twitter size={25} /> 
        </Link>
      )}
      {socials.website && (
        <Link href={socials.website} target="_blank" className="text-white/50 hover:text-emerald-500 transition-all">
          <Globe size={25} />
        </Link>
      )}
    </div>
  );
};

export default SocialLinks;
