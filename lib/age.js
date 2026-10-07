/**
 * Fonctions utilitaires pour le calcul et le formatage automatique de l'âge d'un patient.
 */

/**
 * Calcule l'âge textuel sous forme médicale à partir de la date de naissance
 * @param {string|Date} dateNaissance - Date de naissance du patient
 * @param {string|Date} [atDate=new Date()] - Date de référence (date de mesure ou aujourd'hui)
 * @returns {string} Âge formaté (ex: "15 jours", "4 mois", "1 an", "2 ans", "2 ans 6 mois")
 */
export function calculateAge(dateNaissance, atDate = new Date()) {
  if (!dateNaissance) return "";

  const birthDate = new Date(dateNaissance);
  const targetDate = new Date(atDate);

  if (isNaN(birthDate.getTime()) || isNaN(targetDate.getTime())) {
    return "";
  }

  const diffMs = targetDate.getTime() - birthDate.getTime();
  if (diffMs < 0) return "0 jour";

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30.44);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffDays < 30) {
    return `${diffDays} jour${diffDays > 1 ? "s" : ""}`;
  } else if (diffMonths < 24) {
    return `${diffMonths} mois`;
  } else {
    const remainingMonths = diffMonths % 12;
    if (remainingMonths === 0) {
      return `${diffYears} an${diffYears > 1 ? "s" : ""}`;
    }
    return `${diffYears} an${diffYears > 1 ? "s" : ""} ${remainingMonths} mois`;
  }
}

/**
 * Calcule l'âge numérique en mois pour le positionnement sur l'axe X des courbes de croissance (Recharts)
 * @param {string|Date} dateNaissance - Date de naissance du patient
 * @param {string|Date} [atDate=new Date()] - Date de référence
 * @returns {number} Nombre de mois écoulés (ex: 0, 1, 2, 12, 24...)
 */
export default {
  calculateAge,
};
