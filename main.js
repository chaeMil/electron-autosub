const {app, BrowserWindow, ipcMain} = require('electron');
const execSync = require('child_process').execSync;
const path = require('path');
const url = require('url');
const autosub = path.join(__dirname, 'bin/macos/autosub/autosub');

let mainWindow;
let inputFile;

function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});

ipcMain.on('openFile', (event, file) => {
    inputFile = file[0];
    let outputFile = inputFile.replace('mp4', 'srt');
    execSync(autosub + ' ' + inputFile + ' -S en -D en -o ' + outputFile, {stdio:[0,1,2]});
});