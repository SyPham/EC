import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/_core/_service/account.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { EditService, ToolbarService, PageService, PageSettingsModel, ToolbarItems, GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [ToolbarService, EditService, PageService]
})
export class AccountComponent implements OnInit {
  userData: object;
  buildings: [];
  fieldsBuilding: object = { text: 'name', value: 'name' };
  editSettings: object;
  buildingUsers: [];
  user: any;
  password: any;
  userID: number;
  buildingID: number;
  toolbar: ToolbarItems[];
  passwordFake: any;
  pageSettings: PageSettingsModel;
  @ViewChild('grid')
  public grid: GridComponent;
  constructor(
    private accountService: AccountService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.password = '';
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    this.pageSettings = { currentPage: 1, pageSize: 20 };
    this.editSettings = { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.passwordFake = `aRlG8BBHDYjrood3UqjzRl3FubHFI99nEPCahGtZl9jvkexwlJ`;
    this.getBuildingUsers();
    this.getBuildings();
    this.getAllUsers();
  }
  // life cycle ejs-grid
  createdUsers() {
  }
  actionBegin(args) {
    if (args.requestType === 'save' && args.action === 'add') {
      this.user = {
        id: 0,
        username: args.data.Username,
        password: this.password,
        email: args.data.Email,
        roleid: 2,
        employeeID: args.data.EmployeeID,
        isLeader: false
      };
      this.create();
    }
    if (args.requestType === 'save' && args.action === 'edit') {
      this.user = {
        id: args.data.ID,
        username: args.data.Username,
        password: this.password,
        email: args.data.Email,
        roleid: 2,
        employeeID: args.data.EmployeeID,
        isLeader: false
      };
      this.update();
      this.mapBuildingUser(this.userID, this.buildingID);

    }
    if (args.requestType === 'delete') {
      this.delete(args.data[0].ID);
    }
  }

  actionComplete(args) {
    if (args.requestType === 'edit') {
      (args.form.elements.namedItem('ID') as HTMLInputElement).disabled = true;
      (args.form.elements.namedItem('Password') as HTMLInputElement).disabled = true;
    }
    if (args.requestType === 'add') {
      (args.form.elements.namedItem('ID') as HTMLInputElement).disabled = true;
    }
  }
  dataBound() {
    document.querySelectorAll('button[aria-label=Update] > span.e-tbar-btn-text')[0].innerHTML = 'Save';
  }
  // end life cycle ejs-grid

  // api
  onChangeBuilding(args, data) {
    this.userID = data.ID;
    this.buildingID = args.itemData.id;
  }
  getBuildings() {
    this.accountService.getBuildings().subscribe((res: any) => {
      this.buildings = res || [];
    });
  }
  getAllUsers() {
    this.accountService.getAllUsers(1, 10000).subscribe(res => {
      const users = res.result.map((item: any) => {
        return {
          ID: item.ID,
          Username: item.Username,
          Password: this.passwordFake + item.ID,
          Email: item.Email,
          EmployeeID: item.EmployeeID,
          BuildingName: this.buildingTempate(item.ID)
        };
      });
      this.userData = users;

    });
  }
  getBuildingUsers() {
    this.accountService.getBuildingUsers().subscribe(res => {
      this.buildingUsers = res as any;
    });
  }
  mapBuildingUser(userid, buildingid) {
    if (userid !== undefined && buildingid !== undefined) {
      this.accountService.mapBuildingUser(userid, buildingid).subscribe((res: any) => {
        if (res.status) {
         this.alertify.success(res.message);
         this.getBuildingUsers();
         this.getAllUsers();

        } else {
         this.alertify.success(res.message);
        }
       });
    }
  }
  delete(id) {
    this.accountService.deleteUser(id).subscribe(res => {
      this.alertify.success('The user has been deleted!');
      this.getAllUsers();
    });
  }
  create() {
    this.accountService.createUser(this.user).subscribe((res: number) => {
      this.alertify.success('The user has been created!');
      if (res > 0) {
        this.mapBuildingUser(res, this.buildingID);
        this.getAllUsers();
        this.password = '';
      }
    });
  }
  update() {
    this.accountService.updateUser(this.user).subscribe(res => {
      this.alertify.success('The user has been updated!');
      this.getAllUsers();
      this.password = '';
    });
  }
  // end api

  // template ejs-grid
    buildingTempate(userid): string {
      const buildingUser = this.buildingUsers.filter((item: any) => item.userID === userid) as any[];
      if (buildingUser.length === 0) {
        return '#N/A';
      }
      const buildingID = buildingUser[0].buildingID || 0;
      const building = this.buildings.filter((item: any) => item.id === buildingID) as any[];
      if (building.length === 0) {
        return '#N/A';
      }
      const buildingName = building[0].name;
      return buildingName || '#N/A';
    }
  // end template ejs-grid
}
