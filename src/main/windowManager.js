const { ipcMain } = require('electron')

const windowContentsMap = {}

exports.registerWindowContents = function(key, value) {
    windowContentsMap[key] = value;
    // console.log('registerWindowContents', windowContentsMap);
}

exports.removeWindowContents = function(key) {
    delete windowContentsMap[key];
    // console.log('removeWindowContents', windowContentsMap);
}

function getWindowContents(key) {
    return windowContentsMap[key];
}

/**
 * event: 事件对象
 * params: { channel: string; targetWindow: string; data: any }
 * channel: 事件名; targetWindow: 目标窗口的唯一标识; data: 要传递的内容
 */
ipcMain.on('renderer-send-to-renderer', (event, params) => {
    console.log('[Main receive]renderer-send-to-renderer', params);
    const { channel, targetWindow, data } = params;
    const contents = getWindowContents(targetWindow);
    if (contents) {
        contents.send(channel, data);
    } else {
        console.error('targetWindow non-existent');
    }
})
