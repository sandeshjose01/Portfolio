"use client";
import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "../ui/button";

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
    setTimeout(() => console.log("Submitted"), label.length * 50);
  };

  const handleDownloadResume = () => {
    const resumeUrl =
      "https://drive.google.com/uc?export=download&id=1FG2YA5c_MaaLMNBz-oz8eis3hDq1oRFj"; // Your Google Drive download URL
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "SandeshJoshiResume.pdf"; // The name of the file to be downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    setDisplayText(label);
  }, [label]);

  return (
    <Button
      size={"lg"}
      className="text-base px-5 py-6"
      onMouseEnter={startScrambling}
      onClick={handleDownloadResume}
    >
      <Download className="mx-1" />
      {displayText}
    </Button>
  );
};

export default HackerBtn;