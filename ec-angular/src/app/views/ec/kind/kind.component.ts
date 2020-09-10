import { Component, OnInit } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { KindService } from 'src/app/_core/_service/kind.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';

@Component({
  selector: 'app-kind',
  templateUrl: './kind.component.html',
  styleUrls: ['./kind.component.css']
})
export class KindComponent implements OnInit {
  kind: any;
  data: any;
  editparams: object;
  editSettings: object;
  toolbarOptions = ['Search' ];
  toolbar: string[];
  grid: GridComponent;
  searchSettings: any = { hierarchyMode: 'Parent' } ;
  pageSettings: { pageSize: number; };
  constructor(
    private kindService: KindService,
    private alertify: AlertifyService,
    ) { }

  ngOnInit() {
    this.pageSettings = { pageSize: 6 };
    this.kind = {
      id: 0,
      name: ''
    };
    this.editparams = { params: { popupHeight: '300px' } };
    this.editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Delete', 'Search'];
    this.getAllKind();
  }
  // api
  getAllKind() {
    this.kindService.getAllKind().subscribe(res => {
      this.data = res ;
    });
  }
  create() {
    this.kindService.create(this.kind).subscribe(() => {
      this.alertify.success('Add Kind Successfully');
      this.getAllKind();
      this.kind.name = '';
    });
  }

  update() {
    this.kindService.create(this.kind).subscribe(() => {
      this.alertify.success('Add Kind Successfully');
      // this.modalReference.close() ;
      this.getAllKind();
      this.kind.name = '';
    });
  }
  delete(id) {
    this.alertify.confirm('Delete Kind', 'Are you sure you want to delete this Kind "' + id + '" ?', () => {
      this.kindService.delete(id).subscribe(() => {
        this.getAllKind();
        this.alertify.success('The kind has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the kind');
      });
    });
  }
  // end api

  // grid event
  actionBegin(args) {
    if (args.requestType === 'beginEdit') {
      this.kind.name = args.rowData.name ;
    }
    if (args.requestType === 'save' ) {
      this.kind.id = args.data.id ;
      this.kind.name = args.data.name;
      this.update();
    }
  }
  // end event
}
