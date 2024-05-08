import React from "react";
import { Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const ExerciseCounter = () => {

  return (
    <div className=" text-surface-light">
      <div
        className="relative mt-8 h-72 w-full overflow-hidden rounded-xl "
        style={{
          backgroundImage: "url('../../../public/img/ai_trainer.jpg')",
          backgroundPosition: "center 43%",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 h-full w-full" />
      </div>
      <Card className="mx-3 -mt-32 md:-mt-28 mb-6 lg:mx-4 bg-surface-darkest flex flex-col items-center justify-center p-4">
        {/* <img src="../../../public/img/ai_trainer.jpg" alt="biceps" className="w-[640px] h-[480px]" /> */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className=" min-h-[15rem] w-[18rem] rounded-xl overflow-hidden transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105 bg-[#0b6e4f] flex flex-col items-center justify-center  cursor-pointer">
            <img
              src="../../../public/img/shoulder_press.png"
              alt="biceps"
              className="w-28 h-24"
            />
            <p className="text-white font-bold text-lg">Shoulder Press</p>
          </div>
          <div className="min-h-[15rem] w-[18rem] rounded-xl overflow-hidden transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105 bg-[#0b6e4f] flex flex-col items-center justify-center  cursor-pointer">
            <img
              src="../../../public/img/squat.png"
              alt="biceps"
              className="w-28 h-24"
            />
            <p className="text-white font-bold text-lg">Squat</p>
          </div>
          <Link to="biceps-counter">
            <div className="min-h-[15rem] w-[18rem] rounded-xl overflow-hidden transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105 bg-[#0b6e4f] flex flex-col items-center justify-center  cursor-pointer">
              <img
                src="../../../public/img/biceps_curl.png"
                alt="biceps"
                className="w-28 h-24"
              />
              <p className="text-white font-bold text-lg">Biceps Curl</p>
            </div>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ExerciseCounter;
