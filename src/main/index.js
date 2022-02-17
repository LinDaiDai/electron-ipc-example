const { app, BrowserWindow } = require('electron')
const { createWindow } = require('./createWindow');

function createWindowOne() {
  createWindow({
    name: 'one',
    width: 1000,
    height: 800,
    loadFileUrl: 'src/windows/window-one/index.html',
  })
}

function createWindowTwo() {
  createWindow({
    name: 'two',
    width: 800,
    height: 600,
    loadFileUrl: 'src/windows/window-two/index.html',
  })
}

app.whenReady().then(() => {
  createWindowOne();
  createWindowTwo();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindowOne();
    createWindowTwo();
  }
})
