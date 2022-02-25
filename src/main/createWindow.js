const { BrowserWindow } = require('electron')
const { registerWindowContents, removeWindowContents } = require('./windowManager');

/**
 * 公共的创建窗口的方法
 * @param {*} params 参数
 */
exports.createWindow = function (params) {
  const { name, width, height, loadFileUrl } = params;
  const window = new BrowserWindow({
    name,
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  window.loadFile(loadFileUrl)

  window.webContents.on('did-finish-load', () => {
    registerWindowContents(name, window.webContents);
  })

  window.webContents.on('destroyed', () => {
    removeWindowContents(name);
  })
}
