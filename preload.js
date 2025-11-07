const { contextBridge, ipcRenderer } = require("electron");
const { app } = require("electron");

console.log("Preload script loaded");
contextBridge.exposeInMainWorld("electron", {
  getAppPath: () => ipcRenderer.invoke("get-app-path"),

  printOrdonnance: (data) => ipcRenderer.send("printOrdonnance", data),
  printBilan: (data) => ipcRenderer.send("printBilan", data),
  //backup: () => ipcRenderer.invoke("electron.backup"), // Expose the backup function
  backup: () => ipcRenderer.invoke("backup-database"),
  restore: () => ipcRenderer.invoke("restore-database"),
  openFile: (filePath) => ipcRenderer.invoke("open-file", filePath),
  exit: () => ipcRenderer.send("exit"),

  printBarcode2: (barcodeData) =>
    ipcRenderer.send("print-barcode2", barcodeData),
});
