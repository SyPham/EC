import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalNameService } from 'src/app/_core/_service/modal-name.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent, ExcelExportProperties, Column } from '@syncfusion/ej2-angular-grids';
import { BuildingUserService } from 'src/app/_core/_service/building.user.service';
import { environment } from '../../../../environments/environment';
import { BPFCEstablishService } from 'src/app/_core/_service/bpfc-establish.service';
import { DatePipe } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-BPFCSchedule',
  templateUrl: './BPFCSchedule.component.html',
  styleUrls: ['./BPFCSchedule.component.css'],
  providers: [DatePipe]
})
export class BPFCScheduleComponent implements OnInit {
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  data: any[];
  editSettings: object;
  toolbar: object;
  file: any;

  @ViewChild('grid')
  public gridObj: GridComponent;
  modalReference: NgbModalRef;
  @ViewChild('importModal', { static: true })
  importModal: TemplateRef<any>;
  excelDownloadUrl: string;
  users: any[];
  filterSettings: { type: string; };
  constructor(
    private modelNameService: ModalNameService,
    private alertify: AlertifyService,
    private buildingUserService: BuildingUserService,
    private bPFCEstablishService: BPFCEstablishService,
    public modalService: NgbModal,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.excelDownloadUrl = `${environment.apiUrlEC}ModelName/ExcelExport`;
    this.toolbar = ['Import Excel', 'Export Excel', 'Search'];
    this.filterSettings = { type: 'Excel' };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Normal' };
    this.getAllUsers();
  }

  actionBegin(args) {
    if (args.requestType === 'save') {
      const entity = {
        id: args.data.id,
        season: args.data.season
      };
      this.bPFCEstablishService.updateSeason(entity).subscribe(() => {
        this.alertify.success('Update Season Success');
        this.getAllUsers();
      });
    }
  }

  toolbarClick(args) {
    switch (args.item.text) {
      case 'Import Excel':
        this.showModal(this.importModal);
        break;
      case 'Export Excel':
        const data = this.data.map(item => {
          return {
            approvedBy: item.approvedBy,
            approvalStatus: item.approvalStatus,
            createdBy: item.createdBy,
            articleNo: item.articleNo,
            createdDate: this.datePipe.transform(item.createdDate, 'MM-dd-yyyy'),
            artProcess: item.artProcess,
            finishedStatus: item.finishedStatus === true ? 'Yes' : 'No',
            BPFCName: item.modelName + ' - ' + item.modelNo,
            season: item.season
          };
        });
        const exportProperties = {
          dataSource: data
        };
        this.gridObj.excelExport(exportProperties);
        break;
    }
  }

  fileProgress(event) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    const createdBy = JSON.parse(localStorage.getItem('user')).User.ID;
    this.bPFCEstablishService.import(this.file, createdBy)
    .subscribe((res: any) => {
      this.getAll();
      this.modalReference.close();
      this.alertify.success('The excel has been imported into system!');
    });
  }


  getAllUsers() {
    this.buildingUserService.getAllUsers(1, 1000).subscribe((res: any) => {
      this.users = res.result;
      this.getAll();
    });
  }

  getAll() {
    this.bPFCEstablishService.getAll().subscribe( (res: any) => {
      this.data = res.map( (item: any) => {
        return {
          id: item.id,
          modelName: item.modelName,
          modelNo: item.modelNo,
          createdDate: new Date(item.createdDate),
          articleNo: item.articleNo,
          approvalStatus: item.approvalStatus,
          finishedStatus: item.finishedStatus,
          approvedBy: this.users.filter(a => a.ID === item.approvalBy)[0]?.Username,
          createdBy: item.createdBy,
          artProcess: item.artProcess,
          season: item.season
        };
      });
    });
  }

  showModal(importModal) {
    this.modalReference = this.modalService.open(importModal, { size: 'xl' });
  }
  NO(index) {
    return (this.gridObj.pageSettings.currentPage - 1) * this.gridObj.pageSettings.pageSize + Number(index) + 1;
  }
}
