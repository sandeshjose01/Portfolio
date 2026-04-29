// Project path: src/components/HeroTexts.tsx
"use client";
import TextRotator from "./TextRotator";

// // text: Added props to receive data from the Firebase fetch in page.tsx
interface HeroTextsProps {
  staticRole?: string;
  roles?: string[];
}

const HeroTexts = ({ staticRole, roles }: HeroTextsProps) => {
  return (
    <>
      <h3 className="font-poppins text-2xl max-sm:text-xl text-white/70">
        {/* // text: You can change "My Name is" to staticRole from Admin if you prefer */}
        My Name is
      </h3>
      <h1 className="font-rubik text-8xl name_underline text-primary max-sm:text-6xl text-white">
        Sandesh <br /> Joshi .
      </h1>
      
      {/* // text: Passing the dynamic roles array to the rotator */}
      <TextRotator items={roles || []} />
    </>
  );
};

export default HeroTexts;
