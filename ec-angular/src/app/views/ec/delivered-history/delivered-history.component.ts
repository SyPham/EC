import { Component, OnInit } from '@angular/core';
import { MakeGlueService } from 'src/app/_core/_service/make-glue.service';
import { BuildingUserService } from 'src/app/_core/_service/building.user.service';

@Component({
  selector: 'app-delivered-history',
  templateUrl: './delivered-history.component.html',
  styleUrls: ['./delivered-history.component.css']
})
export class DeliveredHistoryComponent implements OnInit {
  data: any;
  users: { ID: any; Username: any; Email: any; }[];
  constructor(
    private makeGlueService: MakeGlueService,
    private buildingUserService: BuildingUserService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.deliveredHistory();
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
    });
  }
  username(id) {
    return (this.users.find(item => item.ID === id) as any).Username;
  }
  deliveredHistory() {
    this.makeGlueService.deliveredHistory()
      .subscribe(res => {
       this.data = res;
      });
  }
}
