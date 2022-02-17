const { ipcRenderer } = require('electron');

ipcRenderer.on('windowOne-send-to-windowTwo', (event, arg) => {
    console.log('event:', event);
    console.log('receive:', arg);
})
