import { exec } from "child_process";
import fs from "fs";

export function restoreDatabase(filePath) {
  const dbName = "amel";
  const user = "root";
  const password = "admin";

  if (!fs.existsSync(filePath)) {
    console.error("❌ Backup file not found:", filePath);
    return;
  }

  const command = `mysql -u${user} -p${password} ${dbName} < "${filePath}"`;

  exec(command, (error) => {
    if (error) {
      console.error("❌ Restore failed:", error.message);
    } else {
      console.log("✅ Database restored successfully:", filePath);
    }
  });
}
