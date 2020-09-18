import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { MaterialService } from 'src/app/_core/_service/material.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  material: any;
  data: any;
  editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  toolbarOptions = ['ExcelExport', 'Add', 'Edit', 'Delete', 'Cancel', 'Search'];
  @ViewChild('grid') grid: GridComponent;
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  filterSettings = { type: 'Excel' };
  constructor(
    private materialService: MaterialService,
    private alertify: AlertifyService,
    ) { }

  ngOnInit() {
    this.material = {
      id: 0,
      name: ''
    };
    this.editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.getAllMaterial();
  }
  // api
  getAllMaterial() {
    this.materialService.getAllMaterial().subscribe(res => {
      this.data = res ;
    });
  }
  create() {
    this.materialService.create(this.material).subscribe(() => {
      this.alertify.success('Add Material Successfully');
      this.getAllMaterial();
      this.material.name = '';
    });
  }

  update() {
    this.materialService.update(this.material).subscribe(() => {
      this.alertify.success('Add Material Successfully');
      // this.modalReference.close() ;
      this.getAllMaterial();
      this.material.name = '';
    });
  }
  delete(id) {
    this.alertify.confirm('Delete Material', 'Are you sure you want to delete this Material "' + id + '" ?', () => {
      this.materialService.delete(id).subscribe(() => {
        this.getAllMaterial();
        this.alertify.success('The material has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the material');
      });
    });
  }
  // end api

  // grid event
  toolbarClick(args): void {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.grid.excelExport();
        break;
      /* tslint:enable */
      default:
        break;
    }
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      if (args.action === 'add') {
        this.material.id = 0;
        this.material.name = args.data.name;
        this.create();
      }
      if (args.action === 'edit') {
        this.material.id = args.data.id;
        this.material.name = args.data.name;
        this.update();
      }
    }
    if (args.requestType === 'delete') {
      this.delete(args.data[0].id);
    }
  }
  actionComplete(e: any): void {
    if (e.requestType === 'add') {
      (e.form.elements.namedItem('name') as HTMLInputElement).focus();
      (e.form.elements.namedItem('id') as HTMLInputElement).disabled = true;
    }
  }
  // end event
  NO(index) {
    return (this.grid.pageSettings.currentPage - 1) * this.grid.pageSettings.pageSize + Number(index) + 1;
  }
}
