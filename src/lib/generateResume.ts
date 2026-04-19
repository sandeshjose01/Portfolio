import jsPDF from "jspdf";
import { experiencesData, personalInfo } from "@/app/experience/experiences";

export const downloadATSResume = () => {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const leftColX = 15;
  const rightColX = 75;
  let y = 20;

  // --- HEADER SECTION ---
  doc.setDrawColor(200);
  doc.circle(30, 25, 12, "S"); 

  doc.setFontSize(26);
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  doc.text(personalInfo.name.first, 55, 23);
  doc.setFont("helvetica", "bold");
  doc.text(personalInfo.name.last, 55, 33);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(personalInfo.role, 55, 40, { charSpace: 1 });

  // --- CLICKABLE CONTACT INFO (Top Right) ---
  doc.setFontSize(8);
  
  // 1. Location (Static)
  doc.setTextColor(80);
  doc.text(personalInfo.contact.location, pageWidth - 15, 18, { align: "right" });

  // 2. Phone Link - FIXED WITH 'as any'
  doc.setTextColor(0, 102, 204); 
  doc.text(personalInfo.contact.phone, pageWidth - 15, 23, { 
    align: "right", 
    url: `tel:${personalInfo.contact.phone.replace(/\s/g, "")}` 
  } as any);

  // 3. Email Link - FIXED WITH 'as any'
  doc.text(personalInfo.contact.email, pageWidth - 15, 28, { 
    align: "right", 
    url: `mailto:${personalInfo.contact.email}` 
  } as any);

  // 4. Website Link - FIXED WITH 'as any'
  const website = (personalInfo.contact as any).website || "Portfolio Website";
  const webUrl = website.startsWith("http") ? website : `https://${website}`;
  doc.text(website, pageWidth - 15, 33, { 
    align: "right", 
    url: webUrl 
  } as any);

  y = 60;

  const drawHeading = (text: string, x: number, currY: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(text.toUpperCase(), x, currY);
    doc.setLineWidth(0.3);
    doc.line(x, currY + 2, x + (x > 50 ? 120 : 45), currY + 2);
    return currY + 10;
  };

  // --- LEFT SIDEBAR ---
  let leftY = y;
  
  leftY = drawHeading("Links", leftColX, leftY);
  personalInfo.links.forEach(link => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(0);
    doc.text(link.label + ":", leftColX, leftY);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 102, 204); 
    const linkUrl = link.url.startsWith("http") ? link.url : `https://${link.url}`;
    // FIXED WITH 'as any'
    doc.text(link.url, leftColX, leftY + 4, { url: linkUrl } as any);
    leftY += 10;
  });

  leftY += 5;
  leftY = drawHeading("Languages", leftColX, leftY);
  personalInfo.languages.forEach(lang => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(lang.name, leftColX, leftY);
    doc.setDrawColor(220);
    doc.line(leftColX, leftY + 2, leftColX + 45, leftY + 2);
    doc.setDrawColor(0);
    doc.line(leftColX, leftY + 2, leftColX + (45 * (lang.level / 100)), leftY + 2);
    leftY += 8;
  });

  leftY += 5;
  leftY = drawHeading("Hobbies", leftColX, leftY);
  personalInfo.hobbies.forEach(hobby => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("• " + hobby, leftColX, leftY);
    leftY += 6;
  });

  // --- RIGHT COLUMN ---
  let rightY = y;
  
  rightY = drawHeading("About Me", rightColX, rightY);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80);
  const aboutLines = doc.splitTextToSize(personalInfo.aboutMe, 120);
  doc.text(aboutLines, rightColX + 5, rightY);
  rightY += (aboutLines.length * 5) + 10;

  rightY = drawHeading("Work Experience", rightColX, rightY);
  experiencesData.forEach(exp => {
    doc.setDrawColor(0);
    doc.circle(rightColX, rightY - 1, 1);
    doc.line(rightColX, rightY, rightColX, rightY + 15);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(0);
    doc.text(`${exp.role.toUpperCase()} | ${exp.duration}`, rightColX + 5, rightY);
    
    rightY += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(exp.company.toUpperCase() + ", " + exp.location, rightColX + 5, rightY);
    
    rightY += 5;
    exp.description.forEach(bullet => {
      doc.text("• " + bullet, rightColX + 7, rightY);
      rightY += 4;
    });
    rightY += 8;
  });

  rightY = drawHeading("Education", rightColX, rightY);
  personalInfo.education.forEach(edu => {
    doc.circle(rightColX, rightY - 1, 1);
    doc.setFont("helvetica", "bold");
    doc.text(`${edu.degree.toUpperCase()} | ${edu.year}`, rightColX + 5, rightY);
    rightY += 5;
    doc.setFont("helvetica", "normal");
    doc.text(edu.school.toUpperCase(), rightColX + 5, rightY);
    rightY += 10;
  });

  rightY = drawHeading("Skills", rightColX, rightY);
  let skillX = rightColX + 5;
  personalInfo.skills.forEach((skill, index) => {
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text(skill, skillX, rightY);
    doc.setDrawColor(200);
    doc.line(skillX, rightY + 2, skillX + 40, rightY + 2);
    if ((index + 1) % 2 === 0) {
      rightY += 10;
      skillX = rightColX + 5;
    } else {
      skillX += 60;
    }
  });

  doc.save(`${personalInfo.name.first}_${personalInfo.name.last}_Resume.pdf`);
};
