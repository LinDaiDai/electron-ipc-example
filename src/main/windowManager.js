const { ipcMain } = require('electron')

const windowIdMap = {}

exports.registerWindowId = function(key, value) {
    windowIdMap[key] = value;
    console.log('registerWindowId', windowIdMap);
}

exports.removeWindowId = function(key) {
    delete windowIdMap[key];
    console.log('removeWindowId', windowIdMap);
}

ipcMain.on('getWindowId', (event, arg) => {
    console.log('getWindowId', arg);
    event.returnValue = windowIdMap[arg];
})
