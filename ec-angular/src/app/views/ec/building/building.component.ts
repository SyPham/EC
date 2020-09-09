import { Component, OnInit, ViewChild } from '@angular/core';
import { BuildingService } from 'src/app/_core/_service/building.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuildingModalComponent } from './building-modal/building-modal.component';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
  toolbar: object;
  data: any;
  editing: any;

  contextMenuItems: any;
  pageSettings: any;
  editparams: { params: { format: string; }; };
  @ViewChild('treegrid')
  public treeGridObj: TreeGridComponent;
  @ViewChild('buildingModal')
  buildingModal: any;
  building: { id: 0, name: '', level: 0, parentID: 0 };
  edit: { id: 0, name: '', level: 0, parentID: 0 };
  constructor(
    private buildingService: BuildingService,
    private modalService: NgbModal,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.editing = { allowDeleting: true, allowEditing: true, mode: 'Row' };
    this.toolbar = ['Add', 'Delete', 'Search', 'Update', 'Cancel'];
    this.optionTreeGrid();
    this.onService();
  }
  optionTreeGrid() {
    this.contextMenuItems = [
      {
        text: 'Add-Sub Item',
        iconCss: ' e-icons e-add',
        target: '.e-content',
        id: 'Add-Sub-Item'
      },
      {
        text: 'Delete',
        iconCss: ' e-icons e-delete',
        target: '.e-content',
        id: 'DeleteOC'
      }
    ];
    this.toolbar = [
      'Add',
      'Search',
      'ExpandAll',
      'CollapseAll',
      'ExcelExport',
      'PdfExport'
    ];
    this.editing = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' };
    this.pageSettings = { pageSize: 20 };
    this.editparams = { params: { format: 'n' } };
  }
  created() {
    this.getBuildingsAsTreeView();
  }
  onService() {
    this.buildingService.currentMessage
      .subscribe(arg => {
        if (arg === 200) {
          this.getBuildingsAsTreeView();
        }
      });
  }
  toolbarClick(args) {
    switch (args.item.text) {
      case 'Add':
        args.cancel = true;
        this.openMainModal();
        break;
      case 'PDF Export':
        this.treeGridObj.pdfExport({ hierarchyExportMode: 'All' });
        break;
      case 'Excel Export':
        this.treeGridObj.excelExport({ hierarchyExportMode: 'All' });
        break;
      default:
        break;
    }
  }
  contextMenuClick(args) {
    switch (args.item.id) {
      case 'DeleteOC':
        this.delete(args.rowInfo.rowData.entity.id);
        break;
      case 'Add-Sub-Item':
        this.openSubModal();
        break;
      default:
        break;
    }
  }
  delete(id) {
    this.alertify.confirm(
      'Delete Project',
      'Are you sure you want to delete this BuildingID "' + id + '" ?',
      () => {
        this.buildingService.delete(id).subscribe(res => {
          this.getBuildingsAsTreeView();
          this.alertify.success('The building has been deleted!!!');
        },
        error => {
          this.alertify.error('Failed to delete the building!!!');
        });
      }
    );
   }
  actionComplete(args) {
    if (args.requestType === 'save') {
      this.edit.name = args.data.entity.name;
      this.rename();
    }
   }
  rowSelected(args) {
    this.edit = {
      id: args.data.entity.id,
      name: args.data.entity.name,
      level: args.data.entity.level,
      parentID: args.data.entity.parentID,
    };
    this.building = {
      id: 0,
      name: '',
      parentID: args.data.entity.id,
      level: 0
    };
  }
  getBuildingsAsTreeView() {
    this.buildingService.getBuildingsAsTreeView().subscribe(res => {
      this.data = res;
    });
  }
  clearFrom() {
    this.building = {
      id: 0,
      name: '',
      parentID: 0,
      level: 0
    };
  }
  rename() {
    this.buildingService.rename(this.edit).subscribe(res => {
      this.getBuildingsAsTreeView();
      this.alertify.success('The building has been changed!!!');
    });
  }
  openMainModal() {
    this.clearFrom();
    const modalRef = this.modalService.open(BuildingModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Add Main Building';
    modalRef.componentInstance.building = this.building;
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
  openSubModal() {
    const modalRef = this.modalService.open(BuildingModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Add Sub Building';
    modalRef.componentInstance.building = this.building;
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
}
