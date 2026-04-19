import jsPDF from "jspdf";
import { experiencesData } from "@/app/experience/experiences"; 

export const downloadATSResume = (e?: React.MouseEvent) => {
  // Prevent any default link behavior (Stops the 2nd download)
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Check if data exists to prevent blank page
  if (!experiencesData || experiencesData.length === 0) {
    console.error("No experience data found!");
    return;
  }

  const doc = new jsPDF({ format: "a4", unit: "mm" });
  let y = 20; 
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - margin * 2;

  // --- Header ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("SANDESH JOSHI", margin, y);
  
  y += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Graphic Designer & UI/UX Specialist", margin, y);
  
  y += 6;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("sandeshjoshi.info.np | Kathmandu, Nepal", margin, y);
  
  y += 12;

  // --- Section Heading ---
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("PROFESSIONAL EXPERIENCE", margin, y);
  y += 2;
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // --- Experience Loop ---
  experiencesData.forEach((exp) => {
    // Page break logic
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    // Role
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(exp.role.toUpperCase(), margin, y);
    
    // Duration
    doc.setFont("helvetica", "normal");
    doc.text(exp.duration, pageWidth - margin, y, { align: "right" });
    
    y += 5;

    // Company
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50, 50, 50);
    doc.text(`${exp.company} | ${exp.location}`, margin, y);
    
    y += 6;

    // Bullet Points
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    
    exp.description.forEach((point) => {
      const lines = doc.splitTextToSize(`• ${point}`, maxLineWidth);
      doc.text(lines, margin, y);
      y += (lines.length * 5);
    });

    y += 6; // Space between jobs
  });

  doc.save("Sandesh_Joshi_Resume_ATS.pdf");
};
