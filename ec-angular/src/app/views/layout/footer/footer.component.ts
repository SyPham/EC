import { Component, OnInit } from '@angular/core';
import * as signalr from '../../../../assets/js/ec-client.js';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  online: number;
  constructor() { }
  ngOnInit(): void {
    console.log('footer connected');
    if (signalr.CONNECTION_HUB.state === 'Connected') {
      signalr.CONNECTION_HUB.invoke('CheckOnline').catch(err => console.error(err));
      signalr.CONNECTION_HUB.on('Online', (users) => {
        console.log('Online', users);
        this.online = users;
      });
    }
  }

}
