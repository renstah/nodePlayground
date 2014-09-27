var express = require("express");
var app = express();
var port = 7331;
var io = require("socket.io").listen(app.listen(port));

app.use(express.static(__dirname + '/'));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
 
app.get("/", function(req, res){
    res.sendFile("index.html");
});
 
//app.listen(port);
console.log("Listening on port " + port);