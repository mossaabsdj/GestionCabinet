"use client";

import * as XLSX from "xlsx";

/**
 * Helper to normalize name/nom from any object or string
 */
function extractNameFromRow(row) {
  if (!row) return "";
  if (typeof row === "string") return row.trim();
  if (typeof row === "number") return String(row).trim();

  // Common property keys across various exports and languages
  const possibleKeys = [
    "nom",
    "name",
    "NOM",
    "NAME",
    "Nom",
    "Name",
    "medicament",
    "Medicament",
    "MÉDICAMENT",
    "médicament",
    "bilan",
    "Bilan",
    "BILAN",
    "vaccin",
    "Vaccin",
    "vaccine",
    "Vaccine",
    "VACCIN",
    "libelle",
    "Libelle",
    "Libellé",
    "titre",
    "Titre",
    "title",
    "Title",
    "designation",
    "Designation",
  ];

  for (const key of possibleKeys) {
    if (
      row[key] !== undefined &&
      row[key] !== null &&
      String(row[key]).trim() !== ""
    ) {
      return String(row[key]).trim();
    }
  }

  // If none matched, check the first key in the object
  const keys = Object.keys(row);
  for (const k of keys) {
    // Ignore metadata keys like id, createdAt, updatedAt
    if (
      ["id", "createdAt", "updatedAt", "date", "created_at"].includes(
        k.toLowerCase(),
      )
    ) {
      continue;
    }
    const val = row[k];
    if (val !== undefined && val !== null && String(val).trim() !== "") {
      return String(val).trim();
    }
  }

  return "";
}

/**
 * Export data array to JSON file
 */
export function exportToJSON(data, filename = "export.json") {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], {
    type: "application/json;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export data array to Excel (.xlsx) file
 */
export function exportToExcel(
  data,
  filename = "export.xlsx",
  sheetName = "Données",
) {
  // Format data for Excel
  let formattedData = data;
  if (Array.isArray(data)) {
    formattedData = data.map((item) => {
      if (typeof item === "string") return { Nom: item };
      const row = {};
      if (item.nom || item.name) row["Nom"] = item.nom || item.name;
      if (item.createdAt) {
        row["Date de création"] = new Date(item.createdAt).toLocaleDateString(
          "fr-FR",
        );
      }
      return Object.keys(row).length > 0 ? row : item;
    });
  }

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filename);
}

/**
 * Import and parse JSON file into normalized items array
 */
export function importFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let parsed = JSON.parse(e.target.result);

        // Handle various JSON formats: { data: [...] }, { items: [...] }, or [...]
        let rawItems = [];
        if (Array.isArray(parsed)) {
          rawItems = parsed;
        } else if (parsed && Array.isArray(parsed.data)) {
          rawItems = parsed.data;
        } else if (parsed && Array.isArray(parsed.items)) {
          rawItems = parsed.items;
        } else if (typeof parsed === "object" && parsed !== null) {
          // Check if values in object contain an array
          const possibleArr = Object.values(parsed).find((v) =>
            Array.isArray(v),
          );
          if (possibleArr) rawItems = possibleArr;
          else rawItems = [parsed];
        }

        const normalized = [];
        const seen = new Set();

        for (const item of rawItems) {
          const name = extractNameFromRow(item);
          if (name && !seen.has(name.toLowerCase())) {
            seen.add(name.toLowerCase());
            normalized.push({
              nom: name,
              name: name,
              original: typeof item === "object" ? item : { nom: name },
            });
          }
        }

        resolve(normalized);
      } catch (err) {
        reject(new Error("Fichier JSON invalide : " + err.message));
      }
    };
    reader.onerror = () =>
      reject(new Error("Erreur de lecture du fichier JSON."));
    reader.readAsText(file, "utf-8");
  });
}

/**
 * Import and parse Excel (.xlsx, .xls, .csv) file into normalized items array
 */
export function importFromExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
          throw new Error("Aucune feuille trouvée dans le fichier Excel.");
        }
        const firstSheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(firstSheet, { defval: "" });

        const normalized = [];
        const seen = new Set();

        for (const row of rows) {
          const name = extractNameFromRow(row);
          if (name && !seen.has(name.toLowerCase())) {
            seen.add(name.toLowerCase());
            normalized.push({
              nom: name,
              name: name,
              original: row,
            });
          }
        }

        resolve(normalized);
      } catch (err) {
        reject(new Error("Fichier Excel invalide : " + err.message));
      }
    };
    reader.onerror = () =>
      reject(new Error("Erreur de lecture du fichier Excel."));
    reader.readAsArrayBuffer(file);
  });
}
