import { Component, OnInit, ViewChild } from '@angular/core';
import { MakeGlueService } from 'src/app/_core/_service/make-glue.service';
import { BuildingUserService } from 'src/app/_core/_service/building.user.service';
import { GridComponent, FilterService, FilterType } from '@syncfusion/ej2-angular-grids';
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
  @ViewChild('grid') public grid: GridComponent;
  constructor(
    private makeGlueService: MakeGlueService,
    private buildingUserService: BuildingUserService,
  ) { }

  ngOnInit(): void {
    this.filterSettings = { type: 'Excel' };
    this.getUsers();
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
      this.deliveredHistory();
    });
  }
  username(id) {
    return (this.users.find(item => item.ID === id) as any).Username;
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
}
