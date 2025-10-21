import { exec } from "child_process";
import path from "path";
import fs from "fs";

export function backupDatabase() {
  const dbName = "amel";
  const user = "root";
  const password = "admin";
  const backupDir = path.join(process.cwd(), "backups");

  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = path.join(backupDir, `backup_${dbName}_${timestamp}.sql`);

  const command = `mysqldump -u${user} -p${password} ${dbName} > "${backupFile}"`;

  exec(command, (error) => {
    if (error) {
      console.error("❌ Backup failed:", error.message);
    } else {
      console.log("✅ Backup successful:", backupFile);
    }
  });
}
