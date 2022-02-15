const { app, BrowserWindow, ipcMain } = require('electron')

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  })

  // 注意这个路径是从项目根路径开始的
  window.loadFile('src/index.html')

  // 窗口在完成加载时，通过 webContents.send 给渲染进程发送消息
  window.webContents.on('did-finish-load', () => {
    window.webContents.send('main-send-to-render', '启动完成了')
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 某个异步任务
const asyncWork = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('延迟 2 秒获取到主进程的返回结果')
    }, 2000)
  })
}

// 主进程接收渲染进程通过 send 发送的消息
ipcMain.on('render-send-to-main', (event, message) => {
  console.log(`receive message from render: ${message}`)
})

// 主进程试图发送返回值给渲染进程
// ipcMain.on('render-send-to-main', (event, message) => {
//   console.log(`receive message from render: ${message}`)
//   return '主进程试图回复渲染进程消息'
// })

// 主进程通过 event.reply 发送另一个事件给渲染进程回复消息
// ipcMain.on('render-send-to-main', (event, message) => {
//   console.log(`receive message from render: ${message}`)
//   event.reply('main-reply-to-render', '主进程通过 reply 回复给渲染进程的消息')
// })

/* ------------------------------------------------------ */

// 主进程接收渲染进程通过 invoke 发送的消息，并处理异步函数
// ipcMain.handle('render-invoke-to-main', async (event, message) => {
//   console.log(`receive message from render: ${message}`)
//   const result = await asyncWork();
//   return result;
// })

// 主进程接收渲染进程通过 invoke 发送的消息，并处理同步函数
// ipcMain.handle('render-invoke-to-main', (event, message) => {
//   console.log(`receive message from render: ${message}`)
//   const result = '我是主进程同步的返回结果';
//   return result;
// })

ipcMain.handle('render-invoke-to-main', async (event, message) => {
  console.log(`receive message from render: ${message}`)
})

/* ------------------------------------------------------ */

// 主进程接收渲染进程通过 sendSync 发送的消息，并返回值
// ipcMain.on('render-send-sync-to-main', (event, message) => {
//   console.log(`receive message from render: ${message}`)
//   event.returnValue = '主进程回复的消息';
// })

// 多福多寿
// ipcMain.on('render-send-sync-to-main', async (event, message) => {
//   console.log(`receive message from render: ${message}`)
//   const result = await asyncWork();
//   event.returnValue = result;
// })

ipcMain.on('render-send-sync-to-main', async (event, message) => {
  console.log(`receive message from render: ${message}`)
})
