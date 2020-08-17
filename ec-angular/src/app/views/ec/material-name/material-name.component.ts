import { Component, OnInit } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-treegrid';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { LineService } from 'src/app/_core/_service/line.service';
import { PlanService } from 'src/app/_core/_service/plan.service';
import { GlueIngredientService } from 'src/app/_core/_service/glue-ingredient.service';
import { ModalNameService } from 'src/app/_core/_service/modal-name.service';
import { GlueService } from 'src/app/_core/_service/glue.service';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { MaterialService } from 'src/app/_core/_service/material.service';
import { IMaterial } from 'src/app/_core/_model/IMaterial';

@Component({
  selector: 'app-material-name',
  templateUrl: './material-name.component.html',
  styleUrls: ['./material-name.component.css']
})
export class MaterialNameComponent implements OnInit {
  public pageSettings: PageSettingsModel;
  public toolbarOptions = ['Search'];
  public editSettings: object;
  public toolbar: string[];
  public editparams: object;
  public grid: GridComponent;
  modalReference: NgbModalRef;
  public data: object[];
  searchSettings: any = { hierarchyMode: 'Parent' };

  modalSup: IMaterial = {
    id: 0,
    name: ''
  };
  public textGlueLineName = 'Select ';
  public fieldsGlue: object = { text: 'name', value: 'name' };
  public fieldsGlueEdit: object = { text: 'name', value: 'name' };
  public supplier: object[];
  public lineName: object[];
  public modelName: object[];
  public glueName: object[];
  public setFocus: any;
  lineNameEdit: any;
  glueNameEdit: any;
  modelNameEdit: any;
  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    public modalService: NgbModal,
    private materialService: MaterialService,
  ) { }

  ngOnInit(): void {
    this.pageSettings = { pageSize: 20 };
    this.editparams = { params: { popupHeight: '300px' } };
    this.editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Delete', 'Search', 'Update', 'Cancel'];
    this.getAllMaterial();
  }

  getAllMaterial() {
    this.materialService.getAllMaterial().subscribe(res => {
      this.supplier = res;
    });
  }
  actionBegin(args) {
    if (args.requestType === 'beginEdit') {
      this.modalSup.name = args.rowData.name;
    }
    if (args.requestType === 'save') {
      this.modalSup.id = args.data.id || 0;
      this.modalSup.name = args.data.name;
      if (args.data.id > 0) {
        this.update(this.modalSup);
      } else {
        this.add(this.modalSup);
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
  onDoubleClick(args: any): void {
    console.log('onDoubleClick', args);
    this.setFocus = args.column;  // Get the column from Double click event
  }
  delete(id) {
    this.alertify.confirm('Delete Supplier', 'Are you sure you want to delete this Material "' + id + '" ?', () => {
      this.materialService.delete(id).subscribe(() => {
        this.getAllMaterial();
        this.alertify.success('Material has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Material');
      });
    });
  }
  update(modalSup) {
    this.materialService.update(modalSup).subscribe(res => {
      this.alertify.success('Updated successed!');
      this.getAllMaterial();
    });
  }
  add(modalSup) {
    this.materialService.create(modalSup).subscribe(() => {
      this.alertify.success('Add Material Successfully');
      this.getAllMaterial();
      this.modalSup.name = '';
    });
  }
  save() {
    this.materialService.create(this.modalSup).subscribe(() => {
      this.alertify.success('Add Material Successfully');
      // this.modalReference.close() ;
      this.getAllMaterial();
      this.modalSup.name = '';
    });
  }
}
