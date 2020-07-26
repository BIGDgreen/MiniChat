**技术框架：** vue/node/express/socket.io

**线上地址：** http://www.bigdgreen.com:9000

ps：这只是一个简单的聊天室，没有连接数据库，因此看不到历史记录。

**前端：** 
1. 首页：通过动态改变src来切换头像。通过localStorage直接存储用户输入的用户名和选择的头像。这里选用localStorage明文存储，在进入首页和聊天页时都会通过判断localStorage中的信息来模拟登录。
   - 使用localStorage模拟登录存在明显的安全问题，但这里的聊天室也不做实际的应用使用，因此选择从简处理。而将重心放在了websocket的使用上。
  
2. 聊天页通过CDN的方式导入vue，将vue简单地用于一个单页面。在mounted中监听socket事件。
   - 这里通过在created中添加事件`beforeunload`的监听，获取用户关闭页面或刷新页面的行为，在监听到该事件时向服务端传递一个`exit`事件，再由服务端广播到客户端，从而实现`某某退出了聊天室`的系统提醒。

**后端：** 
使用`express`启动http服务。使用`socket.io`库及相应的api处理与socket相关的事件。


**线上环境：** node的线上环境使用pm2，将日志存在logs目录中。静态文件部署在nginx服务器上。