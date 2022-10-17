window.onload = () => {
    let socket = new WebSocket('ws://159.69.30.195:8001/chat');

    socket.onopen = function (e) {
        document.getElementById('my-status')!.textContent = "ONLINE";
    };

    socket.onmessage = function (event) {
        let data = JSON.parse(event.data);
        switch (data.type) {
            case 'CONNECTED':
                document.getElementById('new-user-form')!.style.display = 'block';
                if (data.connectedUsers.length === 0) {
                    document.getElementById('connected-users-title')!.textContent = 'No connected users';
                } else {
                    data.connectedUsers.map(user => {
                        let li = document.createElement('li');
                        li.textContent = user;
                        document.getElementById('connected-users-list')?.appendChild(li);
                    });
                };
                document.getElementById('new-user-label')!.textContent = data.message;
                break;
            case 'LOGGED_IN':
                let messages = JSON.parse(data.messages);
                document.getElementById('new-user-form')!.style.display = 'none';
                if (messages.length <= 0) {
                    document.getElementById('messages-list')!.textContent = 'No messages in the chat.';
                } else {
                    messages.map(message => {
                        let newMessage = document.createElement('p');
                        newMessage.textContent = message.username + ' ' + message.text;
                        document.getElementById('messages-list')!.appendChild(newMessage);
                    });
                };
                openCreateMessageForm();
                break;
            case 'NEW_USER':
                document.getElementById('connected-users-title')!.textContent = 'Connected users';
                let li = document.createElement('li');
                li.textContent = data.username;
                document.getElementById('connected-users-list')?.appendChild(li);
                document.getElementById('my-status')!.textContent = "You're logged in";
                break;
            case 'NEW_MESSAGE':
                let newMessage = document.createElement('p');
                newMessage.textContent = data.message.username + ' ' + data.message.text;
                document.getElementById('messages-list')!.appendChild(newMessage);
                break;
            case 'USER_LOGGED_OUT':
                let leftUsername = data.username;
                let lis = document.querySelectorAll('li');
                for (let i = 0; i < lis.length; i++) {
                    console.log(lis[i]);
                    if (lis[i].textContent === leftUsername) {
                        console.log(lis[i]);
                        lis[i].parentNode!.removeChild(lis[i]);
                    };
                };
                break;
        };

    };

    const sendMessage = function () {
        let sendingMessage = { "type": "CREATE_MESSAGE", "message": (<HTMLInputElement>document.getElementById('create-message-text')!).value };
        socket.send(JSON.stringify(sendingMessage));
    };

    function openCreateMessageForm() {
        document.getElementById('create-message')!.style.display = 'block';
        document.getElementById('create-message-button')!.addEventListener('click', sendMessage);
    };

    const sendUsername = function () {
        let sendingUsername = { "type": "SET_USERNAME", "username": (<HTMLInputElement>document.getElementById('new-user-name')!).value };
        socket.send(JSON.stringify(sendingUsername));
    };

    document.getElementById('new-user-button')!.addEventListener('click', sendUsername);
};