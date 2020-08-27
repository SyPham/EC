import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';

export const CONNECTION_HUB = new signalR.HubConnectionBuilder()
    .withUrl(environment.hub)
    // .configureLogging(signalR.LogLevel.Information)
    .build();
// Start the connection.
start();
function start() {
    CONNECTION_HUB.start().then(function () {
        CONNECTION_HUB.on('UserConnected', (conId) => {
            console.log("UserConnected", conId);

        });
        CONNECTION_HUB.on('UserDisconnected', (conId) => {
            console.log("UserDisconnected", conId);

        });
       
        console.log("Signalr connected");
    }).catch(function (err) {
        setTimeout(() => start(), 5000);
    });
}
