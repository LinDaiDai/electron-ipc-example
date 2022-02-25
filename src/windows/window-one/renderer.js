const { ipcRenderer } = require('electron');

function sendToWindowTwo() {
    ipcRenderer.send('renderer-send-to-renderer', {
        channel: 'windowOne-send-to-windowTwo',
        targetWindow: 'two',
        data: '窗口1通过 sendTo 给窗口2发送消息',
    });
}
