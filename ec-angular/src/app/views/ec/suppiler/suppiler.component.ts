import { ISupplier } from './../../../_core/_model/Supplier';
import { IngredientService } from './../../../_core/_service/ingredient.service';
import { ModalNameService } from './../../../_core/_service/modal-name.service';
import { GlueService } from './../../../_core/_service/glue.service';
import { GlueIngredientService } from './../../../_core/_service/glue-ingredient.service';
import { LineService } from './../../../_core/_service/line.service';
import { PlanService } from './../../../_core/_service/plan.service';
import { Plan } from './../../../_core/_model/plan';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { PageSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-suppiler',
  templateUrl: './suppiler.component.html',
  styleUrls: ['./suppiler.component.css']
})

export class SuppilerComponent implements OnInit {
  public pageSettings: PageSettingsModel;
  public toolbarOptions = ['Search'];
  public editSettings: object;
  public toolbar: string[];
  public editparams: object;
  public grid: GridComponent;
  modalReference: NgbModalRef;
  public data: object[];
  searchSettings: any = { hierarchyMode: 'Parent' };

  modalSup: ISupplier = {
    id: 0,
    name: ''
  };
  public textGlueLineName: string = 'Select ';
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
    private planService: PlanService,
    private lineService: LineService,
    private glueIngredientService: GlueIngredientService,
    private modalNameService: ModalNameService,
    private glueService: GlueService,
    private ingredientService: IngredientService
  ) { }

  ngOnInit(): void {
    this.pageSettings = { pageSize: 20 };
    this.editparams = { params: { popupHeight: '300px' } };
    this.editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Delete', 'Search', 'Update', 'Cancel'];
    this.getAllSupllier();
  }

  getAllSupllier() {
    this.ingredientService.getAllSupplier().subscribe(res => {
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
    this.setFocus = args.column;  // Get the column from Double click event
  }
  delete(id) {
    this.alertify.confirm('Delete Supplier', 'Are you sure you want to delete this Supplier "' + id + '" ?', () => {
      this.ingredientService.deleteSub(id).subscribe(() => {
        this.getAllSupllier();
        this.alertify.success('Supplier has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Modal Name');
      });
    });
  }
  update(modalSup) {
    this.ingredientService.updateSub(modalSup).subscribe(res => {
      this.alertify.success('Updated successed!');
      this.getAllSupllier();
    });
  }
  add(modalSup) {
    this.ingredientService.createSub(modalSup).subscribe(() => {
      this.alertify.success('Add Supplier Successfully');
      this.getAllSupllier();
      this.modalSup.name = '';
    });
  }
  save() {
    this.ingredientService.createSub(this.modalSup).subscribe(() => {
      this.alertify.success('Add Supplier Successfully');
      // this.modalReference.close() ;
      this.getAllSupllier();
      this.modalSup.name = '';
    });
  }
}
