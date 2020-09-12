import { ModalNameService } from './../../../_core/_service/modal-name.service';
import { GlueService } from './../../../_core/_service/glue.service';
import { GlueIngredientService } from './../../../_core/_service/glue-ingredient.service';
import { LineService } from './../../../_core/_service/line.service';
import { PlanService } from './../../../_core/_service/plan.service';
import { Plan } from './../../../_core/_model/plan';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { PageSettingsModel, GridComponent, CellEditArgs } from '@syncfusion/ej2-angular-grids';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModelNoService } from 'src/app/_core/_service/model-no.service';
import { ArticleNoService } from 'src/app/_core/_service/article-no.service';
import { ArtProcessService } from 'src/app/_core/_service/art-process.service';
import { FormGroup } from '@angular/forms';
import { BPFCEstablishService } from 'src/app/_core/_service/bpfc-establish.service';
import { Tooltip } from '@syncfusion/ej2-popups';
const WORKER = 4;
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
  providers: [
    DatePipe
  ]
})
export class PlanComponent implements OnInit {
  @ViewChild('cloneModal') public cloneModal: TemplateRef<any>;
  @ViewChild('planForm')
  public orderForm: FormGroup;
  public pageSettings: PageSettingsModel;
  public toolbarOptions: object;
  public editSettings: object;
  startDate: object = new Date();
  endDate: object = new Date(new Date().setDate(15));
  bpfcID: number;
  level: number;
  hasWorker: boolean;
  public bpfcData: object;
  public plansSelected: any;
  public date = new Date();
  public toolbar: string[];
  public editparams: object;
  @ViewChild('grid')
  public grid: GridComponent;
  dueDate: any;
  modalReference: NgbModalRef;
  public data: object[];
  searchSettings: any = { hierarchyMode: 'Parent' };
  modalPlan: Plan = {
    id: 0,
    buildingID: 0,
    BPFCEstablishID: 0,
    BPFCName: '',
    hourlyOutput: 0,
    workingHour: 0,
    dueDate: new Date()
  };
  public textLine = 'Select a line name';
  public fieldsGlue: object = { text: 'name', value: 'name' };
  public fieldsLine: object = { text: 'name', value: 'name' };
  public fieldsBPFC: object = { text: 'name', value: 'name' };
  public buildingName: object[];
  public modelName: object[];
  buildingNameEdit: any;
  workHour: number;
  hourlyOutput: number;
  BPFCs: any;
  bpfcEdit: number;
  glueDetails: any;
  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    public modalService: NgbModal,
    private planService: PlanService,
    private modelNoService: ModelNoService,
    private modelNameService: ModalNameService,
    private articleNoService: ArticleNoService,
    private bPFCEstablishService: BPFCEstablishService,
    private artProcessService: ArtProcessService,
    public datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.level = JSON.parse(localStorage.getItem('level')).level;
    this.pageSettings = { pageSize: 15 };
    this.editparams = { params: { popupHeight: '300px' } };
    if (this.level === WORKER) {
      this.hasWorker = true;
      this.editSettings = { showDeleteConfirmDialog: false, allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Normal' };
      this.toolbarOptions = ['Search'];
    } else {
      this.hasWorker = false;
      this.editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
      this.toolbarOptions = ['Add', 'Save', 'Cancel',
        { text: 'Delete Range', tooltipText: 'Delete Range', prefixIcon: 'fa fa-trash', id: 'DeleteRange' }, 'Search',
        { text: 'Clone', tooltipText: 'Copy', prefixIcon: 'fa fa-copy', id: 'Clone' }
      ];
    }
    this.toolbar = ['Add', 'Delete', 'Search', 'Copy'];
    this.getAll(this.startDate, this.endDate);
    this.getAllBPFC();
    const buildingID = JSON.parse(localStorage.getItem('level')).id;
    this.getAllLine(buildingID);
    this.ClearForm();
  }
  count(index) {
    return Number(index) + 1;
  }

  getAllLine(buildingID) {
    this.planService.getLines(buildingID).subscribe((res: any) => {
      this.buildingName = res;
    });
  }

  onChangeBuildingNameEdit(args) {
    this.buildingNameEdit = args.itemData.id;
  }
  onChangeDueDateEdit(args) {
    this.dueDate = (args.value as Date).toDateString();
  }

  onChangeDueDateClone(args) {
    this.date = (args.value as Date);
  }

  onChangeBPFCEdit(args) {
    this.bpfcEdit = args.itemData.id;
  }

  actionComplete(args) {
    if (args.requestType === 'edit') {
      (args.form.elements.namedItem('createdDate') as HTMLInputElement).disabled = true;
    }
    if (args.requestType === 'add') {
      (args.form.elements.namedItem('createdDate') as HTMLInputElement).disabled = true;
    }
  }
  actionBegin(args) {
    if (args.requestType === 'cancel') {
      this.ClearForm();
    }

    if (args.requestType === 'save') {
      if (args.action === 'edit') {
        this.modalPlan.id = args.data.id || 0;
        this.modalPlan.buildingID = this.buildingNameEdit;
        this.modalPlan.dueDate = this.dueDate;
        this.modalPlan.workingHour = args.data.workingHour;
        this.modalPlan.BPFCEstablishID = args.data.bpfcEstablishID;
        this.modalPlan.BPFCName = args.data.bpfcName;
        this.modalPlan.hourlyOutput = args.data.hourlyOutput;
        this.planService.update(this.modalPlan).subscribe(res => {
          this.alertify.success('Updated succeeded!');
          this.ClearForm();
          this.getAll(this.startDate, this.endDate);
        });
      }
      if (args.action === 'add') {
        this.modalPlan.buildingID = this.buildingNameEdit;
        this.modalPlan.dueDate = this.dueDate;
        this.modalPlan.workingHour = args.data.workingHour || 0;
        this.modalPlan.BPFCEstablishID = this.bpfcEdit;
        this.modalPlan.BPFCName = args.data.bpfcName;
        this.modalPlan.hourlyOutput = args.data.hourlyOutput || 0;
        this.planService.create(this.modalPlan).subscribe(res => {
          if (res) {
            this.alertify.success('Created succeeded!');
            this.getAll(this.startDate, this.endDate);
            this.ClearForm();
          } else {
            this.alertify.warning('This plan has already existed!!!');
            this.getAll(this.startDate, this.endDate);
            this.ClearForm();
          }
        });
      }
    }
  }

