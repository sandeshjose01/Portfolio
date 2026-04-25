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
  const rightColX = 75;
  const margin = 15;
  let y = 20;

  // --- HELPER: PAGE BREAK CHECKER ---
  const checkPageBreak = (currentY: number, neededSpace: number) => {
    if (currentY + neededSpace > pageHeight - margin) {
      doc.addPage();
      return 20; // Reset Y to top of new page
    }
    return currentY;
  };

  // --- 1. HEADER SECTION (Larger Profile & Better Alignment) ---
  try {
    const imgUrl = personalInfo.profileImage || "/profile.png";
    const img = await loadImage(imgUrl);
    // Profile image slightly larger (30x30)
    doc.addImage(img, "PNG", 15, 15, 30, 30);
  } catch (error) {
    doc.setDrawColor(200);
    doc.circle(30, 30, 15, "S"); 
  }

  // Name and Role
  doc.setFontSize(28);
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  doc.text(personalInfo.name.first, 52, 28);
  doc.setFont("helvetica", "bold");
  doc.text(personalInfo.name.last, 52, 38);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80);
  doc.text(personalInfo.role, 52, 45, { charSpace: 0.5 });

  // Contact Header (Top Right)
  doc.setFontSize(8);
  doc.setTextColor(100);
  let contactY = 18;
  doc.text(personalInfo.contact.location, pageWidth - 15, contactY, { align: "right" });
  doc.setTextColor(0, 102, 204); 
  doc.text(personalInfo.contact.phone, pageWidth - 15, contactY + 5, { align: "right" });
  doc.text(personalInfo.contact.email, pageWidth - 15, contactY + 10, { align: "right" });
  doc.text(personalInfo.contact.website, pageWidth - 15, contactY + 15, { align: "right" });

  y = 60;

  // --- HELPER FOR HEADINGS ---
  const drawHeading = (text: string, x: number, currY: number) => {
    const spaceCheck = checkPageBreak(currY, 15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(text.toUpperCase(), x, spaceCheck);
    doc.setLineWidth(0.4);
    doc.setDrawColor(0);
    doc.line(x, spaceCheck + 2, x + (x > 50 ? 120 : 45), spaceCheck + 2);
    return spaceCheck + 10;
  };

  // --- MAIN CONTENT (Right Column First to determine height) ---
  let rightY = y;
  
  // ABOUT ME (Increased size and improved line height)
  rightY = drawHeading("About Me", rightColX, rightY);
  doc.setFontSize(9.5); // Increased from 8
  doc.setFont("helvetica", "normal"); 
  doc.setTextColor(60);
  const aboutLines = doc.splitTextToSize(personalInfo.aboutMe, 115);
  doc.text(aboutLines, rightColX + 5, rightY, { lineHeightFactor: 1.4 });
  rightY += (aboutLines.length * 5) + 12;

  // WORK EXPERIENCE
  rightY = drawHeading("Work Experience", rightColX, rightY);
  
  experiencesData.forEach(exp => {
    rightY = checkPageBreak(rightY, 15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(0);
    doc.text(exp.company.toUpperCase(), rightColX + 5, rightY);
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(exp.location, pageWidth - 15, rightY, { align: 'right' });
    rightY += 6;

    exp.roles.forEach(role => {
      rightY = checkPageBreak(rightY, 20); // Check space for a whole role block
      
      doc.setDrawColor(0, 102, 204);
      doc.setLineWidth(0.5);
      doc.circle(rightColX + 1, rightY - 1, 0.8, "F"); 
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(0);
      doc.text(role.title, rightColX + 5, rightY);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80);
      doc.text(`${role.startDate} - ${role.endDate}`, pageWidth - 15, rightY, { align: 'right' });
      
      rightY += 4;
      doc.setFontSize(7.5);
      doc.setTextColor(0, 102, 204);
      doc.text(role.workType.toUpperCase(), rightColX + 5, rightY);
      rightY += 5;

      doc.setFontSize(8.5);
      doc.setTextColor(60);
      role.description.forEach(bullet => {
        const bulletLines = doc.splitTextToSize(bullet, 110);
        rightY = checkPageBreak(rightY, bulletLines.length * 4);
        doc.text("•", rightColX + 7, rightY);
        doc.text(bulletLines, rightColX + 11, rightY);
        rightY += (bulletLines.length * 4.5);
      });
      rightY += 4;
    });
    rightY += 3;
  });

  // EDUCATION
  rightY = drawHeading("Education", rightColX, rightY);
  personalInfo.education.forEach(edu => {
    rightY = checkPageBreak(rightY, 15);
    doc.circle(rightColX + 1, rightY - 1, 0.8, "F");
    doc.setFont("helvetica", "bold");
    doc.text(`${edu.degree.toUpperCase()} | ${edu.year}`, rightColX + 5, rightY);
    rightY += 5;
    doc.setFont("helvetica", "normal");
    doc.text(edu.school.toUpperCase(), rightColX + 5, rightY);
    rightY += 8;
  });

  // SKILLS
  rightY = drawHeading("Skills", rightColX, rightY);
  let skillX = rightColX + 5;
  personalInfo.skills.forEach((skill, index) => {
    rightY = checkPageBreak(rightY, 5);
    doc.setFontSize(8.5);
    doc.setTextColor(60);
    doc.text(skill, skillX, rightY);
    if ((index + 1) % 2 === 0) { 
      rightY += 7; 
      skillX = rightColX + 5; 
    } else { 
      skillX += 60; 
    }
  });

  // --- SIDEBAR (Left Column) ---
  // Resetting to Page 1 for Sidebar drawing
  doc.setPage(1);
  let leftY = y;
  
  // Links
  leftY = drawHeading("Links", leftColX, leftY);
  personalInfo.links.forEach(link => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(0);
    doc.text(link.label + ":", leftColX, leftY);
    doc.setFont("helvetica", "normal"); doc.setTextColor(0, 102, 204);
    doc.text(link.url, leftColX, leftY + 4);
    leftY += 12;
  });

  // Languages
  leftY = drawHeading("Languages", leftColX, leftY);
  personalInfo.languages.forEach(lang => {
    doc.setFontSize(9); doc.setTextColor(60);
    doc.text(lang.name, leftColX, leftY);
    leftY += 6;
  });

  // HOBBIES (FIXED ALIGNMENT & INDENTATION)
  leftY = drawHeading("Hobbies", leftColX, leftY);
  const hobbyBulletX = leftColX;
  const hobbyTextX = leftColX + 4; // Indent the text from the bullet
  const hobbyWidth = 42;

  personalInfo.hobbies.forEach(hobby => {
    doc.setFontSize(9);
    doc.setTextColor(80);
    
    const lines = doc.splitTextToSize(hobby, hobbyWidth);
    doc.text("•", hobbyBulletX, leftY); // Draw bullet
    
    lines.forEach((line: string, index: number) => {
      doc.text(line, hobbyTextX, leftY); // Draw text line
      leftY += 5;
    });
    leftY += 1;
  });

  doc.save(`${personalInfo.name.first}_${personalInfo.name.last}_Resume.pdf`);
};
