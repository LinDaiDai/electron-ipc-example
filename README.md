## 简介

本项目为 `electron ipc` 相关文章的案例。

此分支是第二部分的案例——渲染进程发送同步/异步消息给渲染进程：

`ipcRenderer.sendTo(webContentsId, channel, ...args) `:  使用 `ipcRenderer` 提供的 `sendTo` 方法，指定要给哪个渲染进程(`webContentsId`)发送消息。

介绍：

1、期望主进程能提供以下能力：

- 创建窗口的能力；
- 创建了窗口能将新窗口的 `id` 存储下来，并对这些窗口 `id` 进行维护；
- 给渲染进程提供获取某个窗口 `id` 的能力

2、创建并打开两个窗口（渲染进程），方便调试

3、通过 `sendTo` 方法让窗口一给窗口二发送消息

版本：

- electron: v13.6.7

## 使用

```
$ npm install
```

```
$ npm run start
```
