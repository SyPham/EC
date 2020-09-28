import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { DatePipe } from '@angular/common';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { SettingService } from 'src/app/_core/_service/setting.service';
import { StirService } from 'src/app/_core/_service/stir.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { ActivatedRoute } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-stir',
  templateUrl: './stir.component.html',
  styleUrls: ['./stir.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    DatePipe
  ]
})
export class StirComponent implements OnInit {
  STIRRED = 1;
  NOT_STIRRED_YET = 0;
  NA = 2;
  modalReference: NgbModalRef;
  public filterSettings = { type: 'Excel' };
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  @ViewChild('grid') public grid: GridComponent;
  toolbarOptions = ['Excel Export', 'Search'];
  public value: any =  '';
  public dateValue: any =  '';
  public Envalue: any =  '';
  public interval = 1;
  public customFormat = 'HH:mm:ss a';
  public ingredients: any = [];
  public building = JSON.parse(localStorage.getItem('level'));
  timeStir = 0 ;
  glueID: number;
  settingID: number ;
  settingData: object = [];
  glues: any;
  glueName: any;
  rpm = 0;
  minutes = 0;
  totalMinutes = 0;
  status: boolean;
  stir: any;
  constructor(
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    public ingredientService: IngredientService,
    public settingService: SettingService,
    public stirService: StirService,
  ) { }
  public ngOnInit(): void {
    this.getAllSetting();
    this.onRouteChange();
  }
  onRouteChange() {
    this.route.data.subscribe(data => {
      this.glueName = this.route.snapshot.params.glueName;
      this.loadStir();
    });
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
  onChange(args, data) {
    console.log(args);
    this.settingID = args.value ;
    const minTime = '0001-01-01T00:00:00';
    const startTime = new Date();
    const endTime = new Date ();
    if (this.settingID === 1) {
      endTime.setMinutes(startTime.getMinutes() + 4);
    } else {
      endTime.setMinutes(startTime.getMinutes() + 6);
    }
    for (const key in this.glues) {
      if (this.glues[key].id === data.id) {
        if (args.value === 'NA') {
          this.glues[key].startTime = minTime;
          this.glues[key].endTime = minTime;
          this.glues[key].settingID = null;
          this.glues[key].x = true;
          break;
        } else {
          this.glues[key].startTime = startTime;
          this.glues[key].endTime = endTime;
          this.glues[key].settingID = args.value;
          this.glues[key].x = false;
          break;
        }
      }
    }
    this.grid.refresh();
    console.log(this.glues);
  }
  getStirInfo(glueName): Promise<any> {
    return this.stirService.getStirInfo(glueName).toPromise();
  }
  getRPM(mixingInfoID, building, startTime, endTime ): Promise<any> {
    return this.stirService.getRPM(mixingInfoID, 'E', startTime, endTime ).toPromise();
  }
  getRPMByMachineCode(machineCode, startTime, endTime): Promise<any> {
    return this.stirService.getRPMByMachineCode(machineCode, startTime, endTime).toPromise();
  }
  async loadStir() {
    try {
      const result = await this.getStirInfo(this.glueName);
      const res = result.map((item: any) => {
        return {
          id: item.id,
          stirID: item.stirID,
          glueName: item.glueName,
          // tslint:disable-next-line:max-line-length
          qty: parseFloat(item.chemicalA) || 0 + parseFloat(item.chemicalB) || 0 + parseFloat(item.chemicalC) || 0 + parseFloat(item.chemicalD) || 0 + parseFloat(item.chemicalE) || 0,
          createdTime: item.createdTime,
          mixingStatus: item.mixingStatus,
          startTime: item.startTime,
          endTime: item.endTime,
          settingID: item.settingID,
          status: item.status,
          totalMinutes: item.totalMinutes,
          rpm: item.rpm,
          machineType: item.machineType,
          x: false
        };
      });
      this.glues = res;
    } catch (error) {
      this.alertify.error(error + '');
    }
  }
  async loadRPM(mixingInfoID, building, startTime, endTime) {
    try {
      const obj = await this.getRPM(mixingInfoID, building, startTime, endTime );
      if (obj.rpm === 0) {
        this.alertify.warning('Không tìm thấy rpm trong khoản thời gian này!', true);
        this.modalReference.close();
        return;
      }
      this.rpm = obj.rpm;
      this.minutes = obj.minutes;
      this.totalMinutes = obj.totalMinutes;
    } catch (error) {
      this.alertify.error(error + '');
    }
  }
  async loadRPMByMachineCode(machineCode, startTime, endTime) {
    try {
      const obj = await this.getRPMByMachineCode(machineCode, startTime, endTime);
      if (obj.rpm === 0) {
        this.alertify.warning(`Can not find the RPM at this moment!!! <br> Không tìm thấy RPM trong khoản thời gian này!`, true);
        this.modalReference.close();
        return;
      }
      this.rpm = obj.rpm;
      this.minutes = obj.minutes;
      this.totalMinutes = obj.totalMinutes;
    } catch (error) {
      this.alertify.error(error + '');
    }
  }

  saveStir(data) {
    console.log(data);
    if (data.settingID === null && data.x === false) {
      this.alertify.warning(`Please select glue type radio button first!!!<br> Hãy chọn loại keo trước!!!`, true);
      return;
    }
    const model = {
      id: 0,
      rpm: 0,
      totalMinutes: 0,
      status: false,
      glueName: data.glueName,
      settingID: data.settingID,
      mixingInfoID: data.id,
      startTime: this.datePipe.transform(data.startTime as Date, 'yyyy-MM-dd HH:mm:ss'),
      endTime: this.datePipe.transform(data.endTime as Date, 'yyyy-MM-dd HH:mm:ss')
    };
    this.settingService.AddStir(model).subscribe((res) => {
      this.alertify.success('Success');
      this.loadStir();
    });
  }

  updateStir() {
    const model = {
      id: this.stir.stirID,
      rpm: this.rpm,
      totalMinutes: this.totalMinutes,
      status: this.status,
      glueName: this.stir.glueName,
      settingID: this.stir.settingID,
      mixingInfoID: this.stir.mixingInfoID,
      startTime: this.stir.startTime,
      endTime: this.stir.endTime
    };
    this.settingService.updateStir(model).subscribe((res) => {
      this.alertify.success('Success');
      this.modalReference.close();
      this.loadStir();
    });
  }

  getAllSetting() {
    let level = this.building.level;
    if ([1, 2, 3, 4, 5].includes(level)) {
      level = 8;
    }
    this.settingService.getSettingByBuilding(level).subscribe((res) => {
    this.settingData = res ;
    });
  }
  NO(index) {
    return (this.grid.pageSettings.currentPage - 1) * this.grid.pageSettings.pageSize + Number(index) + 1;
  }
  async showModal(name, data) {
    console.log('show modal', data);
    this.stir = data;
    this.modalReference = this.modalService.open(name, { size: 'lg' });
    const startTime = this.datePipe.transform(data.startTime, 'yyyy-MM-dd HH:mm:ss');
    const endTime = this.datePipe.transform(data.endTime, 'yyyy-MM-dd HH:mm:ss');
    if (data.settingID === 1) {
      this.status = this.totalMinutes <= 4 ? true : false;
    }
    if (data.settingID === 2) {
      this.status = this.totalMinutes <= 6 ? true : false;
    }
    await this.loadRPMByMachineCode(data.machineCode, startTime, endTime);
  }
}
