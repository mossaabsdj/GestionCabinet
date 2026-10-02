const fs = require("fs");

async function restoreDatabase(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Le fichier de sauvegarde n'existe pas : ${filePath}`);
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(content);

    const res = await fetch("http://localhost:3000/api/restore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || "Erreur de restauration via l'API");
    }

    console.log("✅ Database restored successfully from:", filePath);
    return { success: true, message: result.message };
  } catch (error) {
    console.error("❌ Restore failed:", error.message);
    throw error;
  }
}

module.exports = { restoreDatabase };
