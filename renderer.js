"use strict";
const {dialog} = require('electron').remote;

let inputFile = null;
let openFileButton = document.getElementById('openFile');



openFileButton.onclick = function (e) {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {name: 'Video', extensions: ['mkv', 'avi', 'mp4', 'webm', 'flv']},
            {name: 'Audio', extensions: ['mp3', 'wav', 'flac']}
        ]
    }, function (filePaths) {

    });
};