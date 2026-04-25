import jsPDF from "jspdf";
import { experiencesData, personalInfo } from "@/app/experience/experiences";

// NEW HELPER: Ensures the image is loaded before the PDF is drawn
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
  const leftColX = 15;
  const rightColX = 75;
  let y = 20;

  // --- 1. HANDLE PROFILE IMAGE ---
  try {
    const imgUrl = personalInfo.profileImage || "/profile.png";
    const img = await loadImage(imgUrl);
    doc.addImage(img, "PNG", 18, 13, 24, 24);
  } catch (error) {
    doc.setDrawColor(200);
    doc.circle(30, 25, 12, "S"); 
  }

  // --- HEADER TEXT ---
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

  // --- CONTACT INFO ---
  doc.setFontSize(8);
  doc.setTextColor(80);
  doc.text(personalInfo.contact.location, pageWidth - 15, 18, { align: "right" });

  doc.setTextColor(0, 102, 204); 
  doc.text(personalInfo.contact.phone, pageWidth - 15, 23, { 
    align: "right", 
    url: `tel:${personalInfo.contact.phone.replace(/\s/g, "")}` 
  } as any);

  doc.text(personalInfo.contact.email, pageWidth - 15, 28, { 
    align: "right", 
    url: `mailto:${personalInfo.contact.email}` 
  } as any);

  const website = personalInfo.contact.website || "Portfolio";
  const webUrl = website.startsWith("http") ? website : `https://${website}`;
  doc.text(website, pageWidth - 15, 33, { align: "right", url: webUrl } as any);

  y = 60;

  // --- HELPER FOR HEADINGS ---
  const drawHeading = (text: string, x: number, currY: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(text.toUpperCase(), x, currY);
    doc.setLineWidth(0.3);
    doc.line(x, currY + 2, x + (x > 50 ? 120 : 45), currY + 2);
    return currY + 10;
  };

  // --- SIDEBAR (Links, Languages, Hobbies) ---
  let leftY = y;
  
  // Links
  leftY = drawHeading("Links", leftColX, leftY);
  personalInfo.links.forEach(link => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(0);
    doc.text(link.label + ":", leftColX, leftY);
    doc.setFont("helvetica", "normal"); doc.setTextColor(0, 102, 204);
    const linkUrl = link.url.startsWith("http") ? link.url : `https://${link.url}`;
    doc.text(link.url, leftColX, leftY + 4, { url: linkUrl } as any);
    leftY += 12;
  });

  // Languages
  leftY += 5;
  leftY = drawHeading("Languages", leftColX, leftY);
  personalInfo.languages.forEach(lang => {
    doc.setFont("helvetica", "normal"); doc.setTextColor(100);
    doc.text(lang.name, leftColX, leftY);
    doc.setDrawColor(220); doc.line(leftColX, leftY + 2, leftColX + 45, leftY + 2);
    doc.setDrawColor(0); doc.line(leftColX, leftY + 2, leftColX + (45 * (lang.level / 100)), leftY + 2);
    leftY += 8;
  });

  // --- HOBBIES (FIXED: STRICT WIDTH TO PREVENT OVERFLOW) ---
  leftY += 5;
  leftY = drawHeading("Hobbies", leftColX, leftY);
  const hobbySidebarWidth = 48; // STRICT WIDTH limit

  personalInfo.hobbies.forEach(hobby => {
    doc.setFont("helvetica", "normal"); 
    doc.setTextColor(100);
    doc.setFontSize(8);

    const wrappedHobby = doc.splitTextToSize("• " + hobby, hobbySidebarWidth);
    wrappedHobby.forEach((line: string) => {
      doc.text(line, leftColX, leftY);
      leftY += 4.5; 
    });
    leftY += 1; 
  });

  // --- MAIN CONTENT ---
  let rightY = y;
  
  // About Me
  rightY = drawHeading("About Me", rightColX, rightY);
  doc.setFontSize(8); doc.setFont("helvetica", "normal"); doc.setTextColor(80);
  const aboutLines = doc.splitTextToSize(personalInfo.aboutMe, 120);
  doc.text(aboutLines, rightColX + 5, rightY);
  rightY += (aboutLines.length * 4.5) + 10;

  // --- WORK EXPERIENCE (FIXED: UPDATED FOR LINKEDIN STYLE DATA) ---
  rightY = drawHeading("Work Experience", rightColX, rightY);
  
  experiencesData.forEach(exp => {
    // Company Title and Location
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(exp.company.toUpperCase(), rightColX + 5, rightY);
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(exp.location, pageWidth - 15, rightY, { align: 'right' });
    
    rightY += 6;

    // Loop through individual roles in that company
    exp.roles.forEach(role => {
      // Role Title
      doc.setDrawColor(0); 
      doc.circle(rightColX + 1, rightY - 1, 0.7, "F"); 
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(0);
      doc.text(role.title, rightColX + 5, rightY);

      // Role Dates
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80);
      const dateText = `${role.startDate} - ${role.endDate}`;
      doc.text(dateText, pageWidth - 15, rightY, { align: 'right' });
      
      rightY += 4;

      // Work Type (Remote/On-site)
      doc.setFontSize(7);
      doc.setTextColor(0, 102, 204);
      doc.text(role.workType.toUpperCase(), rightColX + 5, rightY);
      rightY += 5;

      // Description points
      doc.setFontSize(8);
      doc.setTextColor(80);
      role.description.forEach(bullet => {
        const bulletLines = doc.splitTextToSize("• " + bullet, 115);
        doc.text(bulletLines, rightColX + 7, rightY);
        rightY += (bulletLines.length * 4);
      });
      
      rightY += 4; // Space between roles
    });
    rightY += 2; // Space between companies
  });

  // Education
  rightY = drawHeading("Education", rightColX, rightY);
  personalInfo.education.forEach(edu => {
    doc.circle(rightColX, rightY - 1, 1); doc.setFont("helvetica", "bold");
    doc.text(`${edu.degree.toUpperCase()} | ${edu.year}`, rightColX + 5, rightY);
    rightY += 5;
    doc.setFont("helvetica", "normal"); doc.text(edu.school.toUpperCase(), rightColX + 5, rightY);
    rightY += 8;
  });

  // Skills
  rightY = drawHeading("Skills", rightColX, rightY);
  let skillX = rightColX + 5;
  personalInfo.skills.forEach((skill, index) => {
    doc.setFontSize(8); doc.setTextColor(80); doc.text(skill, skillX, rightY);
    doc.setDrawColor(200); doc.line(skillX, rightY + 1.5, skillX + 50, rightY + 1.5);
    if ((index + 1) % 2 === 0) { rightY += 8; skillX = rightColX + 5; } else { skillX += 60; }
  });

  doc.save(`${personalInfo.name.first}_${personalInfo.name.last}_Resume.pdf`);
};
