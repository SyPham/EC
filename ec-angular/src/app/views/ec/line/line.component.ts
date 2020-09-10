import { Component, OnInit } from '@angular/core';
import { Line } from './../../../_core/_model/line';
import { LineService } from './../../../_core/_service/line.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { PageSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { NgbModal , NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
  providers: [ToolbarService, EditService, PageService]
})
export class LineComponent implements OnInit {
  public pageSettings: PageSettingsModel;
  public toolbarOptions = ['Search' ];
  public editSettings: object;
  public toolbar: string[];
  public editparams: object;
  public grid: GridComponent;
  modalReference: NgbModalRef ;
  public data: object [];
  searchSettings: any = { hierarchyMode: 'Parent' } ;
  public name: string ;
  line: Line = {
    id: 0,
    name: '',
  };
  constructor(
    private lineService: LineService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.pageSettings = { pageSize: 6 };
    this.editparams = { params: { popupHeight: '300px' } };
    this.editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Delete', 'Search'];
    this.getAllLine();
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      this.line.id = args.data.id ;
      this.line.name = args.data.name ;
      this.lineService.update(this.line).subscribe(() => {
        this.alertify.success('Update Line Successfully');
      });
    }
  }
  rowSelected(args) {

  }
  openaddLine(addLine) {
    this.modalReference = this.modalService.open(addLine);
  }
  getAllLine() {
    this.lineService.getAllLine().subscribe((res: any) => {
      this.data = res ;
    });
  }
  delete(id) {
    this.alertify.confirm('Delete Line', 'Are you sure you want to delete this Line ID "' + id + '" ?', () => {
      this.lineService.delete(id).subscribe(() => {
        this.getAllLine();
        this.alertify.success('Line has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Line');
      });
    });
  }
  save() {
    this.lineService.create(this.line).subscribe(() => {
      this.alertify.success('Add Line Successfully');
      this.modalReference.close() ;
      this.getAllLine();
    });
  }
}

