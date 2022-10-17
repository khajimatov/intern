Написать клиентское приложения для чата на websocket. При входе в чат должны отображаться все юзеры, которые в данный момент онлайн. При входе нового пользователя в чат всем клиентам приходит сообщение, что такой-то пользователь вошел. Он должен добавиться в список активных пользователей. При выходе пользователя - сообщение о выходе, также удаляется из списка.

При каждом входе в чат нужно выводить форму с возможностью ввести username, после этого всем клиентам выводится сообщение, что пользователь вошел в чат, он появляется в списке активных пользователей и получает возможность отправить сообщение. На странице должна появиться соответствующая форма. Дизайн произвольный

Base url: 159.69.30.195:8001
WS endpoint: /chat

On connect message:
to connected client: {type: "CONNECTED", message: "Send your username to join chat", connectedUsers: string[]}

Actions:
SET_USERNAME
request: {type: “SET_USERNAME”, username: string}
response: 
to connected client: {type: "LOGGED_IN", messages: [{username: string, text: string}]}
to all clients: {type: "NEW_USER", username: string}

CREATE_MESSAGE
request: {type: “CREATE_MESSAGE”, message: string}
response:
to all clients: {type: "NEW_MESSAGE", message: {
                username: string
                text: messageString
              }
            }

On close connection
response:
to all clients: {type: "USER_LOGGED_OUT", username: string}
