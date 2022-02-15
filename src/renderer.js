const { ipcRenderer } = require('electron');

// 渲染进程接收主进程通过 webContents.send 发送的消息
ipcRenderer.on('main-send-to-render', (event, message) => {
  console.log(`receive message from main: ${message}`)
})

// send 方法案例
// function sendMessageToMain() {
//   ipcRenderer.send('render-send-to-main', '我是渲染进程通过 send 发送的消息');
// }

// send 方法试图接收返回值
// function sendMessageToMain() {
//   const replyMessage = ipcRenderer.send('render-send-to-main', '我是渲染进程通过 send 发送的消息');
//   console.log('replyMessage', replyMessage); // undefined
// }

// send 方法发送，并绑定另一个事件接收返回值
function sendMessageToMain() {
  ipcRenderer.send('render-send-to-main', '我是渲染进程通过 send 发送的消息');
}
ipcRenderer.on('main-reply-to-render', (event, message) => {
  console.log('replyMessage', message);
})

/* ------------------------------------------------------ */

// invoke 方法案例, 获取异步结果
// async function invokeMessageToMain() {
//   const replyMessage = await ipcRenderer.invoke('render-invoke-to-main', '我是渲染进程通过 invoke 发送的消息');
//   console.log('replyMessage', replyMessage);
// }

// invoke 方法的返回值为一个 Promise
// function invokeMessageToMain() {
//   const replyMessage = ipcRenderer.invoke('render-invoke-to-main', '我是渲染进程通过 invoke 发送的消息');
//   console.log('replyMessage', replyMessage); // Promise<pending>
// }

async function invokeMessageToMain() {
  const replyMessage = await ipcRenderer.invoke('render-invoke-to-main', '我是渲染进程通过 invoke 发送的消息');
  console.log('replyMessage', replyMessage);
}

/* ------------------------------------------------------ */

// sendSync 方法案例，
// function sendSyncMessageToMain() {
//   const replyMessage = ipcRenderer.sendSync('render-send-sync-to-main', '我是渲染进程通过 syncSend 发送给主进程的消息');
//   console.log('replyMessage', replyMessage);
// }

// async function sendSyncMessageToMain() {
//   const replyMessage = await ipcRenderer.sendSync('render-send-sync-to-main', '我是渲染进程发送给主进程的同步消息');
//   console.log('replyMessage', replyMessage);
// }

function sendSyncMessageToMain() {
  const replyMessage = ipcRenderer.sendSync('render-send-sync-to-main', '我是渲染进程通过 syncSend 发送给主进程的消息');
  console.log('replyMessage', replyMessage); // replyMessage {error: "reply was never sent"}
  console.log('next');
}