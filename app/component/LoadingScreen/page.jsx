"use client";

import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import Image from "next/image";
import param from "@/param.json";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-[var(--color-900)]/50 text-white">
      {/* Flying & Pulsing Icon */}
      <motion.div
        animate={{ y: [0, 10, 0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="mb-6"
      >
        <HeartPulse
          size={60}
          className="text-[var(--color-300)] drop-shadow-lg"
        />
      </motion.div>

      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <Image src="/amel.png" alt="Cabinet Logo" width={60} height={60} />
        <h1 className="text-3xl font-extrabold tracking-wide">
          {param.title || param.doctorName || "Professeur"}
        </h1>
      </div>

      {/* Animated Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-8 text-sm tracking-widest text-[var(--color-200)] uppercase"
      >
        Loading...
      </motion.p>
    </div>
  );
}
