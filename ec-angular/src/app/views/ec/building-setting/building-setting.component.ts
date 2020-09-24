import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { BuildingService } from 'src/app/_core/_service/building.service';
import { SettingService } from 'src/app/_core/_service/setting.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';

@Component({
  selector: 'app-building-setting',
  templateUrl: './building-setting.component.html',
  styleUrls: ['./building-setting.component.css']
})
export class BuildingSettingComponent implements OnInit {
  data: any;
  public filterSettings: object;
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  @ViewChild('gridBuilding') public gridBuilding: GridComponent;
  @ViewChild('gridSetting') public gridSetting: GridComponent;
  toolbarOptions: string[];
  buildings: object;
  settings: object;
  buildingID: any;
  constructor(
    private buildingService: BuildingService,
    private alertify: AlertifyService,
    private settingService: SettingService
  ) { }

  ngOnInit(): void {
    this.filterSettings = { type: 'Excel' };
    this.toolbarOptions = ['Excel Export', 'Search'];
    this.loadData();
  }
  /// api
  getBuildingForSetting() {
    return this.buildingService.getBuildingsForSetting().toPromise();
   }
  getSettingByBuilding(buildingID) {
    return this.settingService.getSettingByBuilding(buildingID).toPromise();
  }
  editSetting(model) {
    return this.settingService.updateSetting(model).toPromise();
  }
  createSetting(model) {
    return this.settingService.addSetting(model).toPromise();
  }
  deleteSetting(id) {
    return this.settingService.deleteSetting(id).toPromise();
  }
  /// end api
  async loadData() {
    try {
      this.buildings = await this.getBuildingForSetting();
    } catch (error) {
      this.alertify.error(error + '');
    }
  }

  async edit(data) {
    const model = {
      id: data.id,
      minRPM: data.minRPM,
      maxRPM: data.maxRPM,
      machineType: data.machineType,
      machineCode: data.machineCode,
      buildingID: this.buildingID
    };
    try {
      await this.editSetting(model);
      this.alertify.success('Success');
      this.getSettingByBuilding(this.buildingID);
    } catch (error) {
      this.alertify.error(error + '');
    }
  }
  async add(data) {
    const model = {
      id: 0,
      minRPM: data.minRPM,
      maxRPM: data.maxRPM,
      machineType: data.machineType,
      machineCcode: data.machineCode,
      buildingID: this.buildingID
    };
    try {
      await this.createSetting(model);
      this.alertify.success('Success');
      this.getSettingByBuilding(this.buildingID);
    } catch (error) {
      this.alertify.error(error + '');
    }
  }
  async delete(id) {
    try {
      await this.deleteSetting(id);
      this.alertify.success('Success');
      this.getSettingByBuilding(this.buildingID);
    } catch (error) {
      this.alertify.error(error + '');
    }
  }
  /// event
  actionCompleteSetting(e) {
    if (e.requestType === 'add') {
      (e.form.elements.namedItem('#') as HTMLInputElement).disabled = true;
    }
  }
 async actionBeginSetting(args) {
    if (args.requestType === 'save') {
      if (args.action === 'add') {
        await this.add(args.data);
      }
      if (args.action === 'edit') {
        await this.edit(args.data);
      }
    }
    if (args.requestType === 'delete') {
      await this.delete(args.data[0].id);
    }
  }
 async rowSelectedBuilding(args: any) {
    console.log(args);
    if (args.isInteracted) {
     this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Cancel', 'Excel Export', 'Search'];
     this.buildingID = args.data.id;
     this.settings = await this.getSettingByBuilding(this.buildingID);
    }
  }
  toolbarClick(args): void {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.gridSetting.excelExport();
        break;
      /* tslint:enable */
      case 'PDF Export':
        break;
    }
  }
  toolbarClickBuilding(args): void {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.gridBuilding.excelExport();
        break;
      /* tslint:enable */
      case 'PDF Export':
        break;
    }
  }
  /// end event
  NO(index) {
    return +index + 1;
  }
}
