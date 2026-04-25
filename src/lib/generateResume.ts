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
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  const sidebarWidth = 70;
  const mainColX = 80;
  const margin = 10;
  let leftY = 85; // Starting Y for sidebar content
  let rightY = 60; // Starting Y for main content

  // --- 1. BACKGROUNDS ---
  // Dark Sidebar
  doc.setFillColor(45, 45, 45); // Dark Slate Gray
  doc.rect(0, 0, sidebarWidth, pageHeight, "F");

  // "Glass" Effect Decorative Dots (Simulating website background)
  doc.setDrawColor(255, 255, 255);
  doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 50; j++) {
      doc.circle(i * 4, j * 6, 0.2, "S");
    }
  }
  doc.setGState(new (doc as any).GState({ opacity: 1.0 }));

  // --- 2. CIRCULAR PROFILE IMAGE ---
  try {
    const imgUrl = personalInfo.profileImage || "/profile.png";
    const img = await loadImage(imgUrl);
    // Draw circular profile
    doc.saveGraphicsState();
    doc.circle(sidebarWidth / 2, 35, 20, "f");
    doc.clip();
    doc.addImage(img, "PNG", (sidebarWidth / 2) - 20, 15, 40, 40);
    doc.restoreGraphicsState();
  } catch (error) {
    doc.setDrawColor(255);
    doc.circle(sidebarWidth / 2, 35, 20, "S");
  }

  // --- 3. NAME & HEADER (Main Area) ---
  doc.setFontSize(32);
  doc.setTextColor(45, 45, 45);
  doc.setFont("helvetica", "bold");
  doc.text(personalInfo.name.first.toUpperCase(), mainColX, 25);
  doc.text(personalInfo.name.last.toUpperCase(), mainColX, 36);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(personalInfo.role.toUpperCase(), mainColX, 43, { charSpace: 1 });

  // Top Right Contact Icons/Info
  doc.setFontSize(8);
  doc.setTextColor(80);
  let contactY = 20;
  const drawContact = (text: string, iconY: number, url?: string) => {
    doc.text(text, pageWidth - margin, iconY, { align: "right" });
    if (url) {
        doc.link(pageWidth - 60, iconY - 3, 50, 5, { url });
    }
  };
  drawContact(personalInfo.contact.location, contactY);
  drawContact(personalInfo.contact.phone, contactY + 5, `tel:${personalInfo.contact.phone}`);
  doc.setTextColor(0, 102, 204);
  drawContact(personalInfo.contact.email, contactY + 10, `mailto:${personalInfo.contact.email}`);
  drawContact(personalInfo.contact.website, contactY + 15, `https://${personalInfo.contact.website}`);

  // --- 4. SIDEBAR SECTIONS (White Text) ---
  const drawSidebarHeading = (text: string, currY: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(text.toUpperCase(), margin, currY);
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.3);
    doc.line(margin, currY + 2, sidebarWidth - margin, currY + 2);
    return currY + 10;
  };

  const drawBulletText = (text: string, x: number, currY: number, width: number, color: number[]) => {
    doc.setFontSize(8.5);
    doc.setTextColor(color[0], color[1], color[2]);
    const bullet = "○"; // Using a circle shape as requested
    doc.text(bullet, x, currY);
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, x + 4, currY);
    return currY + (lines.length * 4.5) + 1;
  };

  // ABOUT ME (Sidebar)
  leftY = drawSidebarHeading("About Me", leftY);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(230, 230, 230);
  const aboutLines = doc.splitTextToSize(personalInfo.aboutMe, sidebarWidth - 2 * margin);
  doc.text(aboutLines, margin, leftY, { lineHeightFactor: 1.3 });
  leftY += (aboutLines.length * 4.5) + 12;

  // LINKS (Sidebar)
  leftY = drawSidebarHeading("Links", leftY);
  personalInfo.links.forEach(link => {
    doc.setFont("helvetica", "bold"); doc.setTextColor(255);
    doc.text(link.label + ":", margin, leftY);
    doc.setFont("helvetica", "normal"); doc.setTextColor(0, 160, 255);
    doc.text(link.url, margin, leftY + 4);
    doc.link(margin, leftY, 40, 6, { url: `https://${link.url}` });
    leftY += 10;
  });

  // HOBBIES (Sidebar)
  leftY = drawSidebarHeading("Hobbies", leftY + 5);
  personalInfo.hobbies.forEach(hobby => {
    leftY = drawBulletText(hobby.toUpperCase(), margin, leftY, sidebarWidth - 25, [230, 230, 230]);
  });

  // --- 5. MAIN CONTENT SECTIONS (Dark Text) ---
  const drawMainHeading = (text: string, currY: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(45, 45, 45);
    doc.text(text.toUpperCase(), mainColX, currY);
    doc.setLineWidth(0.3);
    doc.setDrawColor(45, 45, 45);
    doc.line(mainColX, currY + 2, pageWidth - margin, currY + 2);
    return currY + 10;
  };

  // WORK EXPERIENCE
  rightY = drawMainHeading("Work Experience", rightY);
  experiencesData.forEach(exp => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(45);
    doc.text(exp.company.toUpperCase(), mainColX, rightY);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(exp.location, pageWidth - margin, rightY, { align: "right" });
    rightY += 6;

    exp.roles.forEach(role => {
      // Role Title and Dates
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(60);
      doc.text(role.title, mainColX + 5, rightY);
      doc.setFont("helvetica", "normal");
      doc.text(`${role.startDate} - ${role.endDate}`, pageWidth - margin, rightY, { align: "right" });
      rightY += 4;
      
      // Work type
      doc.setFontSize(7.5);
      doc.setTextColor(0, 102, 204);
      doc.text(role.workType.toUpperCase(), mainColX + 5, rightY);
      rightY += 5;

      // Description with Hanging Indent
      role.description.forEach(desc => {
        rightY = drawBulletText(desc, mainColX + 5, rightY, pageWidth - mainColX - 15, [80, 80, 80]);
      });
      rightY += 4;
    });
    rightY += 2;
  });

  // EDUCATION
  if (rightY > 240) { doc.addPage(); rightY = 20; }
  rightY = drawMainHeading("Education", rightY);
  personalInfo.education.forEach(edu => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(edu.school.toUpperCase(), mainColX, rightY);
    doc.setFont("helvetica", "normal");
    doc.text(edu.year, pageWidth - margin, rightY, { align: "right" });
    rightY += 4;
    doc.setFontSize(8.5);
    doc.setTextColor(80);
    doc.text(edu.degree, mainColX, rightY);
    rightY += 8;
  });

  // SKILLS (Two Column)
  rightY = drawMainHeading("Skills", rightY);
  doc.setFontSize(8.5);
  let skillX = mainColX;
  personalInfo.skills.forEach((skill, i) => {
    doc.text(skill.toUpperCase(), skillX, rightY);
    doc.setDrawColor(200);
    doc.line(skillX, rightY + 2, skillX + 50, rightY + 2);
    if (i % 2 === 0) { skillX += 60; } 
    else { skillX = mainColX; rightY += 8; }
  });

  doc.save(`${personalInfo.name.first}_${personalInfo.name.last}_Resume.pdf`);
};
