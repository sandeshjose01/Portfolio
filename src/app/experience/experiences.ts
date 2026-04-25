// --- TYPES (Updated to match LinkedIn Grouping Structure) ---
export interface Role {
  title: string;
  workType: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Experience {
  id: number;
  company: string;
  logo?: string;
  location: string;
  roles: Role[];
}

export interface Recommendation {
  id: number;
  name: string;
  designation: string;
  image?: string;
  text: string;
}

// --- 1. PERSONAL INFORMATION ---
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
  hobbies: ["Designing", "Playing Game", "Watching Anime", "Research & Learn New Graphic Trend", "Creating Cool Graphics", "Photography"],
  education: [
    {
      degree: "Bachelor of Business Studies",
      year: "2021",
      school: "Bhaktapur Multiple Campus, Bhaktapur",
      details: "Focused Primarily on Providing a Strong Theoretical Foundation in Business Principles while Fostering Critical Thinking, Research Skills, and a Comprehensive understanding of Business Operations."
    }
  ],
  skills: ["Adobe Creative Suite", "Adobe Photoshop", "Adobe Illustrator", "Adobe Indesign", "Adobe Premiere Pro", "Adobe After Effect", "Canva", "Branding"]
};

// --- 2. WORK EXPERIENCE (Corrected Structure) ---
export const experiencesData: Experience[] = [
  {
    id: 5,
    company: "Himalayan Cordyceps",
    logo: "https://ui-avatars.com/api/?name=HC&background=2563eb&color=fff",
    location: "Boudha, Kathmandu",
    roles: [
      {
        title: "Creative Graphic Designer",
        workType: "On-site",
        startDate: "May 2025",
        endDate: "Apr 2026",
        description: [
          "Edited VOX Style Documentary Video using tools like Adobe Premier Pro, Adobe After Effects.",
          "Designed Banners for Different Events.",
          "Designed Social Media Post Using AI, Photo Manipulation, Creative Idea and tools like Adobe Photoshop, Adobe Illustrator."
        ]
      },
      {
        title: "Graphic Designer",
        workType: "On-site",
        startDate: "Apr 2025",
        endDate: "May 2025",
        description: [
          "Designed Social Media Post as per the Company Guidance and the Color Scheme",
          "Manipulated Photo as per the need."
        ]
      }
    ]
  },
  {
    id: 4,
    company: "Everest Canvas",
    logo: "https://ui-avatars.com/api/?name=EC&background=0f172a&color=fff",
    location: "Chardobato Naya Thimi, Bhaktapur",
    roles: [
      {
        title: "Graphic Designer",
        workType: "On-site",
        startDate: "Jan 2025",
        endDate: "Apr 2025",
        description: [
          "Designed Multiple Types Canvas available in Market.",
          "Manipulated Clients Photo like Changing Background, Background Blur, Turning Ordinary Photo into Professional Shoot Photo.",
          "Restored Old Small Photo into High Quality Photo.",
          "Designed Different Kinds of Banner like Sliding Banner, Standee Banners, Event Banner, Shop Board Banner."
        ]
      }
    ]
  },
  {
    id: 3,
    company: "Catalyst Advertising Pvt. Ltd.",
    logo: "https://ui-avatars.com/api/?name=CA&background=f59e0b&color=fff",
    location: "Khumaltar Height, Lalitpur",
    roles: [
      {
        title: "Client Services Executive",
        workType: "On-site",
        startDate: "Apr 2023",
        endDate: "Jan 2024",
        description: [
          "Built and nurtured strong client relationships, ensuring exceptional service and satisfaction.",
          "Acted as a trusted advisor, proactively identifying and resolving client needs.",
          "Effectively communicated with clients across all channels."
        ]
      }
    ]
  },
  {
    id: 2,
    company: "Arya Digital Production",
    logo: "https://ui-avatars.com/api/?name=AD&background=ef4444&color=fff",
    location: "New Baneshwor, Kathmandu",
    roles: [
      {
        title: "Graphic Designer",
        workType: "On-site",
        startDate: "Jan 2023",
        endDate: "Apr 2023",
        description: [
          "Design Social Media Post for all the local clients.",
          "Design Printing Media Like ID Card, Banner, Stickers.",
          "Re-designed Logo of Arya Digital Production."
        ]
      }
    ]
  },
  {
    id: 1,
    company: "Swastik Design & Printing Suppliers",
    logo: "https://ui-avatars.com/api/?name=SD&background=10b981&color=fff",
    location: "Chardobato Naya Thimi, Bhaktapur",
    roles: [
      {
        title: "Graphic Designer",
        workType: "On-site",
        startDate: "Jan 2021",
        endDate: "Jan 2023",
        description: [
          "Design all kinds of printing material",
          "Designed high-quality print materials for corporate events including flex designs, brochures, ID Card.",
          "Designed product packaging implementing company's guidance."
        ]
      }
    ]
  }
];

// --- 3. RECOMMENDATIONS ---
export const recommendations: Recommendation[] = [
  {
    id: 1,
    name: "Ram Bhandari",
    designation: "Founder CEO at KARYA TECHNOLOGY",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGqpR1PCuPhQg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1666509025640?e=1778716800&v=beta&t=Cod06O6yhVzqg9JdewwK88G1uKNueUdjrMJLX9Uwc78",
    text: `I had the opportunity to work closely with Sandesh Joshi during my tenure as Chief Digital Officer at 
          Himalayan Cordyceps, where he was responsible for executing creative ideation into impactful visual 
          outputs.
          
          Sandesh demonstrated strong proficiency in Adobe Creative Cloud tools, particularly Illustrator and 
          Photoshop, consistently delivering high-quality creatives that aligned with our premium brand 
          positioning. His ability to transform conceptual ideas into visually compelling designs played a crucial 
          role in enhancing our digital presence and marketing effectiveness.
          
          Beyond his technical skills, Sandesh showed a keen understanding of branding and visual storytelling. He 
          was detail-oriented, responsive to feedback, and committed to maintaining consistency across all 
          creative assets.
          
          I would confidently recommend Sandesh to any organization looking for a creative professional who 
          combines design expertise with a clear understanding of business and brand objectives.`
  }
];
