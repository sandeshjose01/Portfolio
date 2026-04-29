"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [isProtected, setIsProtected] = useState(true);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // 1. Listen to Admin Toggle
    const unsub = onSnapshot(doc(db, "settings", "global"), (doc) => {
      if (doc.exists()) setIsProtected(doc.data().antiScreenshot);
    });

    if (!isProtected) return;

    // 2. Block Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" || 
        (e.ctrlKey && e.key === "p") || 
        (e.metaKey && e.shiftKey && (e.key === "3" || e.key === "4" || e.key === "5")) // Mac
      ) {
        e.preventDefault();
        alert("Screenshots are disabled on this portfolio.");
      }
    };

    // 3. Hide content when window loses focus (Mobile App Switcher / Snipping Tool)
    const handleBlur = () => setIsHiding(true);
    const handleFocus = () => setIsHiding(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("contextmenu", (e) => e.preventDefault());

    return () => {
      unsub();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [isProtected]);

  return (
    <div className={`transition-all duration-500 ${isHiding && isProtected ? "blur-[100px] grayscale opacity-0" : ""}`}>
      <div className={isProtected ? "select-none" : ""}>
        {children}
      </div>
      {/* Invisible overlay to prevent "Right Click > Save Image As" on mobile */}
      {isProtected && <div className="fixed inset-0 z-[9999] pointer-events-none bg-transparent" />}
    </div>
  );
}
