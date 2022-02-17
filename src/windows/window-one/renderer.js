const { ipcRenderer } = require('electron');

function sendToWindowTwo() {
    const windowOneId = ipcRenderer.sendSync('getWindowId', 'two');
    console.log('windowOneId', windowOneId);
    ipcRenderer.sendTo(windowOneId, 'windowOne-send-to-windowTwo', '窗口1通过 sendTo 给窗口2发送消息');
}
