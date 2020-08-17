import { PartName1Service } from './../../../_core/_service/part-name1.service';
import { IPartname } from './../../../_core/_model/partname';
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
import { NgbModal , NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-part-name1',
  templateUrl: './part-name1.component.html',
  styleUrls: ['./part-name1.component.css']
})

export class PartName1Component implements OnInit {
  public pageSettings: PageSettingsModel;
  public toolbarOptions = ['Search' ];
  public editSettings: object;
  public toolbar: string[];
  public editparams: object;
  public grid: GridComponent;
  modalReference: NgbModalRef ;
  public data: object [];
  searchSettings: any = { hierarchyMode: 'Parent' } ;
  modalPart1: IPartname = {
    id: 0,
    name: ''
  };
  public partname1: object [];

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    public modalService: NgbModal,
    private planService: PlanService,
    private lineService: LineService,
    private glueIngredientService: GlueIngredientService,
    private modalNameService: ModalNameService,
    private glueService: GlueService,
    private ingredientService: IngredientService,
    private partname1Service: PartName1Service
  ) { }

  ngOnInit(): void {
    this.pageSettings = { pageSize: 6 };
    this.editparams = { params: { popupHeight: '300px' } };
    this.editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Delete', 'Search'];
    this.getAllPartName1();
  }

  getAllPartName1() {
    this.partname1Service.getAllPartName1().subscribe(res => {
      this.partname1 = res ;
    });
  }
  actionBegin(args) {
    if (args.requestType === 'beginEdit') {
      this.modalPart1.name = args.rowData.name ;
    }
    if (args.requestType === 'save' ) {
      this.modalPart1.id = args.data.id ;
      this.modalPart1.name = args.data.name;

      this.partname1Service.update(this.modalPart1).subscribe( res => {
        this.alertify.success('Updated successed!');
        this.getAllPartName1();
      });
    }
  }

  delete(id) {
    this.alertify.confirm('Delete Part Name', 'Are you sure you want to delete this Part Name "' + id + '" ?', () => {
      this.partname1Service.delete(id).subscribe(() => {
        this.getAllPartName1();
        this.alertify.success('Part Name has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Modal Name');
      });
    });
  }
  save() {
    this.partname1Service.create(this.modalPart1).subscribe(() => {
      this.alertify.success('Add Part 1 Successfully');
      // this.modalReference.close() ;
      this.getAllPartName1();
      this.modalPart1.name = '';
    });
  }
}
