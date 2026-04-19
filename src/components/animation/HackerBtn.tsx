"use client";
import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "../ui/button";
// 1. Import the generator function directly here
import { downloadATSResume } from "@/lib/generateResume";

const HackerBtn = ({ label }: { label: string }) => {
  const [displayText, setDisplayText] = useState(label);
  const charset = "abcdefghijklmnopqrstuvwxyz";

  const randomChars = (length: number) => {
    return Array.from(
      { length },
      () => charset[Math.floor(Math.random() * charset.length)]
    ).join("");
  };

  const scramble = async (input: string) => {
    let prefix = "";
    for (let index = 0; index < input.length; index++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      prefix += input.charAt(index);
      setDisplayText(prefix + randomChars(input.length - prefix.length));
    }
  };

  const startScrambling = () => {
    scramble(label);
  };

  // 2. Updated click handler: No more Google Drive link!
  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    downloadATSResume(); // This triggers your professional PDF generator
  };

  useEffect(() => {
    setDisplayText(label);
  }, [label]);

  return (
    <Button
      size={"lg"}
      className="text-base px-5 py-6 font-bold"
      onMouseEnter={startScrambling}
      onClick={handleDownloadClick} // Trigger the new generator
    >
      <Download className="mx-1 h-5 w-5" />
      {displayText}
    </Button>
  );
};

export default HackerBtn;
