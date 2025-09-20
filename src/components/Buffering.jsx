import React, { useEffect, useState } from "react";
import morningVideo from "../assets/MORNING.mp4";
import compostVideo from "../assets/COMPOST.mp4";
import mulchingVideo from "../assets/Crop_Burning_vs_Mulching_Video_Comparison.mp4";

// Carousel videos and tips (using local assets)
const carouselData = [
  {
    video: morningVideo,
    tip: "Water early in the morning to reduce evaporation and disease risk.",
  },
  {
    video: compostVideo,
    tip: "Use organic compost to enrich your soil naturally.",
  },
  {
    video: mulchingVideo,
    tip: "Mulch your crops to retain moisture and suppress weeds.",
  },
];

const Buffering = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % carouselData.length);
        setFade(true);
      }, 400); // fade out before switching
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl flex flex-col items-center relative">
        {/* Title */}
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center tracking-wider">
          Sprout
        </h2>
        {/* Analysing Text */}
        <div className="mb-2 text-green-800 font-semibold text-lg tracking-wide animate-pulse">
          Analysing...
        </div>
        {/* Carousel */}
        <div className="w-[22rem] h-56 md:w-[38rem] md:h-72 rounded-xl overflow-hidden shadow mb-4 flex items-center justify-center bg-gray-100">
          <video
            src={carouselData[index].video}
            className={`object-cover w-full h-full transition-opacity duration-400 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
            key={carouselData[index].video}
            autoPlay
            loop
            muted
            playsInline
            style={{ aspectRatio: "16/9", minWidth: 0, minHeight: 0 }}
          />
        </div>
        {/* Dots */}
        <div className="flex gap-2 mb-4">
          {carouselData.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-green-600" : "bg-green-200"
              }`}
            />
          ))}
        </div>
        {/* Tip */}
        <div className="text-center text-green-900 font-medium text-base min-h-[48px] flex items-center justify-center">
          {carouselData[index].tip}
        </div>
        {/* Optional: Loading spinner below */}
        <div className="mt-6 flex justify-center">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Buffering;
