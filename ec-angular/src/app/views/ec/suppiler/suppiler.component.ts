import { ISupplier } from './../../../_core/_model/Supplier';
import { IngredientService } from './../../../_core/_service/ingredient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-suppiler',
  templateUrl: './suppiler.component.html',
  styleUrls: ['./suppiler.component.css']
})

export class SuppilerComponent implements OnInit {
  public pageSettings = { pageCount: 20, pageSizes: true, currentPage: 1, pageSize: 10 };
  public toolbarOptions = ['ExcelExport', 'Add', 'Edit', 'Delete', 'Cancel', 'Search'];
  public editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  public data: object[];
  filterSettings = { type: 'Excel' };
  modalSup: ISupplier = {
    id: 0,
    name: ''
  };
  @ViewChild('grid') grid: GridComponent;
  public textGlueLineName = 'Select ';
  public supplier: object[];
  public setFocus: any;
  constructor(
    private alertify: AlertifyService,
    public modalService: NgbModal,
    private ingredientService: IngredientService
  ) { }

  ngOnInit(): void {
    this.getAllSupplier();
  }

  getAllSupplier() {
    this.ingredientService.getAllSupplier().subscribe(res => {
      this.supplier = res;
    });
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      if (args.action === 'edit') {
        this.modalSup.id = args.data.id || 0;
        this.modalSup.name = args.data.name;
        this.update(this.modalSup);
      }
      if (args.action === 'add') {
        this.modalSup.id = 0;
        this.modalSup.name = args.data.name;
        this.add(this.modalSup);
      }
    }
    if (args.requestType === 'delete') {
      this.delete(args.data[0].id);
    }
  }
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
        this.getAllSupplier();
        this.alertify.success('Supplier has been deleted');
      }, error => {
          this.alertify.error('Failed to delete the supplier');
      });
    });
  }
  update(modalSup) {
    this.ingredientService.updateSub(modalSup).subscribe(res => {
      this.alertify.success('Updated successfully!');
      this.getAllSupplier();
    });
  }
  add(modalSup) {
    this.ingredientService.createSub(modalSup).subscribe(() => {
      this.alertify.success('Add supplier successfully');
      this.getAllSupplier();
      this.modalSup.name = '';
    });
  }
  save() {
    this.ingredientService.createSub(this.modalSup).subscribe(() => {
      this.alertify.success('Add supplier successfully');
      this.getAllSupplier();
      this.modalSup.name = '';
    });
  }

  NO(index) {
    return (this.grid.pageSettings.currentPage - 1) * this.grid.pageSettings.pageSize + Number(index) + 1;
  }
}
