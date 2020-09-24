import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MakeGlueService } from 'src/app/_core/_service/make-glue.service';
import { BuildingUserService } from 'src/app/_core/_service/building.user.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import {  QRCodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-glue-history',
  templateUrl: './glue-history.component.html',
  styleUrls: ['./glue-history.component.css'],
  providers: [DatePipe]
})
export class GlueHistoryComponent implements OnInit {
  glueID: any;
  data: any;
  toolbarOptions = ['ExcelExport', 'Search', 'Print QR Code' ];
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 5 };
  filterSettings: { type: string; };
  users: { ID: any; Username: any; Email: any; }[];
  @ViewChildren('barcode') barcode: QueryList<QRCodeGeneratorComponent>;
  @ViewChild('barcode') qrCode: QRCodeGeneratorComponent;
  @ViewChild('grid') grid: GridComponent;
  dataSelected: any;
  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
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
  configurePrint(html) {
    const WindowPrt = window.open('', '_blank', 'left=0,top=0,width=1000,height=900,toolbar=0,scrollbars=0,status=0');
    // WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write(`
    <html>
      <head>
      </head>
      <style>
          body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #FAFAFA;
        font: 12pt "Tahoma";
    }
    * {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    .page {
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        margin: 10mm auto;
        border: 1px #D3D3D3 solid;
        border-radius: 5px;
        background: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
    .subpage {
        padding: 1cm;
        border: 5px red solid;
        height: 257mm;
        outline: 2cm #FFEAEA solid;
    }
     .content {
        height: 221px;
         border: 1px #D3D3D3 solid;
    }
    .content .qrcode {
      float:left;

      width: 177px;
      height:177px;
      margin-top: 12px;
      margin-bottom: 12px;
      margin-left: 5px;
       border: 1px #D3D3D3 solid;
    }
    .content .info {
       float:left;
       list-style: none;
    }
    .content .info ul {
       float:left;
       list-style: none;
       padding: 0;
       margin: 0;
      margin-top: 25px;
    }
    .content .info ul li.subInfo {
      padding: .20rem .75rem;
    }
    @page {
        size: A4;
        margin: 0;
    }
    @media print {
        html, body {
            width: 210mm;
            height: 297mm;
        }
        .page {
            margin: 0;
            border: initial;
            border-radius: initial;
            width: initial;
            min-height: initial;
            box-shadow: initial;
            background: initial;
            page-break-after: always;
        }
    }
      </style>
      <body onload="window.print(); window.close()">
        ${html}
      </body>
    </html>
    `);
    WindowPrt.document.close();
  }
  printData() {
    let html = '';
    for (const item of this.dataSelected) {
      const content = document.getElementById(item.code);
      html += `
       <div class='content'>
        <div class='qrcode'>
         ${content.innerHTML}
         </div>
          <div class='info'>
          <ul>
            <li class='subInfo'>Name: ${ item.glue}</li>
              <li class='subInfo'>QR Code: ${ item.code}</li>
              <li class='subInfo'>MFG: ${ this.datePipe.transform(new Date(item.createdTime), 'yyyyMMdd')}</li>
              <li class='subInfo'>EXP: ${ this.datePipe.transform(new Date(item.expiredTime), 'yyyyMMdd')}</li>
          </ul>
         </div>
      </div>
      `;
    }
    this.configurePrint(html);
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
  rowSelected(args) {
    this.dataSelected = this.grid.getSelectedRecords();
  }
  rowDeselected(args) {
    this.dataSelected = this.grid.getSelectedRecords();
  }
  toolbarClick(args) {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.grid.excelExport();
        // const selectedRecords = this.grid.getSelectedRecords();
        // const exportProperties = {
        //   dataSource: selectedRecords
        // };
        // this.grid.excelExport(exportProperties);
        break;
      /* tslint:enable */
      case 'Print QR Code':
        this.printData();
        break;
    }
  }
  formatDate(dateString) {
    const result = new Date(dateString);
    return result.toLocaleDateString() + ' ' + result.toLocaleTimeString();
  }
}