  private ClearForm() {
    this.bpfcEdit = 0;
    this.hourlyOutput = 0;
    this.workHour = 0;
    this.dueDate = new Date();
  }

  private validForm(): boolean {
    const array = [this.bpfcEdit];
    return array.every(item => item > 0);
  }

  onChangeWorkingHour(args) {
    this.workHour = args;
  }

  onChangeHourlyOutput(args) {

    this.hourlyOutput = args;
  }

  rowSelected(args) {
  }

  openaddModalPlan(addModalPlan) {
    this.modalReference = this.modalService.open(addModalPlan);
  }

  getAllBPFC() {
    this.bPFCEstablishService.filterByApprovedStatus().subscribe((res: any) => {
      this.BPFCs = res.map((item) => {
        return {
          id: item.id,
          name: `${item.modelName} - ${item.modelNo} - ${item.articleNo} - ${item.artProcess}`,
        };
      });
    });
  }

  getAll(startDate, endDate) {
    this.planService.search(startDate.toDateString(), endDate.toDateString()).subscribe((res: any) => {
      this.data = res.map(item => {
        return {
          id: item.id,
          bpfcName: `${item.modelName} - ${item.modelNoName} - ${item.articleName} - ${item.processName}`,
          dueDate: item.dueDate,
          createdDate: item.createdDate,
          workingHour: item.workingHour,
          hourlyOutput: item.hourlyOutput,
          buildingName: item.buildingName,
          buildingID: item.buildingID,
          bpfcEstablishID: item.bpfcEstablishID,
          glues: item.glues || []
        };
      });
    });
  }
  deleteRange(plans) {
    this.alertify.confirm('Delete Plan', 'Are you sure you want to delete this Plans ?', () => {
      this.planService.deleteRange(plans).subscribe(() => {
        this.getAll(this.startDate, this.endDate);
        this.alertify.success('Plans has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Modal Name');
      });
    });
  }

  /// Begin API
  openModal(ref) {
    const selectedRecords = this.grid.getSelectedRecords();
    if (selectedRecords.length !== 0) {
      this.plansSelected = selectedRecords.map((item: any) => {
        return {
          id: 0,
          bpfcEstablishID: item.bpfcEstablishID,
          workingHour: item.workingHour,
          hourlyOutput: item.hourlyOutput,
          dueDate: item.dueDate,
          buildingID: item.buildingID
        };
      });
      this.modalReference = this.modalService.open(ref);
    } else {
      this.alertify.warning('Please select the plan');
    }
  }

  toolbarClick(args: any): void {
    switch (args.item.text) {
      case 'Clone':
        this.openModal(this.cloneModal);
        break;
      case 'Delete Range':
        if (this.grid.getSelectedRecords().length === 0) {
          this.alertify.warning('Please select the plans!!');
        } else {
          const selectedRecords = this.grid.getSelectedRecords().map((item: any) => {
            return item.id;
          });
          console.log('Delete Range', selectedRecords);
          this.deleteRange(selectedRecords);
        }
        break;
    }
  }

  onClickClone() {
    this.plansSelected.map(item => {
      item.dueDate = this.date;
    });

    this.planService.clonePlan(this.plansSelected).subscribe((res: any) => {
      if (res) {
        this.alertify.success('Successfully!');
        this.startDate = this.date;
        this.endDate = this.date;
        this.getAll(this.date, this.date);
        this.modalService.dismissAll();
      } else {
        this.alertify.warning('the plans have already existed!');
        this.modalService.dismissAll();
      }
    });
  }

  search(startDate, endDate) {
    this.planService.search(startDate.toDateString(), endDate.toDateString()).subscribe((res: any) => {
      this.data = res.map(item => {
        return {
          id: item.id,
          bpfcName: `${item.modelName} - ${item.modelNoName} - ${item.articleName} - ${item.processName}`,
          dueDate: item.dueDate,
          createdDate: item.createdDate,
          workingHour: item.workingHour,
          hourlyOutput: item.hourlyOutput,
          buildingName: item.buildingName,
          buildingID: item.buildingID,
          bpfcEstablishID: item.bpfcEstablishID,
          glues: item.glues || []
        };
      });
    });
  }


  onClickDefault() {
    this.startDate = new Date();
    this.endDate = new Date(new Date().setDate(15));
    this.getAll(this.startDate, this.endDate);
  }
  startDateOnchange(args) {
    this.startDate = (args.value as Date);
    this.search(this.startDate, this.endDate);
  }
  endDateOnchange(args) {
    this.endDate = (args.value as Date);
    this.search(this.startDate, this.endDate);
  }
  tooltip(data) {
    if (data) {
      return data.join('<br>');
    } else {
      return '';
    }
  }

  onClickFilter() {
    this.search(this.startDate, this.endDate);
  }

  // End API
}
