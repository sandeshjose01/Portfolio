import jsPDF from "jspdf";
// IMPORT the data directly from your Experience Page file
import { experiences } from "@/app/experience/page"; 

export const downloadATSResume = () => {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  let y = 20; 
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - margin * 2;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("SANDESH JOSHI", pageWidth / 2, y, { align: "center" });
  y += 15;

  // Professional Experience Heading
  doc.setFontSize(14);
  doc.text("PROFESSIONAL EXPERIENCE", margin, y);
  y += 3;
  doc.line(margin, y, pageWidth - margin, y); 
  y += 8;

  // AUTOMATIC LOOP: This now uses the data from your Experience Page!
  experiences.forEach((exp) => {
    if (y > 270) { doc.addPage(); y = 20; }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(exp.role, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(exp.duration, pageWidth - margin, y, { align: "right" });
    y += 5;
    doc.setFont("helvetica", "italic");
    doc.text(`${exp.company} | ${exp.location}`, margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    exp.description.forEach((point) => {
      const lines = doc.splitTextToSize(`• ${point}`, maxLineWidth);
      doc.text(lines, margin, y);
      y += lines.length * 5; 
    });
    y += 6; 
  });

  doc.save("Sandesh_Joshi_Resume.pdf");
};
