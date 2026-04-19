import jsPDF from "jspdf";

export const experienceData = [
  {
    role: "Senior Graphic Designer & UI/UX",
    company: "Creative Studio Solutions",
    duration: "Jan 2022 – Present",
    location: "Remote",
    description: [
      "Led the design of 15+ comprehensive brand identity packages, resulting in a 30% increase in client engagement.",
      "Collaborated with the development team to design intuitive UI/UX for web and mobile applications using Figma.",
      "Managed multiple social media campaigns, designing cohesive grids and ad banners that boosted conversion by 25%.",
    ],
  },
  {
    role: "Graphic Designer",
    company: "Marketing Agency X",
    duration: "Mar 2019 – Dec 2021",
    location: "Kathmandu, Nepal",
    description: [
      "Designed high-quality print materials including flex designs, brochures, and event posters for over 50 corporate events.",
      "Created custom product packaging and labels for local retail brands, improving product shelf-visibility.",
      "Assisted in photo manipulation and typography choices for large-scale digital marketing campaigns.",
    ],
  },
  {
    role: "Freelance Designer",
    company: "Self-Employed",
    duration: "Jun 2017 – Feb 2019",
    location: "Global",
    description: [
      "Provided custom canvas prints and 3D mockups for various e-commerce businesses.",
      "Designed experimental festive social media posts, increasing personal portfolio reach.",
    ],
  },
];

export const downloadATSResume = () => {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  let y = 20; 
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - margin * 2;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("SANDESH JOSHI", pageWidth / 2, y, { align: "center" });
  
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Graphic Designer & UI/UX Specialist", pageWidth / 2, y, { align: "center" });
  
  y += 6;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("sandeshjoshi.info.np  •  Kathmandu, Nepal", pageWidth / 2, y, { align: "center" });
  
  y += 15;

  // Experience Heading
  doc.setTextColor(0, 0, 0); 
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("PROFESSIONAL EXPERIENCE", margin, y);
  
  y += 3;
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y); 
  y += 8;

  // Loop through Experiences
  experienceData.forEach((exp) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(exp.role, margin, y);

    doc.setFont("helvetica", "normal");
    doc.text(exp.duration, pageWidth - margin, y, { align: "right" });
    
    y += 5;

    doc.setFont("helvetica", "italic");
    doc.text(`${exp.company} | ${exp.location}`, margin, y);
    
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    exp.description.forEach((point) => {
      const lines = doc.splitTextToSize(`•  ${point}`, maxLineWidth);
      doc.text(lines, margin, y);
      y += lines.length * 5; 
    });

    y += 6; 
  });

  doc.save("Sandesh_Joshi_Resume.pdf");
};
