import jsPDF from "jspdf";
import { experiencesData, personalInfo } from "@/app/experience/experiences";

export const downloadATSResume = () => {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const leftColX = 15;
  const rightColX = 75;
  let y = 20;

  // --- HEADER SECTION ---
  // Profile Image Placeholder (Circle)
  doc.setDrawColor(200);
  doc.circle(30, 25, 12, "S"); 

  // Name (First Normal, Last Bold)
  doc.setFontSize(26);
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  doc.text(personalInfo.name.first, 55, 23);
  doc.setFont("helvetica", "bold");
  doc.text(personalInfo.name.last, 55, 33);

  // Role
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(personalInfo.role, 55, 40, { charSpace: 1 });

  // --- CLICKABLE CONTACT INFO (Top Right) ---
  doc.setFontSize(8);
  
  // 1. Location (Static)
  doc.setTextColor(80);
  doc.text(personalInfo.contact.location, pageWidth - 15, 18, { align: "right" });

  // 2. Phone Link
  doc.setTextColor(0, 102, 204); // Professional Link Blue
  doc.text(personalInfo.contact.phone, pageWidth - 15, 23, { 
    align: "right", 
    url: `tel:${personalInfo.contact.phone.replace(/\s/g, "")}` 
  });

  // 3. Email Link
  doc.text(personalInfo.contact.email, pageWidth - 15, 28, { 
    align: "right", 
    url: `mailto:${personalInfo.contact.email}` 
  });

  // 4. Website Link (Checks if property exists in your data file)
  const website = (personalInfo.contact as any).website || "Portfolio Website";
  const webUrl = website.startsWith("http") ? website : `https://${website}`;
  doc.text(website, pageWidth - 15, 33, { 
    align: "right", 
    url: webUrl 
  });

  y = 60;

  // --- HELPER FUNCTION FOR HEADINGS ---
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
  
  // Clickable Links Sidebar
  leftY = drawHeading("Links", leftColX, leftY);
  personalInfo.links.forEach(link => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(0);
    doc.text(link.label + ":", leftColX, leftY);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 102, 204); // Link Blue
    const linkUrl = link.url.startsWith("http") ? link.url : `https://${link.url}`;
    doc.text(link.url, leftColX, leftY + 4, { url: linkUrl });
    leftY += 10;
  });

  leftY += 5;
  leftY = drawHeading("Languages", leftColX, leftY);
  personalInfo.languages.forEach(lang => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(lang.name, leftColX, leftY);
    // Progress bar
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

  // --- RIGHT COLUMN (Main Content) ---
  let rightY = y;
  
  // About Me
  rightY = drawHeading("About Me", rightColX, rightY);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80);
  const aboutLines = doc.splitTextToSize(personalInfo.aboutMe, 120);
  doc.text(aboutLines, rightColX + 5, rightY);
  rightY += (aboutLines.length * 5) + 10;

  // Work Experience
  rightY = drawHeading("Work Experience", rightColX, rightY);
  experiencesData.forEach(exp => {
    // Timeline dot & line
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

  // Education
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

  // Skills
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
