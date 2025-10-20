const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { fork } = require("child_process");
const { exec } = require("child_process");
const { Menu } = require("electron");

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
ipcMain.on("print-barcode", (event, data) => {
  console.log(data);

  let printWindow = new BrowserWindow({
    show: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  function subtotal(items) {
    return items.map(({ Sum }) => Sum).reduce((sum, i) => sum + i, 0);
  }

  const printHtml = `
  <html>
    <head>
      <style>
        body {
          font-family: 'Tahoma', 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          direction: ltr;
        }
        .ticket {
          width: 100%;
          padding: 0;
          box-sizing: border-box;
        }
        h1 {
          font-size: 2em; 
          text-align: center;
          margin-bottom: 10px;
        }
        .header {
          font-size: 1.8em;
          text-align: center;
          margin-bottom: 10px;
        }
        .separator {
          text-align: center;
          font-size: 1.5em;
          margin: 10px 0;
        }
        .date-client {
          font-size: 1.5em;
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding: 0 10px;
        }
        .items {
          font-size: 1.4em;
          margin-bottom: 10px;
          padding: 0 10px;
        }
        .item {
          padding: 5px 0;
          display: flex;
          justify-content: space-between;
        }
        .item span {
          text-align: center;
          width: 20%;
        }
        .total {
          font-weight: bold;
          font-size: 2em;
          padding-top: 10px;
          margin-top: 10px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="ticket">
        <div class="header">Library El-Badr Bariout</div>
        <div class="date-client">
          <div>${new Date().toLocaleDateString("en-US")}</div>
        </div>
        <div class="separator">- - - - - - - - - - - - - - - -</div>
        <div class="items">
          <div class="item">
            <span>No</span>
            <span>Product</span>
            <span>Price</span>
            <span>Qty</span>
            <span>Total</span>
          </div>
          ${data
            .map(
              (row, index) => `
                <div class="item">
                  <span>${index + 1}</span>
                  <span>${row.Nom}</span>
                  <span>${row.Prix_Vente || row.Prix_Achat} DA</span>
                  <span>${row.Quantite}</span>
                  <span>${row.Sum} DA</span>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="separator">- - - - - - - - - - - - - - - -</div>
        <div class="total">Total: ${subtotal(data)}.00 DA</div>
      </div>
    </body>
  </html>
`;

  printWindow.loadURL(
    "data:text/html;charset=utf-8," + encodeURIComponent(printHtml)
  );

  printWindow.webContents.on("did-finish-load", () => {
    printWindow.webContents.print({}, (success, failureReason) => {
      if (success) {
        console.log("Printing successful");
      } else {
        console.log("Printing failed:", failureReason);
      }
      printWindow.close();
    });
  });
});

ipcMain.on("print-barcode2", (event, data) => {
  console.log(data);

  let printWindow = new BrowserWindow({
    show: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  printWindow.loadURL(
    "data:text/html;charset=utf-8," + encodeURIComponent(data)
  );

  printWindow.webContents.on("did-finish-load", () => {
    printWindow.webContents.print({}, (success, failureReason) => {
      if (success) {
        console.log("Printing successful");
      } else {
        console.log("Printing failed:", failureReason);
      }
      printWindow.close();
    });
  });
});

ipcMain.handle("get-app-path", () => {
  return path.dirname(path.dirname(app.getAppPath()));
});

ipcMain.on("printOrdonnance", (event, data) => {
  let printWindow = new BrowserWindow({
    show: true,
    width: 900,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const printHtml = `
  <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f8fa; margin: 0; }
        .ord-print-header { text-align: center; padding: 24px 0 8px; border-bottom: 2px solid #7c3aed; }
        .ord-print-title { font-size: 2rem; color: #7c3aed; font-weight: bold; margin-bottom: 4px; }
        .ord-print-doc { font-size: 1.1rem; color: #444; margin-bottom: 2px; }
        .ord-print-date { font-size: 0.95rem; color: #888; margin-bottom: 12px; }
        .ord-print-list { margin: 24px 0; }
        .ord-print-item { padding: 12px 18px; border-radius: 8px; background: #fff; margin-bottom: 12px; box-shadow: 0 2px 8px #e9e9f3; }
        .ord-print-item-title { font-size: 1.1rem; color: #7c3aed; font-weight: 500; }
        .ord-print-item-details { font-size: 0.98rem; color: #444; margin-top: 2px; }
        .ord-print-footer { text-align: right; font-size: 1rem; color: #7c3aed; margin-top: 32px; border-top: 1px solid #e0e0e0; padding-top: 12px; }
      </style>
    </head>
    <body>
      ${data.html}
    </body>
  </html>
  `;

  printWindow.loadURL(
    "data:text/html;charset=utf-8," + encodeURIComponent(printHtml)
  );

  printWindow.webContents.on("did-finish-load", () => {
    setTimeout(() => {
      printWindow.webContents.print({}, (success, failureReason) => {
        if (success) console.log("🖨️ Ordonnance printed successfully");
        else console.error("❌ Print failed:", failureReason);
        printWindow.close();
      });
    }, 500);
  });
});

ipcMain.on("printBilan", (event, data) => {
  let printWindow = new BrowserWindow({
    show: true,
    width: 900,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const printHtml = `
  <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f8fa; margin: 0; }
        .bilan-print-header { text-align: center; padding: 24px 0 8px; border-bottom: 2px solid #7c3aed; }
        .bilan-print-title { font-size: 2rem; color: #7c3aed; font-weight: bold; margin-bottom: 4px; }
        .bilan-print-doc { font-size: 1.1rem; color: #444; margin-bottom: 2px; }
        .bilan-print-date { font-size: 0.95rem; color: #888; margin-bottom: 12px; }
        .bilan-print-list { margin: 24px 0; }
        .bilan-print-item { padding: 12px 18px; border-radius: 8px; background: #fff; margin-bottom: 12px; box-shadow: 0 2px 8px #e9e9f3; }
        .bilan-print-footer { text-align: right; font-size: 1rem; color: #7c3aed; margin-top: 32px; border-top: 1px solid #e0e0e0; padding-top: 12px; }
      </style>
    </head>
    <body>
      ${data.html}
    </body>
  </html>
  `;

  printWindow.loadURL(
    "data:text/html;charset=utf-8," + encodeURIComponent(printHtml)
  );

  printWindow.webContents.on("did-finish-load", () => {
    setTimeout(() => {
      printWindow.webContents.print({}, (success, failureReason) => {
        if (success) console.log("🖨️ Bilan printed successfully");
        else console.error("❌ Print failed:", failureReason);
        printWindow.close();
      });
    }, 500);
  });
});

ipcMain.handle("electron.backup", async () => {
  console.log("path" + path.dirname(app.getAppPath()));
  try {
    const backupScriptPath = path.join(
      path.dirname(app.getAppPath()),
      "Backup.bat"
    );
    console.log("backupScriptPath" + backupScriptPath);

    await new Promise((resolve, reject) => {
      exec(backupScriptPath, (error, stdout, stderr) => {
        if (error) {
          reject(`Backup failed: ${stderr}`);
        } else {
          resolve(stdout);
        }
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Backup error:", error);
    return { success: false, message: error.message };
  }
});
