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
  
  const leftColX = 15;
  const dividerX = 72; // The vertical line position
  const rightColX = 78;
  const margin = 15;
  
  let leftY = 80; 
  let rightY = 80;

  // --- 1. HEADER SECTION (Profile & Name Unified) ---
  // Profile Image (Circle)
  try {
    const imgUrl = personalInfo.profileImage || "/profile.png";
    const img = await loadImage(imgUrl);
    doc.saveGraphicsState();
    doc.circle(35, 35, 20, "f");
    doc.clip();
    doc.addImage(img, "PNG", 15, 15, 40, 40);
    doc.restoreGraphicsState();
  } catch (error) {
    doc.setDrawColor(200);
    doc.circle(35, 35, 20, "S");
  }

  // Name & Title (Positioned next to profile)
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  
  // STRICTOR FONT MATCHING: 
  // We use horizontal scaling (0.8) and negative char spacing to mimic the Condensed Bold font in the image
  const nameFirst = personalInfo.name.first.toUpperCase();
  const nameLast = personalInfo.name.last.toUpperCase();
  
  doc.text(nameFirst, 60, 32, { charSpace: -0.5, horizontalScale: 0.85 } as any);
  doc.text(nameLast, 60, 43, { charSpace: -0.5, horizontalScale: 0.85 } as any);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120);
  doc.text(personalInfo.role.toUpperCase(), 60, 50, { charSpace: 1.2 });

  // Header Contact Details (Top Right)
  doc.setFontSize(8);
  doc.setTextColor(80);
  let contactY = 18;
  const drawHeaderContact = (text: string, y: number, url?: string) => {
    doc.text(text, pageWidth - 15, y, { align: "right" });
    if (url) doc.link(pageWidth - 65, y - 3, 50, 5, { url });
  };

  drawHeaderContact(personalInfo.contact.location, contactY);
  drawHeaderContact(personalInfo.contact.phone, contactY + 5, `tel:${personalInfo.contact.phone}`);
  doc.setTextColor(0, 100, 200); // Clickable Blue
  drawHeaderContact(personalInfo.contact.email, contactY + 10, `mailto:${personalInfo.contact.email}`);
  drawHeaderContact(personalInfo.contact.website, contactY + 15, `https://${personalInfo.contact.website}`);

  // --- 2. VERTICAL SEPARATOR LINE ---
  doc.setDrawColor(200);
  doc.setLineWidth(0.2);
  doc.line(dividerX, 70, dividerX, pageHeight - 15);

  // --- 3. HELPER FUNCTIONS ---
  const drawSectionHeading = (text: string, x: number, y: number, colWidth: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(40);
    doc.text(text.toUpperCase(), x, y, { horizontalScale: 0.9 } as any);
    doc.setLineWidth(0.4);
    doc.line(x, y + 2, x + colWidth, y + 2);
    return y + 10;
  };

  const drawHangingIndent = (text: string, x: number, y: number, width: number, isSidebar: boolean) => {
    doc.setFontSize(8.5);
    doc.setTextColor(isSidebar ? 80 : 60);
    const bullet = "○";
    doc.text(bullet, x, y);
    const lines = doc.splitTextToSize(text, width);
    // Aligning text with text, not bullet
    doc.text(lines, x + 4, y, { lineHeightFactor: 1.3 });
    return y + (lines.length * 4.5) + 2;
  };

  // --- 4. LEFT COLUMN (About, Links, Hobbies) ---
  leftY = drawSectionHeading("About Me", leftColX, leftY, 45);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(80);
  const aboutLines = doc.splitTextToSize(personalInfo.aboutMe, 50);
  doc.text(aboutLines, leftColX, leftY, { lineHeightFactor: 1.4 });
  leftY += (aboutLines.length * 5) + 12;

  leftY = drawSectionHeading("Links", leftColX, leftY, 45);
  personalInfo.links.forEach(link => {
    doc.setFont("helvetica", "bold"); doc.setTextColor(40);
    doc.text(link.label + ":", leftColX, leftY);
    doc.setFont("helvetica", "normal"); doc.setTextColor(0, 100, 200);
    doc.text(link.url, leftColX, leftY + 4.5);
    doc.link(leftColX, leftY, 45, 7, { url: `https://${link.url}` });
    leftY += 12;
  });

  leftY = drawSectionHeading("Hobbies", leftColX, leftY, 45);
  personalInfo.hobbies.forEach(hobby => {
    leftY = drawHangingIndent(hobby.toUpperCase(), leftColX, leftY, 40, true);
  });

  // --- 5. RIGHT COLUMN (Experience, Education, Skills) ---
  rightY = drawSectionHeading("Work Experience", rightColX, rightY, 115);
  experiencesData.forEach(exp => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(40);
    doc.text(exp.company.toUpperCase(), rightColX, rightY, { horizontalScale: 0.85 } as any);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120);
    doc.text(exp.location, pageWidth - 15, rightY, { align: "right" });
    rightY += 6;

    exp.roles.forEach(role => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(60);
      doc.text(role.title, rightColX + 5, rightY);
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.text(`${role.startDate} - ${role.endDate}`, pageWidth - 15, rightY, { align: "right" });
      rightY += 4.5;

      doc.setFontSize(7.5);
      doc.setTextColor(0, 100, 200);
      doc.text(role.workType.toUpperCase(), rightColX + 5, rightY);
      rightY += 5;

      role.description.forEach(desc => {
        rightY = drawHangingIndent(desc, rightColX + 5, rightY, 105, false);
      });
      rightY += 4;
    });
  });

  // Check for page break before Education
  if (rightY > 230) { doc.addPage(); rightY = 20; }

  rightY = drawSectionHeading("Education", rightColX, rightY, 115);
  personalInfo.education.forEach(edu => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(edu.school.toUpperCase(), rightColX, rightY, { horizontalScale: 0.9 } as any);
    doc.setFont("helvetica", "normal");
    doc.text(edu.year, pageWidth - 15, rightY, { align: "right" });
    rightY += 5;
    doc.setFontSize(8.5);
    doc.setTextColor(80);
    doc.text(edu.degree, rightColX, rightY);
    rightY += 8;
  });

  rightY = drawSectionHeading("Skills", rightColX, rightY, 115);
  let skillX = rightColX;
  personalInfo.skills.forEach((skill, i) => {
    doc.setFontSize(8.5);
    doc.setTextColor(60);
    doc.text(skill.toUpperCase(), skillX, rightY, { horizontalScale: 0.9 } as any);
    doc.setDrawColor(220);
    doc.line(skillX, rightY + 2, skillX + 50, rightY + 2);
    if (i % 2 === 0) { skillX += 60; } else { skillX = rightColX; rightY += 10; }
  });

  doc.save(`${personalInfo.name.first}_${personalInfo.name.last}_Resume.pdf`);
};
