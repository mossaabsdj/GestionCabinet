const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { fork } = require("child_process");
const { exec } = require("child_process");
const shell = require("electron");
const { Menu } = require("electron");
const { backupDatabase } = require("./backup");
const { restoreDatabase } = require("./restore");
let mainWindow;
let splashWindow;
let serverProcess;

function createSplashScreen() {
  splashWindow = new BrowserWindow({
    width: 500,
    height: 400,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    center: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const splashHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', 'Roboto', sans-serif;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
          }
          
          .splash-container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
            text-align: center;
            width: 500px;
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
          }
          
          .splash-container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 3s ease-in-out infinite;
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          
          .content {
            position: relative;
            z-index: 1;
          }
          
          .icon {
            width: 100px;
            height: 100px;
            background: white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: bounce 2s ease-in-out infinite;
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .icon svg {
            width: 60px;
            height: 60px;
            fill: #764ba2;
          }
          
          h1 {
            color: white;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.2);
          }
          
          .subtitle {
            color: rgba(255,255,255,0.95);
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 35px;
          }
          
          .loader {
            width: 200px;
            height: 6px;
            background: rgba(255,255,255,0.2);
            border-radius: 10px;
            overflow: hidden;
            margin: 0 auto;
          }
          
          .loader-bar {
            height: 100%;
            background: white;
            border-radius: 10px;
            animation: loading 2s ease-in-out infinite;
            box-shadow: 0 0 15px rgba(255,255,255,0.5);
          }
          
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          
          .version {
            color: rgba(255,255,255,0.7);
            font-size: 12px;
            margin-top: 20px;
            font-weight: 400;
          }
        </style>
      </head>
      <body>
        <div class="splash-container">
          <div class="content">
            <div class="icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <h1>Dr. Amel</h1>
            <div class="subtitle">Pédiatre</div>
            <div class="loader">
              <div class="loader-bar"></div>
            </div>
            <div class="version">Version 1.0.0</div>
          </div>
        </div>
      </body>
    </html>
  `;

  splashWindow.loadURL(
    "data:text/html;charset=utf-8," + encodeURIComponent(splashHtml)
  );

  splashWindow.on("closed", () => {
    splashWindow = null;
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: false,
    resizable: true,
    show: false, // Don't show until ready
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
  });

  // Wait until the server starts before loading the Electron window
  const serverUrl = "http://localhost:3000";
  const checkServer = setInterval(() => {
    fetch(serverUrl)
      .then(() => {
        clearInterval(checkServer);
        mainWindow.loadURL(serverUrl);
      })
      .catch(() => console.log("Waiting for server..."));
  }, 1000);

  // Show main window and close splash when ready
  mainWindow.once("ready-to-show", () => {
    setTimeout(() => {
      if (splashWindow) {
        splashWindow.close();
      }
      mainWindow.show();
      mainWindow.maximize();
    }, 2000); // Show splash for at least 2 seconds
  });
}

function createMenu() {
  const template = [
    {
      label: "➕ Add Product",
      click: () => {
        const addProductWin = new BrowserWindow({
          width: 1080,
          height: 720,
          resizable: false,
          parent: mainWindow,
          modal: true,
          autoHideMenuBar: true,
          backgroundColor: "#f4f6f9",
          frame: true,
          webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
          },
        });

        addProductWin.center();

        addProductWin.webContents.on("did-finish-load", () => {
          addProductWin.webContents.insertCSS(`
          body {
            font-family: "Segoe UI", "Roboto", sans-serif;
            font-weight: 600;
            background-color: #f4f6f9;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          h1, h2, h3, label {
            font-weight: 600;
            color: #222;
          }
          button {
            background: #0078d7;
            border: none;
            color: white;
            padding: 10px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.3s;
          }
          button:hover {
            background: #005fa3;
          }
        `);
        });

        addProductWin.loadURL(
          "http://localhost:3000/Produits/NewProduits/electronWindow"
        );
      },
    },
    {
      label: "View",
      submenu: [{ role: "reload" }, { role: "toggledevtools" }],
    },
    {
      label: "🚪 Exit",
      click: () => app.quit(),
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  // Show splash screen first
  createSplashScreen();

  // Start Next.js server
  const serverScript = path.join(__dirname, "server.js");
  serverProcess = fork(serverScript);

  // Create main window (hidden initially)
  createWindow();

  // Create menu
  createMenu();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
  if (serverProcess) {
    serverProcess.kill();
  }
});

// Print handlers

ipcMain.handle("get-app-path", () => {
  return path.dirname(path.dirname(app.getAppPath()));
});
ipcMain.on("printOrdonnance", (event, data) => {
  const { id, items = [] } = data;

  const printWindow = new BrowserWindow({
    show: true,
    width: 1000,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true },
  });

  // Generate medicines list
  const medListHtml = items
    .map(
      (m, i) => `
      <div class="med-item">
        <div class="med-name">${i + 1}. ${m.name || ""} ${m.dosage || ""}</div>
        <div class="med-details">
          ${m.frequency || ""}${m.duration ? " • " + m.duration : ""}
          ${
            m.quantity
              ? ` • ${m.quantity} boîte${m.quantity > 1 ? "s" : ""}`
              : ""
          }
        </div>
      </div>`
    )
    .join("");

  const printHtml = `
  <html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <style>
      @page {
        size: A4 landscape;
        margin: 0;
      }

      html, body {
        margin: 0;
        padding: 0;
        width: 29.7cm;
        height: 21cm;
        background: white;
      }

      /* Ordonnance box on left half */
      .ord-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 14.85cm;     /* half of A4 width */
        height: 21cm;       /* full height */
        border: 2px solid #000;
        box-sizing: border-box;
        padding: 0.8cm;
      }

      .ord-header {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #000;
        padding-bottom: 5px;
      }

      .ord-left, .ord-right {
        width: 45%;
        font-size: 14px;
        line-height: 1.4;
      }

      .ord-right { text-align: right; direction: rtl; }

      .ord-num { font-size: 13px; margin-top: 4px; }

      .ord-patient {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
      }

      .ord-title {
        text-align: center;
        font-weight: bold;
        font-size: 22px;
        margin-top: 10px;
        text-decoration: underline;
      }

      .ord-body {
        margin-top: 15px;
        font-size: 17px;
        line-height: 1.8;
      }

      .med-item { margin-bottom: 10px; }

      .med-name {
        font-weight: 700;
        font-size: 18px;
      }

      .med-details {
        margin-left: 15px;
        font-size: 16px;
        color: #333;
      }

      .ord-footer {
        text-align: right;
        margin-top: 10px;
        font-size: 15px;
        border-top: 1px dashed #000;
        padding-top: 6px;
      }
    </style>
  </head>

  <body>
    <div class="ord-container">
      <div class="ord-header">
        <div class="ord-left">
          <strong>Dr DIB Amel</strong><br/>
          Médecin Spécialiste en Pédiatrie et néonatologie<br/>
          <strong>Adresse :</strong> Rue Frères KAFI logts 38, 1er étage<br/>
          El-Harrouch SKIKDA<br/>
          <strong>Tél :</strong> 0652 76 89 72/ 0562 24 40 87
        </div>
        <div class="ord-right">
          <strong>د. ديب آمال</strong><br/>
          طبيبة مختصة في طب الأطفال و حديثي الولادة<br/>
          <strong>العنوان :</strong> شارع الإخوة كافي عقار 38 الطابق الأول<br/>
          (بزاز لعلاوي) الحروش - سكيكدة
        </div>
      </div>

      <div class="ord-num">N° d’ordonnance : ${id}</div>

      <div class="ord-patient">
        <span><strong>Nom :</strong> .......................</span>
        <span><strong>Prénom :</strong> .......................</span>
        <span><strong>Âge :</strong> ............</span>
        <span><strong>Le :</strong> ${new Date().toLocaleDateString(
          "fr-FR"
        )}</span>
      </div>

      <div class="ord-title">ORDONNANCE</div>

      <div class="ord-body">
        ${medListHtml}
      </div>

      <div class="ord-footer">
        <em>Signature et cachet du médecin</em>
      </div>
    </div>
  </body>
  </html>
  `;

  printWindow.loadURL(
    "data:text/html;charset=utf-8," + encodeURIComponent(printHtml)
  );

  // Print in landscape, left half only
  printWindow.webContents.on("did-finish-load", () => {
    setTimeout(() => {
      printWindow.webContents.print(
        {
          silent: false,
          printBackground: true,
          margins: { marginType: "none" },
          pageSize: {
            name: "A4",
            width: 297000, // 29.7 cm
            height: 210000, // 21 cm
          },
          landscape: true,
        },
        (success, failureReason) => {
          if (success)
            console.log(
              "🖨️ Ordonnance printed successfully (Landscape left half)"
            );
          else console.error("❌ Print failed:", failureReason);
          printWindow.close();
        }
      );
    }, 500);
  });
});

ipcMain.on("printBilan", (event, data) => {
  const { id, items = [] } = data;

  const printWindow = new BrowserWindow({
    show: true,
    width: 1000,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true },
  });

  // Generate list of analyses/exams
  const bilanListHtml = items
    .map(
      (b, i) => `
        <div class="bilan-item">
          <div class="bilan-name">${i + 1}. ${b.nom || b.name || ""}</div>
        </div>`
    )
    .join("");

  const printHtml = `
  <html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <style>
      @page {
        size: A4 landscape;
        margin: 0;
      }

      html, body {
        margin: 0;
        padding: 0;
        width: 29.7cm;
        height: 21cm;
        background: white;
      }

      .ord-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 14.85cm; /* left half of A4 */
        height: 21cm;   /* full height */
        border: 2px solid #000;
        box-sizing: border-box;
        padding: 0.8cm;
      }

      .ord-header {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #000;
        padding-bottom: 5px;
      }

      .ord-left, .ord-right {
        width: 45%;
        font-size: 14px;
        line-height: 1.4;
      }

      .ord-right { text-align: right; direction: rtl; }

      .ord-num {
        font-size: 14px;
        margin-top: 8px;
        font-weight: 600;
      }

      .ord-patient {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
      }

      .ord-title {
        text-align: center;
        font-weight: bold;
        font-size: 22px;
        margin-top: 14px;
        text-decoration: underline;
      }

      .ord-body {
        margin-top: 20px;
        font-size: 17px;
        line-height: 1.8;
      }

      .bilan-item {
        margin-bottom: 8px;
        font-size: 17px;
      }

      .bilan-name {
        font-weight: 600;
      }

      .ord-footer {
        position: absolute;
        bottom: 1.5cm;
        right: 0.8cm;
        width: calc(100% - 1.6cm);
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 15px;
        border-top: 1px dashed #000;
        padding-top: 6px;
      }

      .ord-date {
        text-align: right;
        font-size: 14px;
        color: #333;
      }
    </style>
  </head>

  <body>
    <div class="ord-container">
      <div class="ord-header">
        <div class="ord-left">
          <strong>Dr DIB Amel</strong><br/>
          Médecin Spécialiste en Pédiatrie et néonatologie<br/>
          <strong>Adresse :</strong> Rue Frères KAFI logts 38, 1er étage<br/>
          El-Harrouch SKIKDA<br/>
          <strong>Tél :</strong> 0652 76 89 / 0562 24 40 87
        </div>

        <div class="ord-right">
          <strong>د. ديب آمال</strong><br/>
          طبيبة مختصة في طب الأطفال و حديثي الولادة<br/>
          <strong>العنوان :</strong> شارع الإخوة كافي عقار 38 الطابق الأول<br/>
          (بزاز لعلاوي) الحروش - سكيكدة
        </div>
      </div>

      <div class="ord-num">N° de Bilan : ${id}</div>

      <div class="ord-patient">
        <span><strong>Nom :</strong> .......................</span>
        <span><strong>Prénom :</strong> .......................</span>
        <span><strong>Âge :</strong> ............</span>
      </div>

      <div class="ord-title">BILAN</div>

      <div class="ord-body">
        ${bilanListHtml}
      </div>

      <div class="ord-footer">
        <em>Signature et cachet du médecin</em>
        <div class="ord-date">
          Le : ${new Date().toLocaleDateString("fr-FR")}
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  printWindow.loadURL(
    "data:text/html;charset=utf-8," + encodeURIComponent(printHtml)
  );

  printWindow.webContents.on("did-finish-load", () => {
    setTimeout(() => {
      printWindow.webContents.print(
        {
          silent: false,
          printBackground: true,
          margins: { marginType: "none" },
          pageSize: {
            name: "A4",
            width: 297000, // 29.7 cm
            height: 210000, // 21 cm
          },
          landscape: true,
        },
        (success, failureReason) => {
          if (success)
            console.log("🖨️ Bilan printed successfully (Landscape left half)");
          else console.error("❌ Print failed:", failureReason);
          printWindow.close();
        }
      );
    }, 500);
  });
});

ipcMain.handle("backup-database", async () => {
  backupDatabase();
});
ipcMain.handle("restore-database", async () => {
  // Let the user select a .sql file
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "Choisir un fichier de sauvegarde",
    filters: [{ name: "SQL Files", extensions: ["sql"] }],
    properties: ["openFile"],
  });

  if (canceled || filePaths.length === 0)
    return { success: false, message: "Aucun fichier sélectionné" };

  const filePath = filePaths[0];
  console.log("🗂 Selected backup file:", filePath);
  restoreDatabase(filePath);
  return { success: true, message: "Restauration démarrée" };
});
ipcMain.handle("open-file", async (event, filePath) => {
  await shell.openPath(filePath);
});
