"use client";

import { Power } from "lucide-react";

export default function ExitButton() {
  const handleExit = () => {
    if (window?.electronAPI?.exit) {
      window.electronAPI.exit();
    } else {
      alert("Exit unavailable outside Electron.");
    }
  };

  return (
    <button
      onClick={handleExit}
      className="absolute top-3 right-3 flex items-center gap-2 px-4 py-2 
                 bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 
                 text-white rounded-full shadow-xl hover:shadow-2xl 
                 hover:brightness-110 hover:scale-105 active:scale-95 
                 transition-all duration-200"
      title="Quit Application"
    >
      <Power size={18} />
      Exit
    </button>
  );
}

