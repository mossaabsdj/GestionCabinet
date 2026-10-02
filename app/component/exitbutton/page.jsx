"use client";

import { Power } from "lucide-react";
import { isElectron, showWebDemoNotice } from "@/lib/platform-alert";
import Swal from "sweetalert2";

export default function ExitButton() {
  const handleExit = () => {
    if (isElectron()) {
      if (window.electron?.exit) window.electron.exit();
      else if (window.electronAPI?.exit) window.electronAPI.exit();
    } else {
      Swal.fire({
        icon: "question",
        title: "Quitter l'application",
        text: "En version Web, la fermeture directe du processus OS est gérée par votre navigateur. Souhaitez-vous fermer la session ou retourner à la présentation ?",
        showCancelButton: true,
        confirmButtonText: "Retour à l'accueil",
        cancelButtonText: "Rester ici",
        confirmButtonColor: "var(--color-600, #0284c7)",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });
    }
  };

  return (
    <button
      onClick={handleExit}
      className="absolute top-3 right-3 flex items-center gap-2 px-4 py-2 
                 bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 
                 text-white rounded-full shadow-xl hover:shadow-2xl 
                 hover:brightness-110 hover:scale-105 active:scale-95 
                 transition-all duration-200 z-50 cursor-pointer"
      title="Quitter l'application"
    >
      <Power size={18} />
      Quitter
    </button>
  );
}
