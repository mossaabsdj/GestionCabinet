const { contextBridge, ipcRenderer } = require("electron");
const { app } = require("electron");

console.log("Preload script loaded");
contextBridge.exposeInMainWorld("electron", {
  getAppPath: async () => {
    // Use ipcRenderer to request the app path from the main process
    return ipcRenderer.invoke("get-app-path");
  },
  printOrdonnance: (data) => ipcRenderer.send("printOrdonnance", data),
  printBilan: (data) => ipcRenderer.send("printBilan", data),
  backup: () => ipcRenderer.invoke("electron.backup"), // Expose the backup function
  printBarcode2: (barcodeData) =>
    ipcRenderer.send("print-barcode2", barcodeData),
});
