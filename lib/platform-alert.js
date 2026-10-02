import Swal from "sweetalert2";

/**
 * Checks if the current environment is running inside the Electron Desktop App.
 * @returns {boolean}
 */
export function isElectron() {
  if (typeof window === "undefined") return false;
  return Boolean(
    window.electron ||
    window.electronAPI ||
    (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes("electron"))
  );
}

/**
 * Displays a sleek user-friendly alert when a feature requires the Electron Desktop application
 * and is accessed in standard Web preview mode.
 * 
 * @param {string} featureName - The name of the desktop feature (e.g. "Numérisation Scanner Direct", "Impression Directe")
 * @param {string} details - Optional extra guidance
 */
export function showWebDemoNotice(
  featureName = "Cette fonctionnalité matérielle",
  details = "Cette fonction n'est pas disponible dans cette version d'essai Web car elle nécessite l'application installée sur votre ordinateur (Electron)."
) {
  if (typeof window === "undefined") return;

  try {
    Swal.fire({
      icon: "info",
      title: "Version d'essai Web",
      html: `
        <div class="text-left space-y-2 text-sm text-gray-600">
          <p class="font-semibold text-gray-800 text-base">
            ⚠️ <span class="text-[var(--color-700,#0284c7)]">${featureName}</span>
          </p>
          <p>${details}</p>
          <div class="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
            💡 <strong>Note :</strong> Toutes les données cliniques, ordonnances, bilans et calculs sont 100% fonctionnels en mode Web.
          </div>
        </div>
      `,
      confirmButtonText: "Compris",
      confirmButtonColor: "var(--color-600, #0284c7)",
      customClass: {
        popup: "rounded-2xl shadow-2xl",
        confirmButton: "rounded-xl px-6 py-2.5 font-medium",
      },
    });
  } catch (e) {
    alert(`${featureName} : ${details}`);
  }
}

export default {
  isElectron,
  showWebDemoNotice,
};
