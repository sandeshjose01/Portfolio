import jsPDF from "jspdf";
import { experiencesData, personalInfo } from "@/app/experience/experiences";

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "anonymous"; 
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
  });
};

export const downloadATSResume = async () => {
  // Safe Area Margins for A4 (Bleed protection)
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12; // Standard printer safe area
  
  const leftColX = margin;
  const dividerX = 72; 
  const rightColX = 78;
  const colWidthLeft = dividerX - leftColX - 5;
  const colWidthRight = pageWidth - rightColX - margin;

  let y = 15; // Starting top position

  // --- HELPER: PAGE BREAK HANDLER ---
  const checkNewPage = (currentY: number, needed: number) => {
    if (currentY + needed > pageHeight - margin) {
      doc.addPage();
      // Draw Divider on new page
      doc.setDrawColor(220);
      doc.line(dividerX, margin, dividerX, pageHeight - margin);
      return margin + 5; // Reset Y
    }
    return currentY;
  };

  // --- 1. HEADER SECTION (Unified Profile & Name) ---
  try {
    const imgUrl = personalInfo.profileImage || "/profile.png";
    const img = await loadImage(imgUrl);
    doc.saveGraphicsState();
    doc.circle(leftColX + 20, y + 20, 20, "f");
    doc.clip();
    doc.addImage(img, "PNG", leftColX, y, 40, 40);
    doc.restoreGraphicsState();
  } catch (e) {
    doc.setDrawColor(200);
    doc.circle(leftColX + 20, y + 20, 20, "S");
  }

  // Name (Using standard spacing for Edge compatibility)
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30);
  doc.setFontSize(28);
  doc.text(personalInfo.name.first.toUpperCase(), 60, y + 18);
  doc.text(personalInfo.name.last.toUpperCase(), 60, y + 28);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(personalInfo.role.toUpperCase(), 60, y + 35);

  // Contact Info (Top Right)
  doc.setFontSize(8);
  let contactY = y + 5;
  const addContact = (txt: string, url?: string) => {
    doc.text(txt, pageWidth - margin, contactY, { align: "right" });
    if (url) doc.link(pageWidth - 60, contactY - 3, 50, 5, { url });
    contactY += 5;
  };
  doc.setTextColor(80);
  addContact(personalInfo.contact.location);
  addContact(personalInfo.contact.phone, `tel:${personalInfo.contact.phone}`);
  doc.setTextColor(0, 100, 200);
  addContact(personalInfo.contact.email, `mailto:${personalInfo.contact.email}`);
  addContact(personalInfo.contact.website, `https://${personalInfo.contact.website}`);

  y = 65; // Move Y below header

  // --- 2. VERTICAL DIVIDER ---
  doc.setDrawColor(220);
  doc.line(dividerX, y, dividerX, pageHeight - margin);

  // --- 3. DRAWING HELPERS ---
  const drawHeading = (text: string, x: number, currY: number, w: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(40);
    doc.text(text.toUpperCase(), x, currY);
    doc.setDrawColor(40);
    doc.setLineWidth(0.3);
    doc.line(x, currY + 2, x + w, currY + 2);
    return currY + 10;
  };

  // Fixed Bullet function (Draws a circle to avoid % encoding errors)
  const drawBulletItem = (text: string, x: number, currY: number, w: number) => {
    doc.setDrawColor(100);
    doc.circle(x + 1, currY - 1, 0.6, "S"); // Vector circle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(70);
    const lines = doc.splitTextToSize(text, w - 5);
    doc.text(lines, x + 5, currY);
    return currY + (lines.length * 4.5) + 2;
  };

  // --- 4. LEFT COLUMN (About -> Links -> Hobbies) ---
  let leftY = y + 5;
  
  // About Me
  leftY = drawHeading("About Me", leftColX, leftY, colWidthLeft);
  doc.setFontSize(8.5);
  doc.setTextColor(80);
  const abt = doc.splitTextToSize(personalInfo.aboutMe, colWidthLeft);
  doc.text(abt, leftColX, leftY, { lineHeightFactor: 1.3 });
  leftY += (abt.length * 4.5) + 10;

  // Links (Exactly below About Me)
  leftY = drawHeading("Links", leftColX, leftY, colWidthLeft);
  personalInfo.links.forEach(link => {
    doc.setFont("helvetica", "bold"); doc.setTextColor(40);
    doc.text(link.label + ":", leftColX, leftY);
    doc.setFont("helvetica", "normal"); doc.setTextColor(0, 100, 200);
    doc.text(link.url, leftColX, leftY + 4);
    doc.link(leftColX, leftY, colWidthLeft, 6, { url: `https://${link.url}` });
    leftY += 10;
  });

  // Hobbies
  leftY = drawHeading("Hobbies", leftColX, leftY, colWidthLeft);
  personalInfo.hobbies.forEach(hobby => {
    leftY = drawBulletItem(hobby.toUpperCase(), leftColX, leftY, colWidthLeft);
  });

  // --- 5. RIGHT COLUMN (Experience -> Education -> Skills) ---
  let rightY = y + 5;

  rightY = drawHeading("Work Experience", rightColX, rightY, colWidthRight);
  
  experiencesData.forEach(exp => {
    rightY = checkNewPage(rightY, 15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(40);
    doc.text(exp.company.toUpperCase(), rightColX, rightY);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120);
    doc.text(exp.location, pageWidth - margin, rightY, { align: "right" });
    rightY += 6;

    exp.roles.forEach(role => {
      rightY = checkNewPage(rightY, 15);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(60);
      doc.text(role.title, rightColX + 5, rightY);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`${role.startDate} - ${role.endDate}`, pageWidth - margin, rightY, { align: "right" });
      rightY += 4;

      doc.setTextColor(0, 100, 200);
      doc.text(role.workType.toUpperCase(), rightColX + 5, rightY);
      rightY += 5;

      role.description.forEach(desc => {
        const dLines = doc.splitTextToSize(desc, colWidthRight - 10);
        rightY = checkNewPage(rightY, dLines.length * 5);
        rightY = drawBulletItem(desc, rightColX + 5, rightY, colWidthRight - 5);
      });
      rightY += 3;
    });
  });

  // Education
  rightY = checkNewPage(rightY, 20);
  rightY = drawHeading("Education", rightColX, rightY, colWidthRight);
  personalInfo.education.forEach(edu => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(40);
    doc.text(edu.school.toUpperCase(), rightColX, rightY);
    doc.setFont("helvetica", "normal");
    doc.text(edu.year, pageWidth - margin, rightY, { align: "right" });
    rightY += 5;
    doc.text(edu.degree, rightColX, rightY);
    rightY += 8;
  });

  // Skills
  rightY = checkNewPage(rightY, 20);
  rightY = drawHeading("Skills", rightColX, rightY, colWidthRight);
  let skillX = rightColX;
  personalInfo.skills.forEach((skill, i) => {
    doc.setFontSize(8.5);
    doc.setTextColor(60);
    doc.text(skill.toUpperCase(), skillX, rightY);
    doc.setDrawColor(230);
    doc.line(skillX, rightY + 2, skillX + 50, rightY + 2);
    if (i % 2 === 0) { skillX += 58; } 
    else { skillX = rightColX; rightY += 10; }
  });

  doc.save(`${personalInfo.name.first}_${personalInfo.name.last}_Resume.pdf`);
};
