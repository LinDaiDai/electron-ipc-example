const { app, BrowserWindow } = require('electron')
const { createWindow } = require('./createWindow')
const ipc = require('./ipc')

function createWindowOne() {
  createWindow({
    name: 'one',
    width: 1000,
    height: 800,
    loadFileUrl: 'src/windows/window-one/index.html',
  })
}

app.whenReady().then(() => {
  createWindowOne()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindowOne()
  }
})
