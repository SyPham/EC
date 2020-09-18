import { Component, OnInit, ViewChild } from '@angular/core';
import { PartService } from 'src/app/_core/_service/part.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  part: any;
  data: any;
  editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  toolbarOptions = ['ExcelExport', 'Add', 'Edit', 'Delete', 'Cancel', 'Search' ];
  @ViewChild('grid') grid: GridComponent;
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  filterSettings = { type: 'Excel' };
  constructor(
    private partService: PartService,
    private alertify: AlertifyService,
    ) { }

  ngOnInit() {
    this.part = {
      id: 0,
      name: ''
    };
    this.getAllPart();
  }
  // api
  getAllPart() {
    this.partService.getAllPart().subscribe(res => {
      this.data = res;
    });
  }
  create() {
    this.partService.create(this.part).subscribe(() => {
      this.alertify.success('Add Part Successfully');
      this.getAllPart();
      this.part.name = '';
    });
  }

  update() {
    this.partService.update(this.part).subscribe(() => {
      this.alertify.success('Add Part Successfully');
      this.getAllPart();
      this.part.name = '';
    });
  }
  delete(id) {
    this.alertify.confirm('Delete Part', 'Are you sure you want to delete this Part "' + id + '" ?', () => {
      this.partService.delete(id).subscribe(() => {
        this.getAllPart();
        this.alertify.success('The part has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the part');
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
    if (args.requestType === 'save' ) {
      if (args.action === 'add') {
        this.part.id = 0;
        this.part.name = args.data.name;
        this.create();
      }
      if (args.action === 'edit') {
        this.part.id = args.data.id;
        this.part.name = args.data.name;
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
