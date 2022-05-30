const { ipcRenderer } = require('electron')

let portToMain

function sendPortToMain() {
  // 1、创建一对 port
  const { port1, port2 } = new MessageChannel()
  // 2、给主进程传输消息端口 por1
  ipcRenderer.postMessage(
    'render-post-message-to-main',
    '我是渲染进程一通过 ipcRenderer.postMessage 发送过来的',
    [port1],
  )
  // 3、把 port2 赋值给 portToMain，方便其他模块获取
  portToMain = port2
  // 4、port2 绑定事件监听，之后主进程发送的消息都会在这里接收到
  portToMain.onmessage = (event) => {
    const data = event.data
    console.log('[Renderer receive]message', data)
  }
}

function sendMessageToMain() {
  portToMain.postMessage('我是渲染进程一通过传声筒 port 发送过来的')
}
