import * as signalR from '@microsoft/signalr'

const createSignalRConnection = () => {
    const connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl('http://localhost:5178/hub', {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .build();
    connection.start().then(() => {
        console.log('Connected');
    });

    return connection;
};

const sendSignalRMessage = (connection: signalR.HubConnection, methodName: string, message: string) => {
    connection
        .send(methodName, message)
        .then(_ => console.log('Message sent'));
}

const registerSignalRMessageHandler = (connection: signalR.HubConnection, methodName: string, handler: (message: string) => void) => {
    connection.on(methodName, message => {
        handler(message);
    });
}

export {createSignalRConnection, sendSignalRMessage, registerSignalRMessageHandler};
