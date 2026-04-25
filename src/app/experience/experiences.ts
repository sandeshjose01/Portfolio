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
  profileImage: "/profile.png",
  role: "CREATIVE GRAPHIC DESIGNER & VIDEO EDITOR",
  contact: {
    location: "Changunarayan-2, Bhaktapur, Nepal",
    phone: "+977 9861548815",
    email: "info@sandeshjoshi.info.np",
    website: "www.sandeshjoshi.info.np"
  },
    aboutMe: "Hello, It's me Sandesh Joshi your next Creative Graphic Designer with over 5+ years of experience. I have much experience in designing Social Media Posts (Facebook post, Business Page Cover), Photo Manipulation & Printing (Business cards, Letterheads, Logos, Book Cover, Signature Logos, Flyers and so on). I use Adobe Illustrator and Adobe Photoshop to design the graphics for you. Not only that, but I will provide high-quality work which satisfies all my clients. I have completed many projects with customer's satisfaction. Furthermore. If you have work related to my skills, then contact me.",
  links: [
    { label: "LinkedIn", url: "linkedin.com/in/sanjoshi1" },
    { label: "Website", url: "sandeshjoshi.info.np" }
  ],
  languages: [
    { name: "English", level: 90 },
    { name: "Nepali", level: 100 },
  ],
  hobbies: ["Designing", "Playing Game", "Watching Anime", "Research & Learn New Graphic Trend", "Creating Cool Graphics", "Photography" ],
  education: [
    {
      degree: "Bachelor of Business Studies",
      year: "2021",
      school: "Bhaktapur Multiple Campus, Bhaktapur",
      details: "Focused Primarily on Providing a Strong Theoretical Foundation in Business Principles while Fostering Critical Thinking, Research Skills, and a Comprehensive understanding of Business Operations."
    }
  ],
  skills: ["Adobe Creative Suite", "Adobe Photoshop", "Adobe Illustrator", "Adobe Indesign", "Adobe Premiere Pro", "Adobe After Effect", "Canva", "Breanding"]
};

// --- 2. WORK EXPERIENCE (Updates Experience Page & PDF) ---
export const experiencesData: Experience[] = [
   {
    id: 6, // Added ID to fix the build error
    role: "Creative Graphic Designer",
    company: "Himalayan Cordyceps",
    logo: "", 
    duration: "MAY 2025 - APR 2026",
    location: "BOUDHA, KATHMANDU",
    description: [
      "Edited VOX Style Documentary Video using tools like Adobe Premier Pro, Adobe After Effects.",
      "Designed Banners for Different Events.",
      "Designed Social Media Post Using AI, Photo Manupulation, Creative Idea and tools like Adobe Photohop, Adobe Illustrator."
    ],
    iconType: "briefcase"
  },
  {
    id: 5, // Added ID to fix the build error
    role: "Graphic Designer",
    company: "Himalayan Cordyceps",
    logo: "", 
    duration: "APR 2025 - MAY 2025",
    location: "BOUDHA, KATHMANDU",
    description: [
      "Designed Social Media Post as per the Company Guidlance and the Color Scheme",
      "Manupulated Photo as per the need."
    ],
    iconType: "briefcase"
  },
  {
    id: 4, // Added ID to fix the build error
    role: "Graphic Designer",
    company: "Everest Canvas",
    logo: "", 
    duration: "JAN 2024 - APR 2025",
    location: "CHARDOBATO NAYA THIMI, BHAKTAPUR",
    description: [
      "Designed Multiple Types Canvas available in Market.",
      "Manipulated Clients Photo like Changing Background, Background Blur, Turning Ordinary Photo into Professional Shoot Photo.",
      "Restored Old Small Photo into High Quality Photo which can be printed in Anysize which made clients happy.",
      "Designed Different Kinds of Banned like Sliding Banner, Standee Banners, Event Banner, Shop Board Banner, 3D Board, Acrylic Light Board"
    ],
    iconType: "briefcase"
  },
  {
    id: 3, // Added ID to fix the build error
    role: "Client Services Executive",
    company: "Catalyst Advertising Pvt. Ltd",
    logo: "", 
    duration: "APR 2023 - JAN 2024",
    location: "KHUMALTAR HEIGHT, LALITPUR",
    description: [
      "Built and nurtured strong client relationships, ensuring exceptional service and satisfaction.",
      "Acted as a trusted advisor, proactively identifying and resolving client needs.",
      "Effectively communicated with clients across all channels, fostering a positive and collaborative environment.",
    ],
    iconType: "briefcase"
  },
  {
    id: 2, // Added ID to fix the build error
    role: "Graphic Designer",
    company: "Arya Digital Production",
    logo: "", 
    duration: "JAN 2023 - APR 2023",
    location: "NEW BANESHWOR, KATHMANDU",
    description: [
      "Design Social Media Post for all the local clients.",
      "Design Printing Media Like ID Card, Banner, Stickers and other Other Necessary Printing Media.",
      "Re-designed Logo of Arya Digital Production.",
      "Designed Logo for local clients as per their need and Design Guideline."
    ],
    iconType: "briefcase"
  },
  {
    id: 1, // Added ID to fix the build error
    role: "Graphic Designer",
    company: "Swastik Design & Printing Suppliers",
    logo: "",
    duration: "JAN 2021 - JAN 2023",
    location: "CHYASAL, KATHMANDU",
    description: [
      "Design all kinds of printing material",
      "Designed high-quality print materials for corporate events including flex designs, brochures, ID Card, Books and Books Cover.",
      "Designed product packaging implementing company's guidance."
    ],
    iconType: "building"
  }
];

// --- 3. RECOMMENDATIONS (Updates Experience Page) ---
export const recommendations: Recommendation[] = [
  {
    id: 1,
    name: "Ram Bhandari",
    designation: "Founder CEO at KARYA TECHNOLOGY | DMI Pro 9 | Google Educator Level 1 & 2 | Prompt Engineering",
    image: "",
    text: `I had the opportunity to work closely with Sandesh Joshi during my tenure as Chief Digital Officer at Himalayan Cordyceps, where he was responsible for executing creative ideation into impactful visual outputs.
    Sandesh demonstrated strong proficiency in Adobe Creative Cloud tools, particularly Illustrator and Photoshop, consistently delivering high-quality creatives that aligned with our premium brand positioning. His ability to transform conceptual ideas into visually compelling designs played a crucial role in enhancing our digital presence and marketing effectiveness.
    Beyond his technical skills, Sandesh showed a keen understanding of branding and visual storytelling. He was detail-oriented, responsive to feedback, and committed to maintaining consistency across all creative assets.
    I would confidently recommend Sandesh to any organization looking for a creative professional who combines design expertise with a clear understanding of business and brand objectives.`
  }
  
];
