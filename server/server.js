var ws      = require("websocket-server");
var express = require("express")

var kHttpPort    = 5000;
var kSocketPort  = 5001;

// Create HTTP Server using Express
// --------------------------------

var httpPosted = function(req, res) {
  data = req.body.payload;
  console.log("Received data: ", data);
  websocket.broadcast(data);
  res.writeHead(200);
  res.end("200: Notified");
}

var http = express.createServer();
http.use(express.bodyParser());
http.post('/', httpPosted);
http.listen(kHttpPort);

// Create WebSocket Server
// -----------------------

var clientConnected = function(connection){
  console.log('Client connected');
}

var websocket = ws.createServer();
websocket.addListener("connection", clientConnected);
websocket.listen(kSocketPort);