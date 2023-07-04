const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Hello')
});

io.on('connection', (socket) => {
  console.log('a user connected');


  // Ping calculation
  socket.on("ping", (cb) => {
    if (typeof cb === "function")
      cb();
  });
  
  socket.on('transform', (data) => {
      io.emit('transform', data, false)
      console.log(JSON.stringify(data))
  })

});



server.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});
