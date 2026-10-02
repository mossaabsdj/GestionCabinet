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
export function calculateAgeInMonths(dateNaissance, atDate = new Date()) {
  if (!dateNaissance) return 0;

  const birth = new Date(dateNaissance);
  const target = new Date(atDate);

  if (isNaN(birth.getTime()) || isNaN(target.getTime())) return 0;

  const years = target.getFullYear() - birth.getFullYear();
  const months = target.getMonth() - birth.getMonth();
  const totalMonths = years * 12 + months;

  return Math.max(0, totalMonths);
}

/**
 * Retourne la liste standard des paliers d'âges pédiatriques pour le sélecteur d'âge
 * @returns {string[]} Liste des options d'âge
 */
export function getPediatricAgeOptions() {
  return [
    "0 jour (Naissance)",
    "3 jours",
    "7 jours",
    "15 jours",
    "21 jours",
    "1 mois",
    "2 mois",
    "3 mois",
    "4 mois",
    "5 mois",
    "6 mois",
    "7 mois",
    "8 mois",
    "9 mois",
    "10 mois",
    "11 mois",
    "12 mois (1 an)",
    "13 mois",
    "14 mois",
    "15 mois",
    "16 mois",
    "17 mois",
    "18 mois (1 an 6 mois)",
    "19 mois",
    "20 mois",
    "21 mois",
    "22 mois",
    "23 mois",
    "2 ans",
    "2 ans 3 mois",
    "2 ans 6 mois",
    "2 ans 9 mois",
    "3 ans",
    "3 ans 3 mois",
    "3 ans 6 mois",
    "3 ans 9 mois",
    "4 ans",
    "4 ans 6 mois",
    "5 ans",
    "5 ans 6 mois",
    "6 ans",
    "7 ans",
    "8 ans",
    "9 ans",
    "10 ans",
    "11 ans",
    "12 ans",
    "13 ans",
    "14 ans",
    "15 ans",
    "16 ans",
    "17 ans",
    "18 ans",
  ];
}

/**
 * Convertit une chaîne d'âge en nombre de mois pour les graphiques
 * @param {string} ageStr - ex: "2 ans 6 mois", "4 mois", "15 jours"
 * @param {string|Date} [dateNaissance]
 * @param {string|Date} [atDate]
 * @returns {number}
 */
export function convertAgeToMonths(ageStr, dateNaissance = null, atDate = null) {
  if (!ageStr && dateNaissance && atDate) {
    return calculateAgeInMonths(dateNaissance, atDate);
  }
  if (!ageStr) return 0;

  const normalized = ageStr.toLowerCase().trim();

  // Pattern "X an(s) Y mois"
  const yearsMonthsMatch = normalized.match(/(\d+)\s*an[s]?\s*(\d+)\s*mois/);
  if (yearsMonthsMatch) {
    return parseInt(yearsMonthsMatch[1]) * 12 + parseInt(yearsMonthsMatch[2]);
  }

  // Pattern "X an(s)"
  const yearsMatch = normalized.match(/(\d+)\s*an[s]?/);
  if (yearsMatch) {
    return parseInt(yearsMatch[1]) * 12;
  }

  // Pattern "X mois"
  const monthsMatch = normalized.match(/(\d+)\s*mois/);
  if (monthsMatch) {
    return parseInt(monthsMatch[1]);
  }

  // Pattern "X jour(s)"
  const daysMatch = normalized.match(/(\d+)\s*jour[s]?/);
  if (daysMatch) {
    return Math.round(parseInt(daysMatch[1]) / 30.44 * 10) / 10;
  }

  if (dateNaissance && atDate) {
    return calculateAgeInMonths(dateNaissance, atDate);
  }

  return 0;
}

export default {
  calculateAge,
  calculateAgeInMonths,
  getPediatricAgeOptions,
  convertAgeToMonths,
};
