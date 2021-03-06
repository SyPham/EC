import { ModalNameService } from './../../../_core/_service/modal-name.service';
import { GlueService } from './../../../_core/_service/glue.service';
import { GlueIngredientService } from './../../../_core/_service/glue-ingredient.service';
import { LineService } from './../../../_core/_service/line.service';
import { PlanService } from './../../../_core/_service/plan.service';
import { Plan } from './../../../_core/_model/plan';
import { Component, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
  providers: [
    DatePipe
  ]
})
export class PlanComponent implements OnInit {
  @ViewChild('planForm')
  public orderForm: FormGroup;
  public pageSettings: PageSettingsModel;
  public toolbarOptions = ['Add', 'Save', 'Cancel', 'Delete', 'Search'];
  public editSettings: object;
  public toolbar: string[];
  public editparams: object;
  public grid: GridComponent;
  dueDate: any;
  modalReference: NgbModalRef;
  public data: object[];
  searchSettings: any = { hierarchyMode: 'Parent' };
  modalPlan: Plan = {
    id: 0,
    buildingID: 0,
    BPFCEstablishID: 0,
    hourlyOutput: 0,
    workingHour: 0,
    dueDate: new Date()
  };
  public textModelName = 'Select a model name';
  public textLine = 'Select a line name';
  public fieldsGlue: object = { text: 'name', value: 'name' };
  public fieldsLine: object = { text: 'name', value: 'name' };
  public fieldsBPFC: object = { text: 'name', value: 'name' };
  public fieldsModelName: object = { text: 'name', value: 'name' };
  public fieldsModelNo: object = { text: 'name', value: 'name' };
  public fieldsArticleNo: object = { text: 'name', value: 'name' };
  public fieldsArtProcess: object = { text: 'name', value: 'name' };
  public buildingName: object[];
  public modelName: object[];
  buildingNameEdit: any;
  modelNameEdit: any;
  articleNos: any;
  modelNos: any;
  artProcesses: any;
  modelNoEdit: any;
  articleNoEdit: any;
  artProcessEdit: any;
  workHour: number;
  hourlyOutput: number;
  articleNosData: any;
  artProcessesData: any;
  BPFCs: any;
  bpfcEdit: number;
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
    this.pageSettings = { pageSize: 6 };
    this.editparams = { params: { popupHeight: '300px' } };
    this.editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Delete', 'Search'];
    this.getAll();
    this.getAllBPFC();
    this.getAllModelName();
    const buildingID = JSON.parse(localStorage.getItem('level')).id;
    this.getAllLine(buildingID);
    this.getModelNames();
    this.getModelNos();
    this.getArtProcesses();
    this.getArticles();
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
  onChangeModelNameEdit(args) {
    this.modelNameEdit = args.itemData.id;
    this.getModelNoByModelNameID(this.modelNameEdit);
  }
  onChangeModelNoEdit(args) {
    this.modelNoEdit = args.itemData.id;
    this.getArticleNoByModelNoID(this.modelNoEdit);

  }
  onChangeArticleNoEdit(args) {
    this.articleNoEdit = args.itemData.id;
    this.getArtProcessByArticleNoID(this.articleNoEdit);

  }
  onChangeArtProcessEdit(args) {
    this.artProcessEdit = args.itemData.id;
  }

  onChangeDueDateEdit(args) {
    this.dueDate = (args.value as Date).toDateString();
  }
  onChangeBPFCEdit(args) {
    this.bpfcEdit = args.itemData.id;
  }

  actionComplete(args) {
    if (args.requestType === 'beginEdit' || args.requestType === 'edit') {
      (args.form.elements.namedItem('id') as HTMLInputElement).disabled = true;

    }
  }

