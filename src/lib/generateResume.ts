import jsPDF from "jspdf";
// Point to the new experiences file
import { experiencesData } from "@/app/experience/experiences"; 

export const downloadATSResume = () => {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  
  // ... (rest of your PDF logic)

  // Use experiencesData for the loop
  experiencesData.forEach((exp) => {
    // ... loop logic
  });

  doc.save("Sandesh_Joshi_Resume.pdf");
};
