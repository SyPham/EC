import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  constructor() {
    this.startConnection();
  }
  public startConnection = () => {
    // this.hubConnection = new signalR.HubConnectionBuilder()
    //                         .withUrl(environment.hub)
    //                         .build();
    // this.hubConnection
    //   .start()
    //   .then(() => console.log('Connection started'))
    //   .catch(err => console.log('Error while starting connection: ' + err))
  }
  // public addTransferChartDataListener = () => {
  //   this.hubConnection.on('transferchartdata', (data) => {
  //     //this.data = data;
  //     console.log(data);
  //   });
  // }
  // public broadcastChartData = () => {
  //   this.hubConnection.invoke('broadcastchartdata', this.data)
  //   .catch(err => console.error(err));
  // }
 public joiGroup(room: string, user: string) {
   this.hubConnection
   .invoke('JoinGroup', room.toString(), user.toString())
   .catch((err) => {
      console.error(err.toString());
   });
 }
 public stopTyping(room: string, user: string) {
   this.hubConnection
   .invoke('StopTyping', room.toString(), user.toString())
   .catch((err) => {
      console.error(err.toString());
   });
 }
 public typing(room: string, user: string) {
   this.hubConnection
   .invoke('Typing', room.toString(), user.toString())
   .catch((err) => {
      console.error(err.toString());
   });
 }
 public sendToGroup(room: string, message: string, user: string) {
   this.hubConnection
   .invoke('SendMessageToGroup', room.toString(), message, user.toString())
   .catch((err) => {
      console.error(err.toString());
   });
 }
 public checkAlert(user: string) {
  this.hubConnection
  .invoke('CheckAlert', user)
  .catch((err) => {
     console.error(err.toString());
  });
}
 public receiveJoinGroup(callBack: (user: string, username: string) => any) {
   this.hubConnection.on('ReceiveJoinGroup', callBack);
 }
 public receiveTyping(callBack: (user: string, username: string) => any) {
   this.hubConnection.on('ReceiveTyping', callBack);
 }
 public receiveStopTyping(callBack: (user: string) => any) {
  this.hubConnection.on('ReceiveStopTyping', callBack);
}
 public receiveMessageGroup(callBack: (message: string) => any) {
   this.hubConnection.on('ReceiveMessageGroup', callBack);
 }
}
