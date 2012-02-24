var ws = require("websocket-server");

var server = ws.createServer();

server.addListener("connection", function(connection){
  console.log('Client connected');
  connection.addListener("message", function(msg){
    console.log('Received message: ', msg);
    connection.send('Echo: ' + msg);
  });
});

server.listen(5000);