const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;
let tray;

function createWindow() {
mainWindow = new BrowserWindow({ width: 900, height: 680 , frame: true});
mainWindow.loadURL(
isDev
? "http://localhost:3000"
: `file://${path.join(__dirname, "../build/index.html")}`
);
mainWindow.on("closed", () => (mainWindow = null));
tray= new Tray(path.join(__dirname,'./logo192.png'))
tray.on('click', ()=>{
    if(mainWindow.isVisible()) {
        mainWindow.hide();
    } else {
        mainWindow.show();
    }
})
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
if (process.platform !== "darwin") {
app.quit();
}
});
app.on("activate", () => {
if (mainWindow === null) {
createWindow();
}
});
