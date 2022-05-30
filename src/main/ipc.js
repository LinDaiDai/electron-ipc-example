const { ipcMain } = require('electron')

// 1、主进程监听一个事件，渲染进程想要发送 port 的话，就能在这里获取到
ipcMain.on('render-post-message-to-main', (event, params) => {
  console.log('[Main receive]render-post-message-to-main', params)

  // 2、获取到 port1
  const port1 = event.ports[0]

  // 3、需要调用一下 port1 的 start()
  port1.start()

  // 4、port1 绑定事件监听，之后渲染进程一发送的消息都会在这里接收到
  port1.on('message', (event) => {
    const data = event.data
    console.log('[Main receive]message', data)

    port1.postMessage('我是主进程通过 port 回复的消息')
  })
})
