import jsPDF from "jspdf";
import { experiencesData, personalInfo } from "@/app/experience/experiences";

// Helper to load image
const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "anonymous"; 
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
  });
};

// Helper to fetch external font and convert to Base64
const getFontBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

export const downloadATSResume = async () => {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  
  // --- FONT REGISTRATION ---
  let titleFont = "helvetica"; // Default fallback
  try {
    const fontUrl = "https://font-public.canva.com/YACkoP2nN4w/0/Bebas_Neue_Cyrillic.a69cba0d15813f7a63ac.0a82c965900d100f33f178d4d17a5118.woff2";
    const base64Font = await getFontBase64(fontUrl);
    // Strip the data:application/font-woff2;base64, part
    const cleanBase64 = base64Font.split(',')[1];
    
    doc.addFileToVFS("BebasNeue.woff2", cleanBase64);
    doc.addFont("BebasNeue.woff2", "Bebas", "normal");
    titleFont = "Bebas";
  } catch (error) {
    console.error("Font loading failed, using Helvetica Bold as fallback");
    titleFont = "helvetica";
  }

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12; // A4 Bleed / Safe Zone
  const dividerX = 72; 
  const leftColX = margin;
  const rightColX = dividerX + 6;
  const colWidthLeft = dividerX - leftColX - 5;
  const colWidthRight = pageWidth - rightColX - margin;
  
  // Spacing constants for even alignment
  const sectionGap = 10; 
  const bodyFontSize = 8.5;

  let y = margin + 5;

  // --- PAGE BREAK HELPER ---
  const checkPageBreak = (currentY: number, needed: number) => {
    if (currentY + needed > pageHeight - margin) {
      doc.addPage();
      doc.setDrawColor(220);
      doc.line(dividerX, margin, dividerX, pageHeight - margin);
      return margin + 10;
    }
    return currentY;
  };

  // --- HEADER: UNIFIED PROFILE & NAME ---
  try {
    const imgUrl = personalInfo.profileImage || "/profile.png";
    const img = await loadImage(imgUrl);
    doc.saveGraphicsState();
    doc.circle(leftColX + 20, y + 15, 20, "f");
    doc.clip();
    doc.addImage(img, "PNG", leftColX, y - 5, 40, 40);
    doc.restoreGraphicsState();
  } catch (e) {
    doc.setDrawColor(220);
    doc.circle(leftColX + 20, y + 15, 20, "S");
  }

  // Name & Title (Using Bebas Neue)
  doc.setFont(titleFont, titleFont === "Bebas" ? "normal" : "bold");
  doc.setTextColor(30);
  doc.setFontSize(36);
  doc.text(personalInfo.name.first.toUpperCase(), 60, y + 12);
  doc.text(personalInfo.name.last.toUpperCase(), 60, y + 25);

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(personalInfo.role.toUpperCase(), 60, y + 33);

  // Top Right Contact (Clickable)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  let contactY = y;
  const addContact = (txt: string, url?: string) => {
    doc.setTextColor(80);
    doc.text(txt, pageWidth - margin, contactY, { align: "right" });
    if (url) doc.link(pageWidth - 65, contactY - 3, 55, 5, { url });
    contactY += 5;
  };
  addContact(personalInfo.contact.location);
  addContact(personalInfo.contact.phone, `tel:${personalInfo.contact.phone}`);
  doc.setTextColor(0, 100, 200);
  addContact(personalInfo.contact.email, `mailto:${personalInfo.contact.email}`);
  addContact(personalInfo.contact.website, `https://${personalInfo.contact.website}`);

  y = 65;
  // Vertical Divider
  doc.setDrawColor(220);
  doc.line(dividerX, y, dividerX, pageHeight - margin);

  // --- DRAWING HELPERS ---
  const drawHeading = (text: string, x: number, currY: number, w: number) => {
    doc.setFont(titleFont, titleFont === "Bebas" ? "normal" : "bold");
    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text(text.toUpperCase(), x, currY);
    doc.setDrawColor(40);
    doc.setLineWidth(0.4);
    doc.line(x, currY + 2, x + w, currY + 2);
    return currY + 10;
  };

  // Fixed Bullet: Using vector circle to solve Edge character rendering bugs (%)
  const drawBulletItem = (text: string, x: number, currY: number, w: number) => {
    doc.setDrawColor(100);
    doc.circle(x + 1, currY - 1, 0.6, "S"); 
    doc.setFont("helvetica", "normal");
    doc.setFontSize(bodyFontSize);
    doc.setTextColor(70);
    const lines = doc.splitTextToSize(text, w - 6);
    // Indent text away from the circle bullet
    doc.text(lines, x + 6, currY, { lineHeightFactor: 1.3 });
    return currY + (lines.length * 4.5) + 2;
  };

  // --- LEFT COLUMN (SIDEBAR) ---
  let leftY = y + 5;

  // About Me
  leftY = drawHeading("About Me", leftColX, leftY, colWidthLeft);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(bodyFontSize);
  doc.setTextColor(80);
  const abtLines = doc.splitTextToSize(personalInfo.aboutMe, colWidthLeft);
  doc.text(abtLines, leftColX, leftY, { lineHeightFactor: 1.4 });
  
  // Gap calculation: Exactly one line down + gap
  leftY += (abtLines.length * 4.5) + sectionGap;

  // Links (Size matches About text)
  leftY = drawHeading("Links", leftColX, leftY, colWidthLeft);
  personalInfo.links.forEach(link => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(bodyFontSize); doc.setTextColor(40);
    doc.text(link.label + ":", leftColX, leftY);
    doc.setFont("helvetica", "normal"); doc.setTextColor(0, 100, 200);
    doc.text(link.url, leftColX, leftY + 4);
    doc.link(leftColX, leftY, colWidthLeft, 8, { url: `https://${link.url}` });
    leftY += 11;
  });

  leftY += sectionGap - 5;

  // Hobbies
  leftY = drawHeading("Hobbies", leftColX, leftY, colWidthLeft);
  personalInfo.hobbies.forEach(hobby => {
    leftY = drawBulletItem(hobby.toUpperCase(), leftColX, leftY, colWidthLeft);
  });

  // --- RIGHT COLUMN ---
  let rightY = y + 5;

  rightY = drawHeading("Work Experience", rightColX, rightY, colWidthRight);
  experiencesData.forEach(exp => {
    rightY = checkPageBreak(rightY, 15);
    doc.setFont(titleFont, titleFont === "Bebas" ? "normal" : "bold");
    doc.setFontSize(12);
    doc.setTextColor(30);
    doc.text(exp.company.toUpperCase(), rightColX, rightY);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(120);
    doc.text(exp.location, pageWidth - margin, rightY, { align: "right" });
    rightY += 6;

    exp.roles.forEach(role => {
      rightY = checkPageBreak(rightY, 15);
      doc.setFont("helvetica", "bold"); doc.setFontSize(9.5); doc.setTextColor(60);
      doc.text(role.title, rightColX + 5, rightY);
      doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
      doc.text(`${role.startDate} - ${role.endDate}`, pageWidth - margin, rightY, { align: "right" });
      rightY += 4.5;

      doc.setTextColor(0, 100, 200); doc.setFontSize(8);
      doc.text(role.workType.toUpperCase(), rightColX + 5, rightY);
      rightY += 5;

      role.description.forEach(desc => {
        rightY = drawBulletItem(desc, rightColX + 5, rightY, colWidthRight - 5);
        rightY = checkPageBreak(rightY, 0);
      });
      rightY += 3;
    });
  });

  // Education
  rightY = checkPageBreak(rightY, 20);
  rightY = drawHeading("Education", rightColX, rightY, colWidthRight);
  personalInfo.education.forEach(edu => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(9.5); doc.setTextColor(40);
    doc.text(edu.school.toUpperCase(), rightColX, rightY);
    doc.setFont("helvetica", "normal");
    doc.text(edu.year, pageWidth - margin, rightY, { align: "right" });
    rightY += 5;
    doc.text(edu.degree, rightColX, rightY);
    rightY += 8;
  });

  // Skills
  rightY = checkPageBreak(rightY, 20);
  rightY = drawHeading("Skills", rightColX, rightY, colWidthRight);
  let skillX = rightColX;
  personalInfo.skills.forEach((skill, i) => {
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(60);
    doc.text(skill.toUpperCase(), skillX, rightY);
    doc.setDrawColor(230);
    doc.line(skillX, rightY + 2, skillX + 52, rightY + 2);
    if (i % 2 === 0) { skillX += 60; } else { skillX = rightColX; rightY += 10; }
  });

  doc.save(`${personalInfo.name.first}_${personalInfo.name.last}_Resume.pdf`);
};
