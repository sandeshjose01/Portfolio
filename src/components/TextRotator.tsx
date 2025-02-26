import React from "react";

function TextRotator() {
  return (
    <div className="py-4  rounded-md flex flex-col justify-center items-center overflow-hidden">
      <div className="font-poppins text-base sm:text-2xl [text-wrap:balance] text-gray-700">
        I am a Graphic Designer &
        <span className="inline-flex ml-1 flex-col h-[calc(theme(fontSize.lg)*theme(lineHeight.tight))] sm:h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] overflow-hidden">
          <ul className="block text-left font-rubik text-lg sm:text-3xl leading-tight [&_li]:block animate-text-slide">
            <li className="text-[#2f7df4]">Freelancer</li>
            <li className="text-[#2f7df4]">Gamer</li>
            <li className="text-[#2f7df4]">Creator</li>
            <li className="text-[#2f7df4]">Student</li>
            <li className="text-[#2f7df4]">Contributor</li>
            <li className="text-[#2f7df4]">Teacher</li>
          </ul>
        </span>
      </div>
    </div>
  );
}

export default TextRotator;
