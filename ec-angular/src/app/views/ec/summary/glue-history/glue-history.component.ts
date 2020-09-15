import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MakeGlueService } from 'src/app/_core/_service/make-glue.service';
import { BuildingUserService } from 'src/app/_core/_service/building.user.service';

@Component({
  selector: 'app-glue-history',
  templateUrl: './glue-history.component.html',
  styleUrls: ['./glue-history.component.css']
})
export class GlueHistoryComponent implements OnInit {
  glueID: any;
  data: any;
  pageSettings: { pageSize: number; };
  toolbarOptions = ['Search', 'Print QRCode' ];
  filterSettings: { type: string; };
  users: { ID: any; Username: any; Email: any; }[];

  constructor(
    private route: ActivatedRoute,
    private buildingUserService: BuildingUserService,
    private makeGlueService: MakeGlueService,
  ) { }

  ngOnInit() {
    this.filterSettings = { type: 'Excel' };
    this.onRouteChange();
  }
  onRouteChange() {
    this.route.data.subscribe(data => {
      this.glueID = this.route.snapshot.params.glueID;
      this.getUsers();
    });
  }
  getUsers() {
    this.buildingUserService.getAllUsers(1, 1000).subscribe(res => {
      const data = res.result.map((i: any) => {
        return {
          ID: i.ID,
          Username: i.Username,
          Email: i.Email
        };
      });
      this.users = data;
      this.getMixingInfoByGlueID(this.glueID);
    });
  }
  username(id) {
    return (this.users.find(item => item.ID === id) as any).Username;
  }
  getMixingInfoByGlueID(glueID) {
    this.makeGlueService.getMixingInfoByGlueID(glueID).subscribe((data: any) => {
      this.data = data.map((item: any) => {
        return {
          code: item.code,
          createdTime: new Date(item.createdTime),
          expiredTime: new Date(item.expiredTime),
          glue: item.glue.name,
          mixBy: this.username(item.mixBy),
          realTotal: item.realTotal
        };
      });
    });
  }
  count(index) {
    return Number(index) + 1;
  }
  toolbarClick(args) {
    if (args.item.text === 'Print QRCode') {
      let itemPrint = '';
      for (const [index, item] of this.data.entries()) {
        const qrcode = document.getElementById('barcode' + index);
        itemPrint += `<h1 style="text-align: center"> ${qrcode.innerHTML}</h1>
        <h2 style="text-align: center"> ${this.formatDate(item.glue.name)}</h2>
        <h2 style="text-align: center">Expired Time On ${this.formatDate(item.expiredTime)}</h2><br>`;
      }
      const WindowPrt = window.open('', '_blank', 'left=0,top=0,width=1000,height=900,toolbar=0,scrollbars=0,status=0');
      WindowPrt.document.write(`
      <html>
        <head>
        </head>
        <body onload="window.print(); window.close()">
         ${itemPrint}
        </body>
      </html>
      `);
      WindowPrt.document.close();
    }
  }
  formatDate(dateString) {
    const result = new Date(dateString);
    return result.toLocaleDateString() + ' ' + result.toLocaleTimeString();
  }
}
