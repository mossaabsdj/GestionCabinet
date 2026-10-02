const fs = require("fs");
const path = require("path");

async function backupDatabase(targetFilePath = null) {
  try {
    const backupDir = path.join(process.cwd(), "backups");
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const defaultPath = path.join(backupDir, `backup_amel_${timestamp}.json`);
    const filePath = targetFilePath || defaultPath;

    const res = await fetch("http://localhost:3000/api/backup");
    if (!res.ok) {
      throw new Error(`API backup returned status ${res.status}`);
    }

    const data = await res.json();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log("✅ JSON Backup saved successfully to:", filePath);
    return { success: true, filePath };
  } catch (error) {
    console.error("❌ Backup failed:", error.message);
    throw error;
  }
}

module.exports = { backupDatabase };
