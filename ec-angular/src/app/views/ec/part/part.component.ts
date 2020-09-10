import { Component, OnInit } from '@angular/core';
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
  editparams: object;
  editSettings: object;
  toolbarOptions = ['Search' ];
  toolbar: string[];
  grid: GridComponent;
  searchSettings: any = { hierarchyMode: 'Parent' } ;
  pageSettings: { pageSize: number; };
  constructor(
    private partService: PartService,
    private alertify: AlertifyService,
    ) { }

  ngOnInit() {
    this.pageSettings = { pageSize: 6 };
    this.part ={
      id: 0,
      name: ''
    };
    this.editparams = { params: { popupHeight: '300px' } };
    this.editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Delete', 'Search'];
    this.getAllPart();
  }
  // api
  getAllPart() {
    this.partService.getAllPart().subscribe(res => {
      this.data = res ;
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
    this.partService.create(this.part).subscribe(() => {
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
  actionBegin(args) {
    if (args.requestType === 'beginEdit') {
      this.part.name = args.rowData.name ;
    }
    if (args.requestType === 'save' ) {
      this.part.id = args.data.id ;
      this.part.name = args.data.name;
      this.update();
    }
  }
  // end event
}
