const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600})

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

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

var exec = require('child_process').exec;
var autosub = path.join(__dirname, 'autosub/autosub');

function spawnAutosub(command, options, callback) {
    if (typeof options === 'function') {
        callback = options
        options = null
    }
    exec(autosub + ' ' + command, options, callback);
}


spawnAutosub('test.avi -S en -D en', '', function(e) {
    console.log(e);
});