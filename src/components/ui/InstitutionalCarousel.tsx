"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/images/institutional/muniConvencion.png", alt: "Muni Convención" },
  { src: "/images/institutional/quillaban.png", alt: "Quillabamba" },
  { src: "/images/institutional/Region.png", alt: "Región" },
  { src: "/images/institutional/Uac.png", alt: "UAC" },
  { src: "/images/institutional/UC.png", alt: "UC" },
  { src: "/images/institutional/UniT.png", alt: "UniT" },
  { src: "/images/institutional/UNIunsaac.png", alt: "UNSAAC" },
];

// We double the logos array so that the marquee can loop seamlessly
const doubledLogos = [...logos, ...logos, ...logos, ...logos];

export function InstitutionalCarousel() {
  return (
    <div className="w-full overflow-hidden py-8 sm:py-12 bg-white">
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 px-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight uppercase text-brand-text">
          Ecosistema Institucional
        </h2>
        <div className="w-14 h-1 mt-3 mb-4 mx-auto bg-brand-primary"></div>
        <p className="text-sm sm:text-base leading-relaxed text-gray-600">
          Nuestra red de respaldo académico y regional. Un proyecto impulsado por el talento formado en las principales instituciones de nuestra región.
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col items-center group">
        {/* Gradients to fade the edges smoothly */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        <motion.div 
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {doubledLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[180px] sm:w-[240px] md:w-[280px] mx-10 sm:mx-20 flex items-center justify-center transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={280}
                height={140}
                className="w-full h-auto object-contain max-h-[120px] sm:max-h-[140px] filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
