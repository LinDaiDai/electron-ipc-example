## 简介

本项目为 `electron ipc` 相关文章的案例。

此分支是第三部分的案例——定情信物port：

利用 `postMessage` 来进行进程间的通信，`ipcRenderer.postMessage()` 将渲染进程的 `port` 发送给主进程，主进程接收到后，通过 `port` 与渲染进程建立通信通道。

介绍：

- 在某个时机，渲染进程创建了两个 port 并将其中一个(名为 port1)发送给了主进程
- 渲染进程这边的另一个 port2 绑定监听事件
- 主进程接收到 port1 并将它保存下来，同时也绑定监听事件
- 在另一个时机渲染进程通过 port2 给主进程发送消息

版本：

- electron: v13.6.7

## 使用

```
$ npm install
```

```
$ npm run start
```
