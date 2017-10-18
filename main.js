const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const exec = require('child_process').exec;
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
    inputFile = file;
    spawnAutosub(file + ' -S en -D en', '', function(e) {
        console.log(e);
    })
});

function spawnAutosub(command, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = null
    }
    exec(autosub + ' ' + command, options, callback);
}