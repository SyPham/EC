import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalNameService } from 'src/app/_core/_service/modal-name.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent, ExcelExportProperties, Column } from '@syncfusion/ej2-angular-grids';
import { BuildingUserService } from 'src/app/_core/_service/building.user.service';
import { environment } from '../../../../environments/environment';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { BPFCEstablishService } from 'src/app/_core/_service/bpfc-establish.service';

@Component({
  selector: 'app-established-record',
  templateUrl: './established-record.component.html',
  styleUrls: ['./established-record.component.css']
})
export class EstablishedRecordComponent implements OnInit {
  @ViewChild('sample')
    public listObj: DropDownListComponent;
    public fields: object = { text: 'Name', value: 'Id' };
    public waterMark = 'Select a status';
    public value = '1';
    public sportsData: object[] = [
      { Id: 0, Name: 'Unknown' },
      { Id: 1, Name: 'Done' },
      { Id: 2, Name: 'All' },

  ];
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 12 };
  status = 0;
  startBuildingDate: object = new Date();
  endBuildingDate: object = new Date();
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
  constructor(
    private modelNameService: ModalNameService,
    private alertify: AlertifyService,
    private buildingUserService: BuildingUserService,
    private bPFCEstablishService: BPFCEstablishService,
    public modalService: NgbModal,
  ) { }

  ngOnInit() {
    // 'Add', 'Edit', 'Delete', 'Update', 'Cancel',
    this.excelDownloadUrl = `${environment.apiUrlEC}ModelName/ExcelExport`;
    this.toolbar = ['Export Excel', 'Search'];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Normal' };
    this.getAllUsers();
  }
  public onChange(args: any): void {
    // let value: Element = document.getElementById('value');
    // let text: Element = document.getElementById('text');
    // // update the text and value property values in property panel based on selected item in DropDownList
    // value.innerHTML = this.listObj.value.toString();
    // text.innerHTML = this.listObj.text;
    this.status = args.value;
}
  toolbarClick(args) {
    switch (args.item.text) {
      case 'Import Excel':
        this.showModal(this.importModal);
        break;
      case 'Export Excel':
        const data = this.data.map(item => {
          return {
            id: item.id,
            season: item.season,
            supplier: item.supplier,
            modifiedDate: item.modifiedDate,
            buildingDate: item.buildingDate,
            bpfcName: `${item.modelName } - ${item.modelNo } - ${item.articleNo } - ${item.artProcess }`,
          };
        });
        const exportProperties = {
          dataSource: data
        };
        this.gridObj.excelExport(exportProperties);
        break;
    }
  }
  createdBy(item) {
    return this.users.filter(a => a.ID === item.approvedBy)[0]?.Username;
  }
  fileProgress(event) {
    this.file = event.target.files[0];
  }
  uploadFile() {
    const createdBy = JSON.parse(localStorage.getItem('user')).User.ID;
    this.modelNameService.import(this.file, createdBy)
      .subscribe((res: any) => {
        this.getAll();
        this.modalReference.close();
        this.alertify.success('The excel has been imported into system!');
      });
  }
  getAllUsers() {
    this.buildingUserService.getAllUsers(1, 1000).subscribe((res: any) => {
      this.users = res.result;
      this.filterByStartBuildingToEndBuilding(this.startBuildingDate, this.endBuildingDate);
    });
  }
  getAll() {
    this.bPFCEstablishService.getAll().subscribe((res: any) => {
      this.data = res;
    });
  }
  showModal(importModal) {
    this.modalReference = this.modalService.open(importModal, { size: 'xl' });
  }
  filterByStatus(status) {
    this.bPFCEstablishService.filterByStatus(status).subscribe((res: any) => {
      this.data = res;
    });
  }
  filterByStatusStartBuildingToEndBuilding(status, start, end) {
    this.bPFCEstablishService.filterByStatusStartBuildingToEndBuilding(status, start.toDateString(), end.toDateString())
    .subscribe((res: any) => {
      this.data = res;
    });
  }
  filterByStartBuildingToEndBuilding(start, end) {
    this.bPFCEstablishService.filterByStartBuildingToEndBuilding(start.toDateString(), end.toDateString()).subscribe((res: any) => {
      this.data = res;
    });
  }
  onClickFilter() {
    if (this.status !== 0) {
      this.filterByStatus(this.status);
    }
    if (this.status !== 0 && this.startBuildingDate && this.endBuildingDate) {
      this.filterByStatusStartBuildingToEndBuilding(this.status, this.startBuildingDate, this.endBuildingDate);
    }
    if (this.startBuildingDate && this.endBuildingDate) {
      this.filterByStartBuildingToEndBuilding(this.startBuildingDate, this.endBuildingDate);
    }
  }
  articleNo(data) {
    if (data) {
      return data.map(item => {
        return item.name;
      }).join(',');
    }
    return '#N/A';
  }
  NO(index) {
    return (this.gridObj.pageSettings.currentPage - 1) * this.gridObj.pageSettings.pageSize + Number(index) + 1;
  }
}
