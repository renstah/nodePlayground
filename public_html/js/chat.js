window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://192.168.0.14:7331');
    var field = document.getElementById("textBox");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("textArea");
    var nicknameSubmit = document.getElementById("nicknameSubmit");
    var nicknameBox = document.getElementById("nickname");
    var name = "";
 
    nicknameSubmit.onclick = function(){
        name = nicknameBox.value;
        return false;
    };
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '&#13;';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: name + ': ' + text });
        field.value = "";
        return false;
    };
 
};