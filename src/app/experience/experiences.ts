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
    aboutMe: "Hello, It's me Sandesh Joshi your next Creative Graphic Designer and Video Editor with over 5+ years of experience. I have much experience in designing Social Media Posts (Facebook post, Business Page Cover), Photo Manipulation & Printing (Business cards, Letterheads, Logos, Book Cover, Signature Logos, Flyers and so on). I use Adobe Photoshop, Adobe Illustrator and Adobe Indesign to design the graphics for you. I also Have experience in Video Editing (VOX Style Documentary Video, Marketing Video, Advertising Video). Not only that, but I will provide high-quality work which satisfies all my clients. I have completed many projects with customer's satisfaction. Furthermore. If you have work related to my skills, then contact me.",
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
  export const experiencesData = [
  {
    id: 5,
    company: "Himalayan Cordyceps",
    logo: "https://ui-avatars.com/api/?name=HC&background=2563eb&color=fff", // Put your image link here
    location: "Boudha, Kathmandu",
    // Group all roles you had in this specific company here:
    roles: [
      {
        title: "Creative Graphic Designer",
        workType: "On-site", // Remote, On-site, Hybrid
        startDate: "May 2025", // Use "Month Year" format for accurate calculation
        endDate: "Apr 2026",   // Use "Present" if currently working here
        description: [
          "Edited VOX Style Documentary Video using tools like Adobe Premier Pro, Adobe After Effects.",
          "Designed Banners for Different Events.",
          "Designed Social Media Post Using AI, Photo Manipulation, Creative Idea and tools like Adobe Photohop, Adobe Illustrator."
        ]
      },
      // --- EXAMPLE OF A PREVIOUS ROLE IN THE SAME COMPANY ---
      // (Remove or edit this if you didn't have a previous role here)
      {
        title: "Graphic Designer",
        workType: "On-site",
        startDate: "APR 2025", 
        endDate: "May 2025",
        description: [
          "Designed Social Media Post as per the Company Guidlance and the Color Scheme",
          "Manupulated Photo as per the need."
        ]
      }
    ]
  },
  // Add other companies here...
  },
  {
    id: 4,
    company: "Everest Canvas",
    logo: "https://ui-avatars.com/api/?name=HC&background=2563eb&color=fff", // Put your image link here
    location: "CHARDOBATO NAYA THIMI, BHAKTAPUR",
    // Group all roles you had in this specific company here:
    roles: [
      {
        title: "Graphic Designer",
        workType: "On-site", // Remote, On-site, Hybrid
        startDate: "JAN 2025", // Use "Month Year" format for accurate calculation
        endDate: "Apr 2025",   // Use "Present" if currently working here
        description: [
          "Designed Multiple Types Canvas available in Market.",
          "Manipulated Clients Photo like Changing Background, Background Blur, Turning Ordinary Photo into Professional Shoot Photo.",
          "Restored Old Small Photo into High Quality Photo which can be printed in Anysize which made clients happy.",
          "Designed Different Kinds of Banned like Sliding Banner, Standee Banners, Event Banner, Shop Board Banner, 3D Board, Acrylic Light Board"
        ]
      },
      {
    id: 3,
    company: "Catalyst Advertising Pvt. Ltd.",
    logo: "https://ui-avatars.com/api/?name=HC&background=2563eb&color=fff", // Put your image link here
    location: "KHUMALTAR HEIGHT, LALITPUR",
    // Group all roles you had in this specific company here:
    roles: [
      {
        title: "Client Services Executive",
        workType: "On-site", // Remote, On-site, Hybrid
        startDate: "APR 2023", // Use "Month Year" format for accurate calculation
        endDate: "JAN 2024",   // Use "Present" if currently working here
        description: [
          "Built and nurtured strong client relationships, ensuring exceptional service and satisfaction.",
          "Acted as a trusted advisor, proactively identifying and resolving client needs.",
          "Effectively communicated with clients across all channels, fostering a positive and collaborative environment.",
        ]
      },
      {
    id: 2,
    company: "Arya Digital Production",
    logo: "https://ui-avatars.com/api/?name=HC&background=2563eb&color=fff", // Put your image link here
    location: "NEW BANESHWOR, KATHMANDU",
    // Group all roles you had in this specific company here:
    roles: [
      {
        title: "Graphic Designer",
        workType: "On-site", // Remote, On-site, Hybrid
        startDate: "JAN 2023", // Use "Month Year" format for accurate calculation
        endDate: "APR 2023",   // Use "Present" if currently working here
        description: [
          "Design Social Media Post for all the local clients.",
          "Design Printing Media Like ID Card, Banner, Stickers and other Other Necessary Printing Media.",
          "Re-designed Logo of Arya Digital Production.",
          "Designed Logo for local clients as per their need and Design Guideline."
         ]
      },
        {
    id: 1,
    company: "Swastik Design & Printing Suppliers",
    logo: "https://ui-avatars.com/api/?name=HC&background=2563eb&color=fff", // Put your image link here
    location: "CHARDOBATO NAYA THIMI, BHAKTAPUR",
    // Group all roles you had in this specific company here:
    roles: [
      {
        title: "Graphic Designer",
        workType: "On-site", // Remote, On-site, Hybrid
        startDate: "JAN 2021", // Use "Month Year" format for accurate calculation
        endDate: "JAN 2023",   // Use "Present" if currently working here
        description: [
         "Design all kinds of printing material",
         "Designed high-quality print materials for corporate events including flex designs, brochures, ID Card, Books and Books Cover.",
         "Designed product packaging implementing company's guidance."
        ]
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
