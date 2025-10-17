const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { fork } = require("child_process");
const { exec } = require("child_process");
const { Menu } = require("electron");

let mainWindow;
let serverProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: false, // open fullscreen immediately
    resizable: true,

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
}

function createMenu() {
  const template = [
    {
      label: "➕ Add Product",
      click: () => {
        const addProductWin = new BrowserWindow({
          width: 1080,
          height: 720,
          resizable: false, // fixed size
          parent: mainWindow, // attach to main window
          modal: true, // modal behavior
          autoHideMenuBar: true, // no menu bar
          backgroundColor: "#f4f6f9", // light modern background
          frame: true, // keep OS frame (set to false if you want fully custom)
          webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
          },
        });

        // Center the window
        addProductWin.center();

        // Inject custom CSS after load
        addProductWin.webContents.on("did-finish-load", () => {
          addProductWin.webContents.insertCSS(`
          body {
            font-family: "Segoe UI", "Roboto", sans-serif;
            font-weight: 600; /* semi-bold */
            background-color: #f4f6f9;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          h1, h2, h3, label {
            font-weight: 600; /* semi-bold headings */
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
createMenu();

app.whenReady().then(() => {
  // Start Next.js server
  const serverScript = path.join(__dirname, "server.js");
  serverProcess = fork(serverScript);

  createWindow();

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

// Optionally handle print or file operations in the main process
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

  // Use "hello" as the content for testing
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
      printWindow.close(); // Close after printing
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

  // Use "hello" as the content for testing

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
      printWindow.close(); // Close after printing
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
    // Wait briefly for full render
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
    // Resolve the path to the 'backup.bat' file located in the 'myapp' folder
    const backupScriptPath = path.join(
      path.dirname(app.getAppPath()),
      "Backup.bat"
    ); // Backup.bat is in the root folder
    console.log("backupScriptPath" + backupScriptPath);

    // Execute the backup.bat script
    await new Promise((resolve, reject) => {
      exec(backupScriptPath, (error, stdout, stderr) => {
        if (error) {
          reject(`Backup failed: ${stderr}`);
        } else {
          resolve(stdout);
        }
      });
    });

    // Return a success response if the backup succeeds
    return { success: true };
  } catch (error) {
    // Handle any errors that occur during the backup process
    console.error("Backup error:", error);
    return { success: false, message: error.message };
  }
});
