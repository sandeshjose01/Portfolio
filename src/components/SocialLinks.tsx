"use client";
import React from "react";
import Link from "next/link";
// // text: Behance is NOT imported because it does not exist in Lucide-React
import { Facebook, Linkedin, Globe, Twitter } from "lucide-react";

export default function SocialLinks({ socials }: any) {
  const iconStyle = "w-5 h-5 flex items-center justify-center border-2 border-gray-800 rounded-lg text-gray-800 hover:bg-[#2f7df4] hover:border-[#2f7df4] hover:text-white transition-all duration-300";

  return (
    <div className="flex gap-3">
      {socials?.facebook && <Link href={socials.facebook} target="_blank" className={iconStyle}><Facebook size={18}/></Link>}
      
      {/* // text: We use the Twitter icon for the Behance URL to stop the build from crashing */}
      {socials?.behance && <Link href={socials.behance} target="_blank" className={iconStyle}><Twitter size={18}/></Link>}
      
      {socials?.linkedin && <Link href={socials.linkedin} target="_blank" className={iconStyle}><Linkedin size={18}/></Link>}
      {socials?.website && <Link href={socials.website} target="_blank" className={iconStyle}><Globe size={18}/></Link>}
    </div>
  );
}