  actionBegin(args) {
    console.log('actionBegin', args);
    if (args.requestType === 'beginEdit' || args.requestType === 'edit') {
      // args.cancel = true;
    }
    if (args.requestType === 'cancel') {
      this.ClearForm();
    }
    if (args.requestType === 'save') {
      this.modalPlan.id = args.data.id || 0;
      this.modalPlan.buildingID = this.buildingNameEdit;
      this.modalPlan.dueDate = this.dueDate;
      this.modalPlan.workingHour = this.workHour;
      this.modalPlan.BPFCEstablishID = this.bpfcEdit;
      this.modalPlan.hourlyOutput = this.hourlyOutput;
      this.modalPlan.dueDate = new Date();
      console.log(this.modalPlan);
      if (this.validForm()) {
        if (args.data.id > 0) {
          this.planService.update(this.modalPlan).subscribe(res => {
            this.alertify.success('Updated successed!');
            this.ClearForm();
            this.getAll();
          });
        } else {
          this.planService.create(this.modalPlan).subscribe(res => {
            this.alertify.success('Created successed!');
            this.getAll();
            this.ClearForm();
          });
        }
      } else {
        args.cancel = true;
      }
    }
    if (args.requestType === 'delete') {
      this.delete(args.data[0].id);
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
    return array.every( item => item > 0);
  }
  onChangeWorkingHour(args) {
    this.workHour = args.target.value;
  }
  onChangeHourlyOutput(args) {
    this.hourlyOutput = args.target.value;
  }
  rowSelected(args) {
  }
  openaddModalPlan(addModalPlan) {
    this.modalReference = this.modalService.open(addModalPlan);
  }

  getAllBPFC() {
    this.bPFCEstablishService.filterByApprovedStatus().subscribe((res: any) => {
      this.BPFCs = res.map( (item) => {
        return  {
          id: item.id,
          name: `${item.modelName } - ${item.modelNo } - ${item.articleNo } - ${item.artProcess }`,
        };
      });
    });
  }

  getAll() {
    this.planService.getAll().subscribe((res: any) => {
      this.data = res.map( item => {
        return {
          id: item.id,
          bpfcName: `${item.modelName} - ${item.modelNoName} - ${item.articleName} - ${item.processName}`,
          dueDate: item.dueDate,
          workingHour: item.workingHour,
          hourlyOutput: item.hourlyOutput,
          buildingName: item.buildingName,
          buildingID: item.buildingID,
          BPFCEstablishID: item.BPFCEstablishID
        };
      });
    });
  }
  delete(id) {
    this.alertify.confirm('Delete Plan', 'Are you sure you want to delete this Plan "' + id + '" ?', () => {
      this.planService.delete(id).subscribe(() => {
        this.getAll();
        this.alertify.success('Plan has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Modal Name');
      });
    });
  }
  /// Begin API
  getAllModelName() {
    this.modelNameService.getAllModalName().subscribe((res: any) => {
      this.modelName = res;
    });
  }
  getModelNoByModelNameID(modelNameID) {
    this.modelNoService.getModelNoByModelNameID(modelNameID).subscribe((res: any) => {
      this.modelNos = res;
    });
  }
  getArticleNoByModelNoID(modelNoID) {
    this.articleNoService.getArticleNoByModelNoID(modelNoID).subscribe((res: any) => {
      this.articleNos = res;
    });
  }
  getArtProcessByArticleNoID(articleNoID) {
    this.artProcessService.getArtProcessByArticleNoID(articleNoID).subscribe((res: any) => {
      this.artProcesses = res.map( item => {
        return {
          id: item.id,
          name: item.processID === 1 ? 'ASY' : 'STF'
        };
      });
    });
  }
  getModelNames() {
    this.modelNameService.getAllModalName().subscribe((res: any) => {
      this.modelName = res;
    });
  }
  getModelNos() {
    this.modelNoService.getAll().subscribe((res: any) => {
      this.modelNos = res;
    });
  }
  getArticles() {
    this.articleNoService.getAll().subscribe((res: any) => {
      this.articleNos = res;
    });
  }
  getArtProcesses() {
    this.artProcessService.getAll().subscribe((res: any) => {
      this.artProcesses = res.map( item => {
        return {
          id: item.id,
          name: item.processID === 1 ? 'ASY' : 'STF'
        };
      });
    });
  }
  // End API
}
