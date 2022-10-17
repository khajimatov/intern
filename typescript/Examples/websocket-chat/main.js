window.onload = function () {
    var socket = new WebSocket('ws://159.69.30.195:8001/chat');
    socket.onopen = function (e) {
        document.getElementById('my-status').textContent = "ONLINE";
    };
    socket.onmessage = function (event) {
        var _a;
        var data = JSON.parse(event.data);
        switch (data.type) {
            case 'CONNECTED':
                document.getElementById('new-user-form').style.display = 'block';
                if (data.connectedUsers.length === 0) {
                    document.getElementById('connected-users-title').textContent = 'No connected users';
                }
                else {
                    data.connectedUsers.map(function (user) {
                        var _a;
                        var li = document.createElement('li');
                        li.textContent = user;
                        (_a = document.getElementById('connected-users-list')) === null || _a === void 0 ? void 0 : _a.appendChild(li);
                    });
                }
                ;
                document.getElementById('new-user-label').textContent = data.message;
                break;
            case 'LOGGED_IN':
                var messages = JSON.parse(data.messages);
                document.getElementById('new-user-form').style.display = 'none';
                if (messages.length <= 0) {
                    document.getElementById('messages-list').textContent = 'No messages in the chat.';
                }
                else {
                    messages.map(function (message) {
                        var newMessage = document.createElement('p');
                        newMessage.textContent = message.username + ' ' + message.text;
                        document.getElementById('messages-list').appendChild(newMessage);
                    });
                }
                ;
                openCreateMessageForm();
                break;
            case 'NEW_USER':
                document.getElementById('connected-users-title').textContent = 'Connected users';
                var li = document.createElement('li');
                li.textContent = data.username;
                (_a = document.getElementById('connected-users-list')) === null || _a === void 0 ? void 0 : _a.appendChild(li);
                document.getElementById('my-status').textContent = "You're logged in";
                break;
            case 'NEW_MESSAGE':
                var newMessage = document.createElement('p');
                newMessage.textContent = data.message.username + ' ' + data.message.text;
                document.getElementById('messages-list').appendChild(newMessage);
                break;
        }
        ;
    };
    var sendMessage = function () {
        var sendingMessage = { "type": "CREATE_MESSAGE", "message": document.getElementById('create-message-text').value };
        socket.send(JSON.stringify(sendingMessage));
    };
    function openCreateMessageForm() {
        document.getElementById('create-message').style.display = 'block';
        document.getElementById('create-message-button').addEventListener('click', sendMessage);
    }
    ;
    var sendUsername = function () {
        var sendingUsername = { "type": "SET_USERNAME", "username": document.getElementById('new-user-name').value };
        socket.send(JSON.stringify(sendingUsername));
    };
    document.getElementById('new-user-button').addEventListener('click', sendUsername);
};
