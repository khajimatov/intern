# Websocket chat with TypeScript

> ugly UI version.

***

## The assignment:

Write a client application for chat on websocket. When entering the chat room, all users who are currently online should be displayed. When a new user enters the chat, all clients receive a message that so-and-so user is logged in. He must be added to the list of active users. When the user leaves - the message about leaving is also removed from the list.

At each entry into the chat you need to display a form with the possibility of entering the username, after that all customers receive a message that the user is in the chat, he appears in the list of active users and gets the opportunity to send a message. The page should display the appropriate form. Free design

Base url: 159.69.30.195:8001
WS endpoint: /chat

On connect message:
To connected client: {type: "CONNECTED", message: "Send your username to join chat", connectedUsers: string[]}

Actions:
SET_USERNAME
request: {type: "SET_USERNAME", username: string}
response: 
to connected client: {type: "LOGGED_IN", messages: [{username: string, text: string}]}
to all clients: {type: "NEW_USER", username: string}

CREATE_MESSAGE
request: {type: "CREATE_MESSAGE", message: string}
response:
to all clients: {type: "NEW_MESSAGE", message: {
                username: string
                text: messageString
              }
            }

On close connection
response:
to all clients: {type: "USER_LOGGED_OUT", username: string}