import { Component, OnInit } from '@angular/core';
import { BuildingService } from 'src/app/_core/_service/building.service';
import { BuildingUserService } from 'src/app/_core/_service/building.user.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';

@Component({
  selector: 'app-building-user',
  templateUrl: './building-user.component.html',
  styleUrls: ['./building-user.component.css']
})
export class BuildingUserComponent implements OnInit {

  toolbar: object;
  data: any;
  buildingID: number;
  userData: any;
  buildingUserData: any;
  constructor(
    private buildingService: BuildingService,
    private alertify: AlertifyService,
    private buildingUserService: BuildingUserService
  ) { }

  ngOnInit() {
    this.toolbar = ['Search'];
  }
  created() {
    this.getBuildingsAsTreeView();
  }
  createdUsers() {
    this.getAllUsers();
  }
  contextMenuClick(args) { }
  actionComplete(args) { }
  rowSelected(args) {
    const data = args.data.entity || args.data;
    this.buildingID = Number(data.id);
    if (args.isInteracted) {
      this.getBuildingUserByBuildingID(this.buildingID);
    }
  }
  getBuildingsAsTreeView() {
    this.buildingService.getBuildingsAsTreeView().subscribe(res => {
      this.data = res;
    });
  }
  mappingUserWithBuilding(obj) {
    this.buildingUserService.mappingUserWithBuilding(obj).subscribe((res: any) => {
      if (res.status) {
        this.alertify.success(res.message);
      } else {
        this.alertify.warning(res.message, true);
      }
    });
  }
  removeBuildingUser(obj) {
    this.buildingUserService.removeBuildingUser(obj).subscribe((res: any) => {
      if (res.status) {
        this.alertify.success(res.message);
      } else {
        this.alertify.warning(res.message, true);
      }
    });
  }
  getAllUsers() {
    this.buildingUserService.getAllUsers(1, 1000).subscribe(res => {
      const data = res.result.map((i: any) => {
        return {
          ID: i.ID,
          Username: i.Username,
          Email: i.Email,
          Status: this.checkStatus(i.ID)
        };
      });
      this.userData = data.filter(item => item.Status === true);
    });
  }

  getBuildingUserByBuildingID(buildingID) {
    this.buildingUserService.getBuildingUserByBuildingID(buildingID).subscribe(res => {
      this.buildingUserData = res || [];
      this.getAllUsers();
    });
  }
  checkStatus(userID) {
    this.buildingUserData = this.buildingUserData || [];
    const item = this.buildingUserData.filter(i => {
      return i.userID === userID && i.buildingID === this.buildingID;
    });
    if (item.length <= 0) {
      return false;
    } else {
      return true;
    }
  }
  onChangeMap(args, data) {
    if (this.buildingID > 0) {
      if (args.checked) {
        const obj = {
          userID: data.ID,
          buildingID: this.buildingID
        };
        this.mappingUserWithBuilding(obj);
      } else {
        const obj = {
          userID: data.ID,
          buildingID: this.buildingID
        }
        this.removeBuildingUser(obj);
      }
    } else {
      this.alertify.warning('Please select a building!', true);
    }
  }
}
