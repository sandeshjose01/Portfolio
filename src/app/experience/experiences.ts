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
    aboutMe: "Hello, It's me Sandesh Joshi your next Creative Graphic Designer with over 3 years of experience. I have much experience in designing Social Media Posts (Facebook post, Business Page Cover), Photo Manipulation & Printing (Business cards, Letterheads, Logos, Book Cover, Signature Logos, Flyers and so on). I use Adobe Illustrator and Adobe Photoshop to design the graphics for you. Not only that, but I will provide high-quality work which satisfies all my clients. I have completed many projects with customer's satisfaction. Furthermore. If you have work related to my skills, then contact me.",
  links: [
    { label: "LinkedIn", url: "linkedin.com/in/sanjoshi1" },
    { label: "Website", url: "sandeshjoshi.info.np" }
  ],
  languages: [
    { name: "English", level: 90 },
    { name: "Nepali", level: 100 },
  ],
  hobbies: ["Design Research", "Photography", "Stargazing", "Watching Anime", "Research New Graphic Trend" ],
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
    id: 2, // Added ID to fix the build error
    role: "Creative Graphic Designer",
    company: "Himalayan Cordyceps",
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
    id: 1, // Added ID to fix the build error
    role: "Graphic Designer",
    company: "Himalayan Cordyceps",
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
    name: "Ram Bhandari",
    designation: "Founder CEO at KARYA TECHNOLOGY | DMI Pro 9 | Google Educator Level 1 & 2 | Prompt Engineering",
    image: "",
    text: `I had the opportunity to work closely with Sandesh Joshi during my tenure as Chief Digital Officer at Himalayan Cordyceps, where he was responsible for executing creative ideation into impactful visual outputs.
    Sandesh demonstrated strong proficiency in Adobe Creative Cloud tools, particularly Illustrator and Photoshop, consistently delivering high-quality creatives that aligned with our premium brand positioning. His ability to transform conceptual ideas into visually compelling designs played a crucial role in enhancing our digital presence and marketing effectiveness.
    Beyond his technical skills, Sandesh showed a keen understanding of branding and visual storytelling. He was detail-oriented, responsive to feedback, and committed to maintaining consistency across all creative assets.
    I would confidently recommend Sandesh to any organization looking for a creative professional who combines design expertise with a clear understanding of business and brand objectives.`
  },
  {
    id: 2,
    name: "John Doe",
    designation: "Product Manager at TechCorp",
    image: "", 
    text: "Sandesh is an exceptional designer. His eye for detail and ability to translate complex requirements into intuitive UI is remarkable. He helped us increase our conversion by 25%."
    
  }
];
