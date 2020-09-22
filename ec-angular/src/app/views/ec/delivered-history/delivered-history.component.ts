import { Component, OnInit, ViewChild } from '@angular/core';
import { MakeGlueService } from 'src/app/_core/_service/make-glue.service';
import { BuildingUserService } from 'src/app/_core/_service/building.user.service';
import { GridComponent, FilterService, FilterType } from '@syncfusion/ej2-angular-grids';
import { rejects } from 'assert';
@Component({
  selector: 'app-delivered-history',
  templateUrl: './delivered-history.component.html',
  styleUrls: ['./delivered-history.component.css'],
  providers: [FilterService]
})
export class DeliveredHistoryComponent implements OnInit {
  data: any;
  users: { ID: any; Username: any; Email: any; }[];
  public filterSettings: object;
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10};
  @ViewChild('grid') public grid: GridComponent;
  toolbarOptions: string[];
  constructor(
    private makeGlueService: MakeGlueService,
    private buildingUserService: BuildingUserService,
  ) { }

  ngOnInit(): void {
    this.filterSettings = { type: 'Excel' };
    this.toolbarOptions = ['Excel Export', 'Search'];
    this.loadData();
  }
  toolbarClick(args): void {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.grid.excelExport();
        break;
      /* tslint:enable */
      case 'PDF Export':
        break;
    }
  }
  getUsers() {
    return new Promise((resolve, reject) => {
      this.buildingUserService.getAllUsers(1, 1000).subscribe(res => {
        const data = res.result.map((i: any) => {
          return {
            ID: i.ID,
            Username: i.Username,
            Email: i.Email
          };
        });
        this.users = data;
        resolve(true);
      }, err => {
        reject(false);
      });
    });
  }
  username(id) {
    return (this.users.find(item => item.ID === id) as any).Username;
  }
  async loadData() {
    try {
      const result = await this.getUsers();
      if (result) {
        this.deliveredHistory();
      }
    } catch (error) {
      console.log(error + '');
    }
  }
  deliveredHistory() {
    this.makeGlueService.deliveredHistory()
      .subscribe((res: any) => {
       this.data = res.map( (item: any) => {
         return {
           glueName: item.glueName,
           buildingName: item.buildingName,
           qty: item.qty,
           deliveredBy: this.username(item.createdBy),
           createdDate: new Date(item.createdDate)
         };
       });
      });
  }
  NO(index) {
    return (this.grid.pageSettings.currentPage - 1) * this.grid.pageSettings.pageSize + Number(index) + 1;
  }
}
