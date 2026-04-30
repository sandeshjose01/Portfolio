import logo from "../../public/portfolioLogo.png";
import Image from "next/image";

const HeroImage = () => {
  return (
    <>
      <Image
        src={adminUrl || "/portfolioLogo.png"} 
        alt="Hero"
  // ... keep your other attributes like width/height
        loading="eager"
        priority
        height={1000}
        width={1000}
      />
    </>
  );
};
export default HeroImage;
