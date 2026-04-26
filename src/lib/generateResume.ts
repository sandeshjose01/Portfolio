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

// Fetches the raw .ttf file from Google Fonts
const getGoogleFontTTF = async (): Promise<string | null> => {
  try {
    const url = "https://fonts.gstatic.com/s/bebasneue/v16/JTUSjIg69CK48gW7PXooxW5rygbi49c.ttf";
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error("Failed to load Bebas Neue, falling back to Helvetica", e);
    return null;
  }
};

export const downloadATSResume = async () => {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  
  // --- 1. FONT REGISTRATION ---
  let titleFont = "helvetica"; 
  const bebasBase64 = await getGoogleFontTTF();
  
  if (bebasBase64) {
    doc.addFileToVFS("BebasNeue.ttf", bebasBase64);
    doc.addFont("BebasNeue.ttf", "Bebas", "normal");
    titleFont = "Bebas";
  }

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12; // A4 Safe Print Margin
  const dividerX = 72; 
  const leftColX = margin;
  const rightColX = dividerX + 6;
  const colWidthLeft = dividerX - leftColX - 5;
  const colWidthRight = pageWidth - rightColX - margin;
  const sectionGap = 8;

  let y = margin + 5;

  // --- 2. HEADER SECTION ---
  // THE FIX: "White Mask" instead of doc.clip()
  try {
    const imgUrl = personalInfo.profileImage || "/profile.png";
    const img = await loadImage(imgUrl);
    
    // 1. Draw the raw square image
    doc.addImage(img, "PNG", leftColX, y - 5, 40, 40);
    
    // 2. Draw a very thick WHITE circle over the edges of the square image
    // This creates a perfect circular cutout without breaking Chrome's text renderer!
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(10); // Very thick border
    doc.circle(leftColX + 20, y + 15, 24, "S"); 
    
    // 3. Reset standard draw colors so the rest of the PDF draws normally
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
  } catch (e) {
    doc.setDrawColor(200);
    doc.circle(leftColX + 20, y + 15, 20, "S");
  }

  // Name (Using Bebas Neue from Google Fonts)
  doc.setFont(titleFont, titleFont === "Bebas" ? "normal" : "bold");
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(36);
  
  const nameScale = titleFont === "Bebas" ? 1.0 : 0.85;
  doc.text(personalInfo.name.first.toUpperCase(), 60, y + 12, { horizontalScale: nameScale } as any);
  doc.text(personalInfo.name.last.toUpperCase(), 60, y + 25, { horizontalScale: nameScale } as any);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(personalInfo.role.toUpperCase(), 60, y + 33, { charSpace: 1 });

  // Top Right Contact
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  let contactY = y + 2;
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
  doc.setLineWidth(0.2);
  doc.line(dividerX, y, dividerX, pageHeight - margin);

  // --- HELPERS ---
  const checkPageBreak = (currentY: number, needed: number) => {
    if (currentY + needed > pageHeight - margin) {
      doc.addPage();
      doc.setDrawColor(220);
      doc.line(dividerX, margin, dividerX, pageHeight - margin);
      return margin + 10;
    }
    return currentY;
  };

  const drawHeading = (text: string, x: number, currY: number, w: number) => {
    doc.setFont(titleFont, titleFont === "Bebas" ? "normal" : "bold");
    doc.setFontSize(15); 
    doc.setTextColor(40);
    doc.text(text.toUpperCase(), x, currY, { horizontalScale: nameScale } as any);
    doc.setDrawColor(40);
    doc.setLineWidth(0.4);
    doc.line(x, currY + 2, x + w, currY + 2);
    return currY + 10;
  };

  const drawBulletItem = (text: string, x: number, currY: number, w: number) => {
    doc.setDrawColor(100);
    doc.setLineWidth(0.2);
    doc.circle(x + 1, currY - 1, 0.6, "S"); 
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(70);
    const lines = doc.splitTextToSize(text, w - 6);
    doc.text(lines, x + 6, currY, { lineHeightFactor: 1.3 });
    return currY + (lines.length * 4.5) + 2;
  };

  // --- LEFT COLUMN ---
  let leftY = y + 5;

  // About Me
  leftY = drawHeading("About Me", leftColX, leftY, colWidthLeft);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(80);
  const abt = doc.splitTextToSize(personalInfo.aboutMe, colWidthLeft);
  doc.text(abt, leftColX, leftY, { lineHeightFactor: 1.4 });
  
  leftY += (abt.length * 4.2) + sectionGap;

  // Links
  leftY = drawHeading("Links", leftColX, leftY, colWidthLeft);
  personalInfo.links.forEach(link => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(8.5); doc.setTextColor(40);
    doc.text(link.label + ":", leftColX, leftY);
    doc.setFont("helvetica", "normal"); doc.setTextColor(0, 100, 200);
    doc.text(link.url, leftColX, leftY + 4);
    doc.link(leftColX, leftY, colWidthLeft, 7, { url: `https://${link.url}` });
    leftY += 10;
  });

  leftY += sectionGap - 2;

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
    doc.setFontSize(13);
    doc.setTextColor(30);
    doc.text(exp.company.toUpperCase(), rightColX, rightY, { horizontalScale: nameScale } as any);
    
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
    doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(60);
    doc.text(skill.toUpperCase(), skillX, rightY);
    doc.setDrawColor(230);
    doc.line(skillX, rightY + 2, skillX + 52, rightY + 2);
    if (i % 2 === 0) { skillX += 60; } else { skillX = rightColX; rightY += 10; }
  });

  doc.save(`${personalInfo.name.first}_${personalInfo.name.last}_Resume.pdf`);
};
