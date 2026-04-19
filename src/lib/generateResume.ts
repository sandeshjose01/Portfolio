import jsPDF from "jspdf";
import { experiencesData, personalInfo } from "@/app/experience/experiences";

export const downloadATSResume = async () => {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const leftColX = 15;
  const rightColX = 75;
  let y = 20;

  // --- HEADER SECTION ---
  
  // 1. ADD PROFILE IMAGE
  try {
    // This loads your image from the public folder
    const imgUrl = personalInfo.profileImage || "/profile.png";
    // We use a square 24x24mm image to fit the circle area
    // x=18, y=13 makes it centered where the circle used to be
    doc.addImage(imgUrl, "PNG", 18, 13, 24, 24, undefined, 'FAST');
  } catch (error) {
    console.error("Image could not be loaded", error);
    // Fallback to the empty circle if image fails
    doc.setDrawColor(200);
    doc.circle(30, 25, 12, "S"); 
  }

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
  doc.text(website, pageWidth - 15, 33, { 
    align: "right", 
    url: webUrl 
  } as any);

  y = 60;

  // Helper for Headings
  const drawHeading = (text: string, x: number, currY: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(text.toUpperCase(), x, currY);
    doc.setLineWidth(0.3);
    doc.line(x, currY + 2, x + (x > 50 ? 120 : 45), currY + 2);
    return currY + 10;
  };

  // --- SIDEBAR & CONTENT ---
  // (The rest of your logic remains the same as before)
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

  let rightY = y;
  rightY = drawHeading("About Me", rightColX, rightY);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80);
  const aboutLines = doc.splitTextToSize(personalInfo.aboutMe, 120);
  doc.text(aboutLines, rightColX + 5, rightY);
  rightY += (aboutLines.length * 4.5) + 10;

  rightY = drawHeading("Work Experience", rightColX, rightY);
  experiencesData.forEach(exp => {
    doc.setDrawColor(0);
    doc.circle(rightColX, rightY - 1, 1);
    doc.line(rightColX, rightY, rightColX, rightY + 12);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(0);
    doc.text(`${exp.role.toUpperCase()} | ${exp.duration}`, rightColX + 5, rightY);
    rightY += 4.5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(exp.company.toUpperCase() + ", " + exp.location, rightColX + 5, rightY);
    rightY += 5;
    exp.description.forEach(bullet => {
      doc.text("• " + bullet, rightColX + 7, rightY);
      rightY += 4;
    });
    rightY += 6;
  });

  rightY = drawHeading("Education", rightColX, rightY);
  personalInfo.education.forEach(edu => {
    doc.circle(rightColX, rightY - 1, 1);
    doc.setFont("helvetica", "bold");
    doc.text(`${edu.degree.toUpperCase()} | ${edu.year}`, rightColX + 5, rightY);
    rightY += 5;
    doc.setFont("helvetica", "normal");
    doc.text(edu.school.toUpperCase(), rightColX + 5, rightY);
    rightY += 8;
  });

  rightY = drawHeading("Skills", rightColX, rightY);
  let skillX = rightColX + 5;
  personalInfo.skills.forEach((skill, index) => {
    doc.setFontSize(8);
    doc.setTextColor(80);
    doc.text(skill, skillX, rightY);
    doc.setDrawColor(200);
    doc.line(skillX, rightY + 1.5, skillX + 50, rightY + 1.5);
    if ((index + 1) % 2 === 0) {
      rightY += 8;
      skillX = rightColX + 5;
    } else {
      skillX += 60;
    }
  });

  doc.save(`${personalInfo.name.first}_${personalInfo.name.last}_Resume.pdf`);
};
