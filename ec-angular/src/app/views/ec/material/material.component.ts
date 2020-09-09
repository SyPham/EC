import { Component, OnInit } from '@angular/core';
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
  editparams: object;
  editSettings: object;
  toolbarOptions = ['Search' ];
  toolbar: string[];
  grid: GridComponent;
  searchSettings: any = { hierarchyMode: 'Parent' } ;
  pageSettings: { pageSize: number; };
  constructor(
    private materialService: MaterialService,
    private alertify: AlertifyService,
    ) { }

  ngOnInit() {
    this.pageSettings = { pageSize: 6 };
    this.material = {
      id: 0,
      name: ''
    };
    this.editparams = { params: { popupHeight: '300px' } };
    this.editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Delete', 'Search'];
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
    this.materialService.create(this.material).subscribe(() => {
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
  actionBegin(args) {
    if (args.requestType === 'beginEdit') {
      this.material.name = args.rowData.name ;
    }
    if (args.requestType === 'save' ) {
      this.material.id = args.data.id ;
      this.material.name = args.data.name;
      this.update();
    }
  }
  // end event
}
