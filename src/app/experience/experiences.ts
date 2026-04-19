// --- TYPES (This prevents the build errors) ---
export interface Experience {
  id: number;
  role: string;
  company: string;
  logo?: string;
  duration: string;
  location: string;
  description: string[];
  iconType: "briefcase" | "building" | "freelance";
}

export interface Recommendation {
  id: number;
  name: string;
  designation: string;
  image?: string;
  text: string;
}

// --- 1. PERSONAL INFORMATION (Updates your Name & PDF Header) ---
export const personalInfo = {
  name: { first: "SANDESH", last: "JOSHI" },
  role: "GRAPHIC DESIGNER & UI/UX SPECIALIST",
  contact: {
    location: "Kathmandu, Nepal",
    phone: "+977 9800000000",
    email: "sandeshjoshi@example.com",
    website: "www.sandeshjoshi.info.np"
  },
    aboutMe: "Experienced Graphic Designer with a background in UI/UX and brand identity. Proven track record in implementing and managing design systems in various professional settings. Strong analytical skills with a keen eye for detail.",
  links: [
    { label: "LinkedIn", url: "linkedin.com/in/sanjoshi1" },
    { label: "Website", url: "sandeshjoshi.info.np" }
  ],
  languages: [
    { name: "English", level: 90 },
    { name: "Nepali", level: 100 },
    { name: "Hindi", level: 75 }
  ],
  hobbies: ["Photography", "Running", "Design Research", "Stargazing"],
  education: [
    {
      degree: "Bachelor of Fine Arts",
      year: "2021",
      school: "University of Arts, Kathmandu",
      details: "Focused on Digital Design and Typography."
    }
  ],
  skills: ["Figma", "Adobe Suite", "UI/UX", "Brand Design", "React", "Next.js"]
};

// --- 2. WORK EXPERIENCE (Updates Experience Page & PDF) ---
export const experiencesData: Experience[] = [
  {
    id: 1, // Added ID to fix the build error
    role: "Senior Graphic Designer",
    company: "Creative Studio Solutions",
    logo: "", 
    duration: "JAN 2022 - PRESENT",
    location: "REMOTE",
    description: [
      "Led the design of 15+ comprehensive brand identity packages, resulting in a 30% increase in client engagement.",
      "Collaborated with the development team to design intuitive UI/UX for web and mobile applications using Figma.",
      "Managed multiple social media campaigns, designing cohesive grids and ad banners."
    ],
    iconType: "briefcase"
  },
  {
    id: 2, // Added ID to fix the build error
    role: "Graphic Designer",
    company: "Marketing Agency X",
    logo: "",
    duration: "MAR 2019 - DEC 2021",
    location: "KATHMANDU, NEPAL",
    description: [
      "Designed high-quality print materials for 50+ corporate events including flex designs and brochures.",
      "Implemented design systems for retail brand growth and product packaging."
    ],
    iconType: "building"
  }
];

// --- 3. RECOMMENDATIONS (Updates Experience Page) ---
export const recommendations: Recommendation[] = [
  {
    id: 1,
    name: "John Doe",
    designation: "Product Manager at TechCorp",
    image: "", 
    text: "Sandesh is an exceptional designer. His eye for detail and ability to translate complex requirements into intuitive UI is remarkable. He helped us increase our conversion by 25%."
  },
  {
    id: 2,
    name: "Sarah Smith",
    designation: "Founder of Creative Agency",
    image: "",
    text: "Working with Sandesh was a breeze. He delivered a complete brand identity that perfectly captured our vision. Highly recommended for any high-level design projects."
  }
];
