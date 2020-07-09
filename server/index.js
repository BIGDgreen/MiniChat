var express = require('express');
var app = express();
var server = app.listen(3000, () => { console.log('server is listening at 3000') });
var io = require('socket.io').listen(server);

var cors = require('cors')
var path = require('path')

app.use(cors({ credentials: true, origin: 'http://localhost:5500' }))

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join', function (name) {
    io.emit("join", name);
  })

  socket.on('exit', function (name) {
    io.emit("exit", name);
  })

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  //响应某用户发送消息
  socket.on('message', function (msg) {
    console.log('message:' + msg);

    // 广播给所有人
    io.emit('message', msg);
    //   // 广播给除了发送者外所有人
    //   // socket.broadcast.emit('chat message', msg)
    // });  
  })
})

io.on('error', (error) => {
  console.log("error:::", error)
})

// app.listen(3000, () => {
//   console.log("listen at 3000")
// })
