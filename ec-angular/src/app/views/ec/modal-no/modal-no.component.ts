import { GlueService } from './../../../_core/_service/glue.service';
import { ModalNo } from './../../../_core/_model/modal-no';
import { ModalNoService } from './../../../_core/_service/modal-no.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { PageSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { NgbModal , NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { ActivatedRoute } from '@angular/router';
import { MakeGlueService } from 'src/app/_core/_service/make-glue.service';
import { Query, DataManager } from '@syncfusion/ej2-data';
@Component({
  selector: 'app-modal-no',
  templateUrl: './modal-no.component.html',
  styleUrls: ['./modal-no.component.css'],
  providers: [ToolbarService, EditService, PageService]
})
export class ModalNoComponent implements OnInit {
  public pageSettings: PageSettingsModel;
  public toolbarOptions = ['Search' ];
  public editSettings: object;
  public toolbar: string[];
  public glueparams: object;
  public grid: GridComponent;
  modalReference: NgbModalRef ;
  public data: object [];
  searchSettings: any = { hierarchyMode: 'Parent' } ;
  public fields: Object = { text: 'name', value: 'id' };
  public textNo: string = 'Select Model No';
  public dataModalName: object [];
  public value: number = 0;
  modalno: ModalNo = {
    id: 0,
    name: '',
    modelNameID: 0,
    modelName: ''
  };
  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    public modalService: NgbModal,
    private modalNoService: ModalNoService,
    private glueService: GlueService,
    private makeGlueService: MakeGlueService,
  ) { }

  ngOnInit(): void {
    this.pageSettings = { pageSize: 6 };
    this.glueparams = { params: {
      popupHeight: '300px',
      // allowFiltering: true,
      // dataSource: new DataManager(this.dataModalName),
      // fields: { text: 'modelName', value: 'modelNameID' },
      // query: new Query(),
      // actionComplete: () => false
    } };
    this.editSettings = { showDeleteConfirmDialog: false, allowEditing: false, allowAdding: false, allowDeleting: true, mode: 'Normal' };
    this.getAllModalNo();
    this.getAllModelName();
  }
  EditModalNo(id,editModalNo) {
    this.openeditModalNo(editModalNo) ;
    this.modalNoService.getbyid(id).subscribe((res: any) => {
      this.modalno.id = id ;
      this.modalno.name = res.name ;
      this.value = res.modelNameID;
      this.modalno.modelNameID = this.value ;
    }) ;
  }
  update() {
    this.modalNoService.update(this.modalno).subscribe(() => {
      this.alertify.success('Update Modal No Successfully');
      this.modalReference.close();
      this.getAllModalNo();
    });
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      this.modalno.id = args.data.id ;
      this.modalno.name = args.data.name ;
      this.modalNoService.update(this.modalno).subscribe(() => {
        this.alertify.success('Update Modal No Successfully');
      });
    }
  }
  rowSelected(args) {

  }
  openaddModalNo(addModalNo) {
    this.modalReference = this.modalService.open(addModalNo);
  }
  openeditModalNo(editModalNo) {
    this.modalReference = this.modalService.open(editModalNo);
  }
  getAllModalNo() {
    this.modalNoService.getAllModalNo().subscribe((res: any) => {
      this.data = res ;
    });
  }
  delete(id) {
    this.alertify.confirm('Delete Modal No', 'Are you sure you want to delete this ModalNo ID "' + id + '" ?', () => {
      this.modalNoService.delete(id).subscribe(() => {
        this.getAllModalNo();
        this.alertify.success('Modal No has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Modal No');
      });
    });
  }
  save() {
    this.modalNoService.create(this.modalno).subscribe(() => {
      this.alertify.success('Add Modal No Successfully');
      this.modalReference.close() ;
      this.getAllModalNo();
    });
  }
  getAllModelName() {
    this.makeGlueService.getAllModalName().subscribe((res: any) => {
      this.dataModalName = res ;
    });
  }
  changeModalName($event){
    this.modalno.modelNameID = Number($event.value) ;
  }
}
