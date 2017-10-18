const {remote, ipcRenderer} = require('electron');

let openFileButton = document.getElementById('openFile');

openFileButton.onclick = function (e) {
    remote.dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {name: 'Video', extensions: ['mkv', 'avi', 'mp4', 'webm', 'flv']},
            {name: 'Audio', extensions: ['mp3', 'wav', 'flac']}
        ]
    }, function (filePaths) {
        ipcRenderer.send('openFile', filePaths);
    });
};
