import { ModalName } from './../../../_core/_model/modal-name';
import { ModalNameService } from './../../../_core/_service/modal-name.service';
import { ISupplier } from './../../../_core/_model/Supplier';
import { IngredientService } from './../../../_core/_service/ingredient.service';
import { Component, OnInit, ViewChild, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { AccumulationChartComponent, IAccLoadedEventArgs, AccumulationTheme, AccumulationChart } from '@syncfusion/ej2-angular-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GlueModalComponent } from '../glue/glue-modal/glue-modal.component';
import { PageSettingsModel, GridComponent, IEditCell, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { IGlue } from 'src/app/_core/_model/glue';
import { Pagination, PaginatedResult } from 'src/app/_core/_model/pagination';
import { IIngredient } from 'src/app/_core/_model/Ingredient';
import { GlueIngredientService } from 'src/app/_core/_service/glue-ingredient.service';
import { GlueService } from 'src/app/_core/_service/glue.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { ChartDataService } from 'src/app/_core/_service/chart-data.service';
import { IngredientModalComponent } from '../ingredient/ingredient-modal/ingredient-modal.component';
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { IGlueIngredientDetail, IGlueIngredient } from 'src/app/_core/_model/glue-ingredient-detail';
import { truncateSync } from 'fs';
import { ArticleNoService } from 'src/app/_core/_service/articleNoService.service';
import { IArticleNo } from 'src/app/_core/_model/Iarticle-no';
import { AuthService } from 'src/app/_core/_service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { BPFCEstablishService } from 'src/app/_core/_service/bpfc-establish.service';
import { ModelNoService } from 'src/app/_core/_service/model-no.service';
import { ArtProcessService } from 'src/app/_core/_service/art-process.service';
import { AnyAaaaRecord } from 'dns';
import { KindService } from 'src/app/_core/_service/kind.service';
import { PartService } from 'src/app/_core/_service/part.service';
import { MaterialService } from 'src/app/_core/_service/material.service';
import { constants } from 'crypto';

declare const $: any;
const LEVEL_1 = 3;
@Component({
  selector: 'app-glue-ingredient',
  templateUrl: './glue-ingredient.component.html',
  styleUrls: ['./glue-ingredient.component.css'],
  providers: [ToolbarService, EditService, PageService]
})
export class GlueIngredientComponent implements OnInit, AfterViewInit {
  modalReference: NgbModalRef;
  data: IGlue[];

  modelNameData: any;
  modelNoData: any;
  articleNoData: any;
  modelNameClone: any;
  modelNoClone: any;
  approvalStatus = false;
  createdStatus = false;
  role = JSON.parse(localStorage.getItem('user')).User.Role;
  selIndex: number[];
  artQuantity: number;
  articleNoID: number;
  isShow = false;
  isAdd: boolean;
  glueIngredientDetail: Array<IGlueIngredient>;
  setFocus: any;
  modified: boolean;
  modifiedGlue: boolean;
  oldDetail: any[];
  selectedRow = [];
  LANG = localStorage.getItem('lang') || 'vi';
  public sortOptions: object;
  expiredTime: number;
  glue: IGlue = {
    id: 0,
    name: '',
    gluename: '',
    code: '',
    createdDate: '',
    partID: 0,
    kindID: 0,
    materialID: 0,
    BPFCEstablishID: 0,
    consumption: '',
    expiredTime: 0,
    createdBy: 0,
  };
  ingredient: IIngredient = {
    id: 0,
    name: '',
    code: '',
    percentage: 0,
    createdDate: new Date(),
    supplierID: 0,
    position: 0,
    allow: 0,
    voc: 0,
    expiredTime: 0,
    daysToExpiration: 0,
    materialNO: '',
    unit: 0,
    real: 0,
    cbd: 0
  };
  Editpercentage = {
    glueID: 0,
    ingredientID: 0,
    percentage: 0
  };
  Editallow = {
    glueID: 0,
    ingredientID: 0,
    allow: 0
  };
  show: boolean;
  public pageSettings: PageSettingsModel;
  pagination: Pagination;
  page = 1;
  position: any;
  public glues: object[];
  public supplier: any[] = [];
  public ingredients1: IIngredient[];
  public ingredients2: IIngredient[];
  paginationG: Pagination;
  paginationI: Pagination;
  glueid: number;
  ingridientID: number;
  percentage: number;
  gIchecked: boolean;
  percentageDefault: any;
  allowDefault: any;
  percentageChange: any;
  allowChange: any;
  public toolbarOptions = ['Search', 'Delete'];
  public toolbarOptions2 = ['Search', 'Add', 'Delete', 'Cancel'];
  public selectionOptions = { type: 'Multiple', mode: 'Both' };
  public editSettings: object;
  public toolbar: ToolbarItems[] | object;
  public editparams: object;
  public orderidrules: object;
  public customeridrules: object;
  public freightrules: object;
  @ViewChild('grid')
  public grid: GridComponent;
  @ViewChild('gridglue')
  public gridglue: GridComponent;
  @ViewChild('grid2')
  public grid2: GridComponent;
  nameGlue: any;
  detailGlue: boolean;
  @ViewChild('modelNameDropdownlist')
  public modelNameDropdownlist: DropDownListComponent;
  public detailIngredient: any[] = [];
  public percentageCount: any;
  public percentageCountEdit: any;
  public allowCountEdit: [];
  public modelNo: [];
  public percentageEdit: {};
  public allowEdit: {};
  public totalPercentage = 0;
  public fieldsBPFCs: object = { text: 'name', value: 'id' };
  public fieldsGlueChemical: object = { text: 'name', value: 'name' };
  public textGlue = 'Select Model Name';
  public textModelName = 'Select Model Name - Model #';
  public textGluePartname1 = 'Select ';
  public textGluePartname2 = 'Select';
  public textGluePartname3 = 'Select';
  public textGlueMaterial = 'Select ';
  public fieldsGlue2: object = { text: 'name', value: 'id' };
  public valueArticleNo: any;
  public articleNofields: object = { text: 'name', value: 'id' };
  public processfields: object = { text: 'name', value: 'id' };
  public processData = [
    {
      id: 1,
      name: 'ASY',
    },
    {
      id: 2,
      name: 'STF',
    },
  ];
  public valueProcess = 1;
  public textGlue2 = 'Select Model No';
  existGlue: any = false;
  modelNoText: any;

  modelNameid: number;
  onChangeChemical: boolean;
  chemicalNameEdit: any;
  pathNameEdit: any;
  pathNameEdit0: any;
  modelNoEdit: any;
  pathNameEdit3: any;
  materialNameEdit: any;
  showBarCode: boolean;
  partname1: any;
  partname2: any;
  partname3: any;
  materialname: any;
  public dataPosition: object[] = [
    { id: '0', name: '' },
    { id: '1', name: 'A' },
    { id: '2', name: 'B' },
    { id: '3', name: 'C' },
    { id: '4', name: 'D' },
    { id: '5', name: 'E' },
  ];
  public countryParams: IEditCell;
  public ingrediented: object[];
  public partName: object[];
  public partName2: object[];
  public kinds: any;
  public parts: any;
  public materials: any;
  public MaterialName: object[];
  editParams: IEditCell;
  public fieldsGlueEdit: object = { text: 'name', value: 'name' };
  public fieldsChemical: object = { text: 'name', value: 'name' };
  public fieldsposition: object = { text: 'name', value: 'name' };
  public tooltip: Tooltip;
  public ingredientID: any;
  public subID: any;
  public rowIndex: any = '';
  public glueIngredient2 = {
    ingredientID: 0,
    percentage: 0,
    glueID: 0,
    position: ''
  };
  @ViewChild('chemicalDropdownlist')
  public chemicalDropdownlist: DropDownListComponent;
  @ViewChildren('positionDropdownlist')
  public positionDropdownlist: QueryList<DropDownListComponent>;
  public A: any;
  public B: any;
  public C: any;
  public D: any;
  public E: any;
  level: any;
  articleName: any;
  processID: any;
  BPFCs: any;
  BPFCID: any;
  kindEdit: any;
  partEdit: any;
  materialEdit: any;
  constructor(
    private glueIngredientService: GlueIngredientService,
    private modalNameService: ModalNameService,
    private glueService: GlueService,
    private alertify: AlertifyService,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    private authService: AuthService,
    private bPFCEstablishService: BPFCEstablishService,
    private modelNoService: ModelNoService,
    private articleNoService: ArticleNoService,
    private kindService: KindService,
    private partService: PartService,
    private materialService: MaterialService,
    private artProcessService: ArtProcessService,
    private ingredientService: IngredientService
  ) { }

  ngOnInit() {
    localStorage.removeItem('details');
    this.modelNameid = 0;
    this.subID = 0;
    this.selIndex = [];
    this.isAdd = false;
    this.existGlue = false;
    this.oldDetail = [];
    this.glueIngredientDetail = [];
    this.removeLocalStore('details');
    this.glueid = 0;
    this.onService();
    this.getAllSupllier();
    this.sortOptions = { columns: [{ field: 'item', direction: 'Decending' }] };
    this.editParams = { params: { value: '' } };
    if (this.glue.id === 0) {
      this.showBarCode = false;
      this.genaratorGlueCode();
    } else {
      this.showBarCode = true;
    }
    this.ingredientService.currentIngredient.subscribe(res => {
      if (res === 200) {
        this.getIngredients();
      }
    });
    this.pageSettings = { pageSize: 12 };
    this.paginationI = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 0
    };
    this.editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = [
      { text: 'Add New', tooltipText: 'Add new row', prefixIcon: 'e-add', id: 'AddNew' }
      , 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    this.orderidrules = { required: true, number: true };
    this.customeridrules = { required: true };
    this.freightrules = { required: true };
    this.editparams = { paramss: { popupHeight: '300px' } };
    this.getAllBPFC();
  }
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    // frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true) : query;
    // pass the filter data source, filter query to updateData method.
    e.updateData(this.BPFCs, query);
  }

  // step 1 select modelname
  onChangeModelName(args) {
    this.resetLifeCycleBPFC();
    this.approvalStatus = args.itemData.approvalStatus;
    this.createdStatus = args.itemData.finishedStatus;
    this.modelNameid = args.value;
    this.BPFCID = args.itemData.id;
    localStorage.removeItem('details');
    this.getModelNameByID(this.modelNameid);
    this.glue.BPFCEstablishID = this.BPFCID;
    this.getAllGluesByBPFCID(this.BPFCID);
    this.getAllPart();
    this.getAllKind();
    this.getAllMaterial();
    this.getAllIngredient();
    this.existGlue = true;
    this.modified = true;
  }

  onChangeProcess(args) {
    if (args.itemData) {
      this.valueProcess = args.itemData.id;
      this.existGlue = true;
    }
  }
  onChangeProcessCloneModal(args) {
    if (args.itemData) {
      this.processID = args.itemData.id;
    }
  }
  resetLifeCycleBPFC() {
    this.selIndex = [];
    this.oldDetail = [];
    this.glueIngredientDetail = [];
    this.glues = [];
    if (this.gridglue) {
      this.gridglue.refresh();
    }
    this.removeLocalStore('details');
    this.sortBySup(0);
  }
  onCreatedGridGlue() {
  }
  ngAfterViewInit() {
    $('[data-toggle="tooltip"]').tooltip();
    this.getBuilding();
  }
  getBuilding() {
    const userID = JSON.parse(localStorage.getItem('user')).User.ID;
    this.authService.getBuildingByUserID(userID).subscribe((res: any) => {
      res = res || {};
      if (res !== {}) {
        this.level = res.level;
      }
    });
  }
  dataBound() {
    document.querySelectorAll('button[aria-label=Update] > span.e-tbar-btn-text')[0].innerHTML = 'Save';
    $('[data-toggle="tooltip"]').tooltip();
    if (this.selectedRow.length) {
      this.gridglue.selectRows(this.selectedRow);
      this.selectedRow = [];
    } else {
      this.gridglue.selectRows(this.selIndex);
    }
  }
  onChangeposition(args, data, index) {
    this.modified = false;
    let details = this.getLocalStore('details');
    if (args.value === '') {
      // this.delete(this.glueid, data.id);
    } else {
      const duplicatePositon = details.filter((obj => obj.position === args.value));
      if (duplicatePositon.length > 0) {
        details = this.getLocalStore('details');
        this.alertify.warning('Duplicate position!', true);
        this.positionDropdownlist.toArray()[index].value = null;
      }
      if (duplicatePositon.length === 0 && args.value !== null) {
        details = this.getLocalStore('details');
        this.percentage = 0;
        this.position = args.value;
        const flag = details.filter(item => {
          return item.ingredientName === data.name && item.position === data.position;
        });
        if (flag.length !== 0) {
          // update localstore
          // Find index of specific object using findIndex method.
          const objIndex = details.findIndex((obj => obj.ingredientName === data.name));
          details[objIndex].position = args.value;
          this.setLocalStore('details', details);
          this.glueIngredientDetail = this.getLocalStore('details');
          this.makeFormula();
          this.updateChemicalList();
          this.grid.refresh();

        } else {
          details = this.getLocalStore('details');
          // insert
          const glueIngredient: IGlueIngredient = {
            id: 0,
            glueID: this.glueid,
            ingredientID: data.id,
            glueName: '',
            ingredientName: data.name,
            percentage: this.percentage,
            position: args.value,
            createdDate: new Date(),
            allow: 0,
            expiredTime: data.expiredTime
          };
          if (args.value === 'A') {
            glueIngredient.percentage = 100;
            glueIngredient.expiredTime = data.expiredTime;
          }
          details = this.getLocalStore('details');
          details.push(glueIngredient);
          this.setLocalStore('details', details);
          this.glueIngredientDetail = this.getLocalStore('details');
          this.makeFormula();
          this.updateChemicalList();
          if (args.value === 'A') {
            this.grid.refresh();
          }
        }
      }

    }
  }
  recordDoubleClick(args) {
    this.modifiedGlue = true;
  }
  // Update or edit
  actionBegin(args) {

    if (args.requestType === 'beginEdit') {
      this.chemicalNameEdit = args.rowData.name; // chemicalNameEdit or ingredient
      this.pathNameEdit = args.rowData.pathName; // partname
      this.modelNoEdit = args.rowData.modelNo; // modelNo
      this.materialNameEdit = args.rowData.materialName; // materialName
      this.glue.consumption = args.rowData.consumption; // consumption
      this.glue.kindID = args.data.partID || null;
      this.glue.partID = args.data.partID || null;
      this.glue.materialID = args.data.materialID || null;
      this.glue.BPFCEstablishID = args.rowData.materialID;
      this.glue.name = args.rowData.name;
      this.glue.expiredTime = this.expiredTime;
      this.detailGlue = true;
    }
    if (args.requestType === 'save') {
      this.glue.id = args.rowData.id || 0;
      this.glue.code = args.data.code || '';
      this.glue.consumption = args.data.consumption;
      this.glue.kindID = args.data.partID || null;
      this.glue.partID = args.data.partID || null;
      this.glue.materialID = args.data.materialID || null;
      this.glue.BPFCEstablishID = this.BPFCID;
      this.glue.name = this.chemicalNameEdit;
      this.glue.expiredTime = this.expiredTime;
      this.glue.createdBy = JSON.parse(localStorage.getItem('user')).User.ID;
      this.saveGlue();
    }
    if (args.requestType === 'delete') {
      if (args.data[0].id !== 0) {
        this.glueid = args.data[0].id;
        this.glueService.delete(this.glueid).subscribe(() => {
          this.getAllGluesByBPFCID(this.BPFCID);
          this.detailGlue = false;
          this.removeLocalStore('details');
          this.glueIngredientDetail = [];
          this.oldDetail = [];
          this.alertify.success('Glue has been deleted');
        }, error => {
          this.alertify.error('Failed to delete the Glue');
        });
      }
    }
  }
  getAllIngredient() {
    this.ingredientService.getAllIngredient().subscribe((res: any) => {
      this.ingrediented = res;
    });
  }
  create() {
    this.glueService.create(this.glue).subscribe(() => {
      this.alertify.success('Created successed!');
      this.getAllGluesByBPFCID(this.BPFCID);
      this.clearGlueForm();
      this.genaratorGlueCode();
      this.expiredTime = 0;
    },
      (error) => {
        this.alertify.error(error);
        this.genaratorGlueCode();
      });
  }
  finished() {
    const details = this.getLocalStore('details');
    const selectedrecords = this.gridglue.getSelectedRecords()[0] as IGlue;  // Get the selected records.
    selectedrecords.expiredTime = details.filter(item => item.position === 'A')[0].expiredTime;
    selectedrecords.kindID = selectedrecords.kindID === 0 ? null : selectedrecords.kindID;
    selectedrecords.partID = selectedrecords.partID === 0 ? null : selectedrecords.partID;
    selectedrecords.materialID = selectedrecords.materialID === 0 ? null : selectedrecords.materialID;
    this.selectedRow = this.gridglue.getSelectedRowIndexes();

    this.glueService.update(selectedrecords).subscribe(res => {
      this.alertify.success('Updated successed!');
      this.getAllGluesByBPFCID(this.BPFCID);
      this.getAllBPFC();
      this.detailGlue = true;
      this.modified = true;
    });
    if (details.length > 0) {
      for (const item of details) {
        this.mapGlueIngredient(item);
      }
      this.alertify.success('Successfully!');
      this.modified = true;
    }
  }
  clearGlueForm() {
    this.glue.gluename = '';
    this.glue.kindID = null;
    this.glue.partID = null;
    this.glue.materialID = null;
    this.glue.consumption = '',
      this.showBarCode = false;
  }
  update() {
    this.glueService.update(this.glue).subscribe(res => {
      this.alertify.success('Updated successed!');
      this.getAllGluesByBPFCID(this.BPFCID);
      this.detailGlue = false;
      this.expiredTime = 0;
    });
  }
  updateChemical() {
    this.glueService.updateChemical(this.glue).subscribe(res => {
      this.alertify.success('updateChemical successed!');
      this.getAllGluesByBPFCID(this.BPFCID);
      this.detailGlue = false;
      this.onChangeChemical = false;
    });
  }
  // add or update glue
  saveGlue() {
    if (this.glue.id === 0 || this.glue.id === undefined) {
      if (this.glue.code === '') {
        this.genaratorGlueCode();
      }
      this.create();
    } else {
      if (this.onChangeChemical) {
        this.updateChemical();
      } else {
        this.update();
      }
    }
    this.oldDetail = [];
    localStorage.removeItem('details');
    this.glueIngredientDetail = [];
    this.gridglue.refresh();
  }
  genaratorGlueCode() {
    this.glue.code = this.makeid(8);
  }
  makeid(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    // return '59129032';
  }
  // chemical
  onChangeChemicalEdit(args) {
    this.chemicalNameEdit = this.chemicalDropdownlist.text;
    this.ingredientID = args.itemData.id;
    this.onChangeChemical = true;
  }

  onChangeKindEdit(args) {
    this.kindEdit = args.value;
  }
  onChangePartEdit(args) {
    this.partEdit = args.value;
  }
  onChangeMaterialEdit(args) {
    this.materialEdit = args.value;
  }
  getAllGluesByBPFCID(BPFCID) {
    this.glueService.getAllGluesByBPFCID(BPFCID).subscribe((res: any) => {
      if (this.ingredientID === undefined) {
        this.glues = res;
        if (res.length > 0) {
          this.detailGlue = true;
        }
      } else {
        this.glueid = res[0].id;
        this.glueIngredient2.ingredientID = this.ingredientID;
        this.glueIngredient2.percentage = 100;
        this.glueIngredient2.glueID = this.glueid;
        this.glueIngredient2.position = 'A';
        this.mapGlueIngredient(this.glueIngredient2);
      }

    });
  }
  getModelNameByID(id) {
    this.modalNameService.getModelNameByID(id).subscribe((res: any) => {
      // this.modelNameClone = res.name;
      // this.modelNoClone = `${res.modelNo} clone at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    });
  }

  getAllBPFC() {
    this.bPFCEstablishService.getAll().subscribe((res: any) => {
      this.BPFCs = res;
    });
  }

  sortBySup(id) {
    this.subID = id;
    this.ingredientService.sortBySup(this.glueid, id).subscribe((res: any) => {
      this.ingredients1 = res.list1;
      this.ingredients2 = res.list2;
      if (id === 0) {
        const details = this.getLocalStore('details');
        this.ingredients1 = details.map(item => {
          const ingredient: IIngredient = {
            id: item.ingredientID,
            name: item.ingredientName,
            code: '',
            percentage: item.percentage,
            createdDate: item.createdDate,
            supplierID: 0,
            allow: item.allow,
            position: item.position,
            expiredTime: item.expiredTime,
            daysToExpiration: item.daysToExpiration,
            voc: item.voc,
            materialNO: '',
            unit: 0,
            real: 0,
            cbd: 0
          };
          return ingredient;
        });
        this.glueIngredientDetail = details;
      } else {
        this.updateChemicalList();
      }
    });
  }
  updateChemicals() {
    this.ingredientService.sortBySup(this.glueid, this.subID).subscribe((res: any) => {
      this.ingredients1 = res.list1;
      this.ingredients2 = res.list2;
      const details = this.getLocalStore('details');
      for (const item of details) {
        const index = this.ingredients1.findIndex((obj => obj.name === item.ingredientName && obj.id === item.ingredientID));
        if (index !== -1) {
          this.ingredients1[index].position = item.position;
          this.ingredients1[index].percentage = item.percentage;
          this.ingredients1[index].allow = item.allow;
        }
      }
      for (const item of details) {
        const index2 = this.ingredients2.findIndex((obj => obj.name === item.ingredientName && obj.id === item.ingredientID));
        if (index2 !== -1) {
          this.ingredients2[index2].position = item.position;
          this.ingredients2[index2].percentage = item.percentage;
          this.ingredients2[index2].allow = item.allow;
        }
      }
      this.glueIngredientDetail = details;
      this.makeFormula();

    });
  }
  getIngredientsByGlueID() {
    this.ingredientService.getIngredientsByGlueID(this.glueid).subscribe((res: any) => {
      this.ingredients1 = res.list1;
      this.ingredients2 = res.list2;
    });
  }
  getAllSupllier() {
    this.ingredientService.getAllSupplier().subscribe(res => {
      this.supplier = res;
    });
  }
  compareArray(a1: Array<any>, a2: Array<any>) {
    return JSON.stringify(a1) === JSON.stringify(a2);
  }
  setLocalStore(key: string, value: any) {
    localStorage.removeItem(key);
    const result = JSON.stringify(value);
    localStorage.setItem(key, result);
  }
  getLocalStore(key: string) {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    const details = data.sort(this.dynamicSort('position'));
    return details;
  }
  removeLocalStore(key: string) {
    localStorage.removeItem(key);
  }
  dynamicSort(property) {
    let sortOrder = 1;

    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    // tslint:disable-next-line:only-arrow-functions
    return function(a, b) {
      if (sortOrder === -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  }
  renderchemical(): any[] {
    this.glueIngredientDetail = this.glueIngredientDetail || [];
    const details = this.glueIngredientDetail.sort(this.dynamicSort('position'));
    return details;
  }
  makeFormula() {
    const details = this.getLocalStore('details');
    const glueIngredient = details.filter(item => item.position === 'A') || [];
    this.nameGlue = glueIngredient[0]?.ingredientName || '';
    this.A = glueIngredient[0].ingredientName;
    this.glueIngredientDetail = this.renderchemical();
    if (this.glueIngredientDetail[1] === undefined) {
      this.B = '';
    } else {
      this.B = this.glueIngredientDetail[1].percentage + '%' + this.glueIngredientDetail[1].ingredientName;
    }
    if (this.glueIngredientDetail[2] === undefined) {
      this.C = '';
    } else {
      this.C = this.glueIngredientDetail[2].percentage + '%' + this.glueIngredientDetail[2].ingredientName;
    }
    if (this.glueIngredientDetail[3] === undefined) {
      this.D = '';
    } else {
      this.D = this.glueIngredientDetail[3].percentage + '%' + this.glueIngredientDetail[3].ingredientName;
    }
    if (this.glueIngredientDetail[4] === undefined) {
      this.E = '';
    } else {
      this.E = this.glueIngredientDetail[4].percentage + '%' + this.glueIngredientDetail[4].ingredientName;
    }
    if (this.glueIngredientDetail.length > 0) {
      this.percentageCount = this.glueIngredientDetail.map((item) => {
        return item.percentage;
      });
      this.percentageCountEdit = this.glueIngredientDetail.map((item) => {
        return item;
      });
      this.totalPercentage = this.percentageCount.reduce((acc, cur) => acc + cur, 0);

    } else {
      this.percentageCount = [];
      this.percentageCountEdit = [];
      this.totalPercentage = 0;
    }
    const selectedRow: number = this.gridglue.getSelectedRowIndexes()[0];
    if (this.gridglue.getSelectedRowIndexes().length) {
      const glue = this.gridglue.getSelectedRecords();
      (this.gridglue.dataSource as any[])[selectedRow].name = this.formula();
      this.gridglue.refresh();
    }
  }
  formula(): string {
    if (this.B && this.C && this.D && this.E) {
      return `{[ (${this.nameGlue}+ ${this.B}) + ${this.C} ] + ${this.D}}+ ${this.E}`;
    }
    if (this.B && this.C && this.D) {
      return `[(${this.nameGlue} + ${this.B}) + ${this.C}] + ${this.D}`;
    }
    if (this.B && this.C) {
      return `(${this.nameGlue} + ${this.B}) + ${this.C}`;
    }
    if (this.B) {
      return `${this.nameGlue} + ${this.B}`;
    }
    return `${this.nameGlue}`;
  }
  getDetail(id) {
    this.glueIngredientService.getDetail(id).subscribe((res: any) => {
      this.glueIngredientDetail = res.glueIngredients;
      this.setLocalStore('details', this.glueIngredientDetail);
      this.glueIngredientDetail = this.renderchemical();
      this.oldDetail = this.renderchemical();
      const glueIngredient = this.glueIngredientDetail.filter(item => item.position === 'A') || [];
      this.nameGlue = glueIngredient[0]?.ingredientName || '';
      this.A = glueIngredient[0]?.ingredientName || '';
      if (this.glueIngredientDetail[1] === undefined) {
        this.B = '';
      } else {
        this.B = this.glueIngredientDetail[1].percentage + '%' + this.glueIngredientDetail[1].ingredientName;
      }
      if (this.glueIngredientDetail[2] === undefined) {
        this.C = '';
      } else {
        this.C = this.glueIngredientDetail[2].percentage + '%' + this.glueIngredientDetail[2].ingredientName;
      }
      if (this.glueIngredientDetail[3] === undefined) {
        this.D = '';
      } else {
        this.D = this.glueIngredientDetail[3].percentage + '%' + this.glueIngredientDetail[3].ingredientName;
      }
      if (this.glueIngredientDetail[4] === undefined) {
        this.E = '';
      } else {
        this.E = this.glueIngredientDetail[4].percentage + '%' + this.glueIngredientDetail[4].ingredientName;
      }
      if (this.glueIngredientDetail.length > 0) {
        const list: any = [];
        this.percentageCount = this.glueIngredientDetail.map((item) => {
          return item.percentage;
        });
        const aaa = this.percentageCount;
        const str = this.percentageCount.join('+');
        this.percentageCountEdit = this.glueIngredientDetail.map((item) => {
          return item;
        });
        this.totalPercentage = this.percentageCount.reduce((acc, cur) => acc + cur, 0);

      } else {
        this.percentageCount = [];
        this.percentageCountEdit = [];
        this.totalPercentage = 0;
      }
    });
  }
  clickHandlerIngridient(args) {
    switch (args.item.text) {
      case 'Add':
        args.cancel = true;
        this.openIngredientModalComponent();
        break;
    }
  }
  checkTotalPercentage(percentageEdit, arrPercentageEdit): number {
    const temp = arrPercentageEdit.map(item => {
      if (item.ingredientID !== percentageEdit.id) {
        return item.percentage;
      } else { return 0; }
    });
    const numbers: any = temp;
    const length = numbers.push(percentageEdit.percentage);
    const sum = numbers.reduce((acc, cur) => acc + cur, 0);
    return sum;
  }

  updateChemicalList() {
    const details = this.getLocalStore('details');
    for (const item of details) {
      const index = this.ingredients1.findIndex((obj => obj.name === item.ingredientName && obj.id === item.ingredientID));
      if (index !== -1) {
        this.ingredients1[index].position = item.position;
        this.ingredients1[index].percentage = item.percentage;
        this.ingredients1[index].allow = item.allow;
      }
    }
    for (const item of details) {
      const index2 = this.ingredients2.findIndex((obj => obj.name === item.ingredientName && obj.id === item.ingredientID));
      if (index2 !== -1) {
        this.ingredients2[index2].position = item.position;
        this.ingredients2[index2].percentage = item.percentage;
        this.ingredients2[index2].allow = item.allow;
      }
    }
  }
  // edit Percentage
  actionBeginIngridient(args) {
    if (args.requestType === 'beginEdit') {
      this.Editpercentage.glueID = this.glueid;
      this.Editpercentage.ingredientID = args.rowData.id;
      this.percentageDefault = args.rowData.percentage;
      this.Editallow.glueID = this.glueid;
      this.Editallow.ingredientID = args.rowData.id;
      this.allowDefault = args.rowData.allow;
    }
    if (args.requestType === 'save') {
      this.percentageEdit = {
        percentage: Number(args.data.percentage),
        id: Number(args.rowData.id)
      };
      this.allowEdit = {
        allow: Number(args.data.allow),
        id: Number(args.rowData.id)
      };
      this.Editpercentage.percentage = args.data.percentage;
      this.Editallow.allow = args.data.allow;
      const percentageChanged = Number(this.percentageDefault) !== Number(this.percentageChange);
      const AllowChanged = Number(this.allowDefault) !== Number(this.allowChange);
      if (percentageChanged) {
        // update lai percentage
        this.modified = false;
        const details = this.getLocalStore('details');
        const objIndex = details.findIndex((obj => obj.ingredientName === args.data.name && obj.ingredientID === args.data.id));
        details[objIndex].percentage = args.data.percentage;
        this.setLocalStore('details', details);
        // this.glueIngredientDetail = this.getLocalStore('details');
        this.updateChemicals();
      }

      if (AllowChanged) {
        // update lai allow
        const details = this.getLocalStore('details');
        const objIndex = details.findIndex((obj => obj.ingredientName === args.data.name && obj.ingredientID === args.data.id));
        details[objIndex].allow = args.data.allow;
        this.setLocalStore('details', details);
        this.modified = false;
        // this.glueIngredientDetail = this.getLocalStore('details');
        this.updateChemicals();
      }
    }
    if (args.requestType === 'delete') {
      this.ingredientService.delete(this.ingridientID).subscribe(() => {
        const details = this.getLocalStore('details').filter(item => item.ingredientID !== this.ingridientID);
        this.setLocalStore('details', details);
        this.glueIngredientDetail = details;
        this.getIngredients();
        this.makeFormula();
        this.alertify.success('Ingredient has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Ingredient');
      });
    }
  }
  actionComplete(args) {
    this.glueid = args.data.id;
    if (args.requestType === 'save') {
      this.glue.id = args.data.id;
      this.glue.name = args.data.name;
      this.glueService.update(this.glue).subscribe(res => {
        this.alertify.success('Updated successed!');
      });
    }
    if (args.requestType === 'delete') {
      this.alertify.confirm('Delete Glue', 'Are you sure you want to delete this GlueID "' + this.glueid + '" ?', () => {
        this.glueService.delete(this.glueid).subscribe(() => {
          this.getGlues();
          this.alertify.success('Glue has been deleted');
        }, error => {
          this.alertify.error('Failed to delete the Glue');
        });
      });
    }
  }
  loadPreview(glueid) {
    this.glueid = Number(glueid);
    this.getIngredients();
    this.getDetail(this.glueid);
    this.detailGlue = true;
  }
  rowDeselected(args) {
    // neu khong fai dang edit thi moi hoi
    const localstoreDetails = this.getLocalStore('details').sort(this.dynamicSort('position'));
    const check = this.compareArray(this.oldDetail, localstoreDetails);
    if (check === false) {
      if (args.isInteracted === true) {
        this.alertify.valid(
          'Warning',
          'Are you sure you want to discard the changes this?',
        ).then((result) => {
          this.modified = true;
          const index = this.gridglue.getSelectedRowIndexes()[0];
          this.gridglue.selectRow(index);
        }).catch((err) => {
          this.gridglue.selectRows(args.rowIndex);
        });
      }
    }
  }
  rowSelected(args: any) {

    const data = args.data[0] || args.data;
    this.selIndex = [args.rowIndex];
    if (!args.isInteracted && args.previousRowIndex) {
      this.selIndex = [args.previousRowIndex];
    }
    if (args.isInteracted) {
      if (args.data.name !== undefined && this.modified) {
        this.loadPreview(Number(args.data.id));
      }
    }
    if (args.isInteracted === false || args.target !== null) {
      if (data.name !== undefined && this.modified) {
        this.loadPreview(Number(data.id));
      }
    }
  }

  rowSelectedIngridient(args) {
    this.ingridientID = args.data.id;
  }

  resolver() {
    this.route.data.subscribe(data => {
      this.glues = data.glues.result;
      this.paginationG = data.glues.pagination;
    });
  }
  onService() {
    this.ingredientService.currentIngredient.subscribe(x => {
      if (x === 300) {
        this.getIngredients();
        this.updateChemicalList();
        this.ingredientService.changeIngredient(0);
      }
    });
  }
  mapGlue(data) {
    if (!data.status === true) {
      this.percentage = 0;
      const glueIngredient = {
        ingredientID: data.id,
        percentage: this.percentage,
        glueID: this.glueid
      };

      this.mapGlueIngredient(glueIngredient);
    } else {
      this.delete(this.glueid, data.id);
    }
  }

  async onOff($event, item) {
    if ($event.checked) {
      const { value: percentage } = await this.alertify.$swal.fire({
        value: item.percentage,
        title: 'How many kilograms do you want to enter?',
        input: 'number',
        inputPlaceholder: 'Enter KG',
        inputAttributes: {
        }
      });
      this.percentage = Number(percentage);
      const glueIngredient = {
        ingredientID: item.id,
        percentage: this.percentage,
        glueID: this.glueid
      };
      this.mapGlueIngredient(glueIngredient);
      this.alertify.success('Map GlueIngredient Successfully!');
      this.getIngredients();
      this.getDetail(this.glueid);

    } else {
      this.delete(this.glueid, item.id);
    }
  }

  getIngredients() {
    this.glueIngredientService.getIngredients(this.glueid)
      .subscribe((res: any) => {
        this.ingredients1 = res.result.list1;
        this.ingredients2 = res.result.list2;
      }, error => {
        this.alertify.error(error);
      });
  }

  onClickGlue($event, item) {
    this.glueid = item.id;
    this.getIngredients();
  }

  onPageChange($event) {
    this.paginationG.currentPage = $event;
    this.getGlues();
  }

  onPageChangeI($event) {
    this.paginationI.currentPage = $event;
    this.getIngredients();
  }

  getGlues() {
    this.glueService.getAllGlue()
      .subscribe((res: any) => {
        this.glues = res;
      }, error => {
        this.alertify.error(error);
      });
  }
  defaultIngredient() {

  }
  mapGlueIngredient(glueIngredient) {
    this.glueIngredientService.mappGlueIngredient(glueIngredient).subscribe(res => {
      if (this.subID === undefined) {
        this.ingredientID = undefined;
        this.getAllGluesByBPFCID(this.BPFCID);
        this.sortBySup(0);
        this.getDetail(this.glueid);
      } else {
        this.sortBySup(this.subID);
        this.getDetail(this.glueid);
        this.ingredientID = undefined;
        this.getAllGluesByBPFCID(this.BPFCID);
      }
    });
  }

  delete(glueid, ingredient) {
    this.glueIngredientService.delete(glueid, ingredient).subscribe(res => {
      this.alertify.success('GlueIngredient have been deleted!');
      this.getIngredients();
      this.getDetail(glueid);
    });
  }

  deleteGlue(glue) {
    this.alertify.confirm('Delete Glue', 'Are you sure you want to delete this GlueID "' + glue.id + '" ?', () => {
      this.glueService.delete(glue.id).subscribe(() => {
        this.getGlues();
        this.alertify.success('Glue has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Glue');
      });
    });
  }

  deleteIngridient(ingredient: IIngredient) {
    this.alertify.confirm('Delete Ingredient', 'Are you sure you want to delete this IngredientID "' + ingredient.id + '" ?', () => {
      this.ingredientService.delete(ingredient.id).subscribe(() => {
        this.getIngredients();
        this.alertify.success('Ingredient has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Ingredient');
      });
    });
  }

  onPageChangeGlue($event) {
    this.pagination.currentPage = $event;
    this.getGlues();
  }

  openGlueModalComponent() {
    const modalRef = this.modalService.open(GlueModalComponent, { size: 'md' });
    modalRef.componentInstance.glue = this.glue;
    modalRef.componentInstance.title = 'Add Glue';
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  openIngredientModalComponent() {
    const modalRef = this.modalService.open(IngredientModalComponent, { size: 'md' });
    modalRef.componentInstance.ingredient = this.ingredient;
    modalRef.componentInstance.title = 'Add Ingredient';
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  onDoubleClickIngredient(args: any): void {
    this.setFocus = args.column;  // Get the column from Double click event
  }
  actionCompleteIngredient(e: any): void {
    if (e.requestType === 'beginEdit') {
      e.form.elements.namedItem(this.setFocus.field).focus();  // Set focus to the Target element
      e.form.elements.namedItem(this.setFocus.field).value = '';  // Set focus to the Target element
    }
  }

  updateArticleNo(article: IArticleNo) {
    this.articleNoService.update(article).subscribe(res => {
      this.alertify.success('The article no has been updated!');
    });
  }

  deleteArticleNo(id) {
    this.articleNoService.delete(id).subscribe(res => {
      this.alertify.success('The article no has been deleted!');
    });
  }
  openPopupDropdownlist() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  toolbarClick(args: any): void {
    switch (args.item.text) {
      case 'Add New':
        const localstoreDetails = this.getLocalStore('details').sort(this.dynamicSort('position'));
        const check = this.compareArray(this.oldDetail, localstoreDetails);
        if (check === false) {
          this.alertify.valid(
            'Warning',
            'Are you sure you want to discard the changes this?',
          ).then((result) => {
            const glue: IGlue = {
              id: 0,
              name: '1',
              code: '',
              gluename: '',
              createdDate: '',
              BPFCEstablishID: this.BPFCID,
              kindID: null,
              partID: null,
              materialID: null,
              consumption: '',
              expiredTime: 0,
              createdBy: JSON.parse(localStorage.getItem('user')).User.ID,
            };
            this.glue = glue;
            this.saveGlue();

            this.sortBySup(0);
          }).catch((err) => {
            args.cancel = true;
          });
        } else {
          const glue: IGlue = {
            id: 0,
            name: '1',
            code: '',
            gluename: '',
            createdDate: '',
            BPFCEstablishID: this.BPFCID,
            kindID: null,
            partID: null,
            materialID: null,
            consumption: '',
            expiredTime: 0,
            createdBy: JSON.parse(localStorage.getItem('user')).User.ID,
          };
          this.glue = glue;
          this.saveGlue();
          this.sortBySup(0);
        }
        break;
    }
  }
  openModal(ref) {
    this.getModelNames();
    if (this.modelNameid > 0) {
      this.modalReference = this.modalService.open(ref);
    } else {
      this.alertify.warning('Please select a model name!', true);
    }
  }

  cloneModelname() {
    this.alertify.confirm(
      'Clone Model Name',
      'Are you sure you want to clone this model name?',
      () => {
        this.modalNameService.cloneModelname(this.modelNameid, this.modelNameClone, this.modelNoClone, this.valueProcess).subscribe(res => {
          this.alertify.success('the model name has been cloned');
          this.getAllBPFC();
          this.modalReference.close();
          this.modelNameDropdownlist.hidePopup();
        });
      }
    );
  }
  cloneArticleModelname() {
    this.alertify.confirm(
      'Clone Article',
      'Are you sure you want to clone this Article?',
      () => {
        this.modalNameService.cloneArticleModelname
          (this.modelNameid,
            this.modelNameClone,
            this.modelNoClone,
            this.articleName,
            this.processID)
          .subscribe(res => {
            this.alertify.success('The Article name has been cloned');
            this.getAllBPFC();
            this.modalReference.close();
            this.modelNameDropdownlist.hidePopup();
          });
      }
    );
  }
  approval() {
    const userid = JSON.parse(localStorage.getItem('user')).User.ID;
    this.bPFCEstablishService.approval(this.BPFCID, userid).subscribe(() => {
      this.alertify.success('The model name - model no has been approved!');
      this.getAllBPFC();
    });
  }
  done() {
    const userid = JSON.parse(localStorage.getItem('user')).User.ID;
    this.bPFCEstablishService.done(this.BPFCID, userid).subscribe((res: any) => {
      if (res.status === true) {
        this.alertify.success(res.message);
        this.getAllBPFC();
      } else {
        this.alertify.success(res.message);
      }
    });
  }
  checkColorCode(data): boolean {
    if (data.approvedStatus === true && data.createdStatus === true) {
      return true;
    } else {
      return false;
    }
  }
  checkDone(data): string {
    if (data.approvalStatus === true && data.finishedStatus === true) {
      return 'Done';
    } else {
      return 'Undone';
    }
  }

  onBeforeOpenArticle(args) {
    if (this.artQuantity === 0) {
      args.cancel = true;
      this.alertify.warning('Please create a Article #', true);
    }
  }

  // api
  getModelNames() {
    this.modalNameService.getAllModalName().subscribe(res => {
      this.modelNameData = res.map((item: any) => {
        return {
          id: item.id,
          name: item.name
        };
      });
    });
  }

  getArticleNoByModelNameID(modelNoID) {
    this.articleNoService.getArticleNoByModelNoID(modelNoID).subscribe(res => {
      this.articleNoData = res;
    });
  }

  getModelNoByModelNameID(modelNameID) {
    this.modelNoService.getModelNoByModelNameID(modelNameID).subscribe(res => {
      this.modelNoData = res;
    });
  }
  getArtProcessByArticleNoID(articleNoID) {
    this.artProcessService.getArtProcessByArticleNoID(articleNoID).subscribe(res => {
      this.modelNameData = res;
    });
  }

  getAllKind() {
    this.kindService.getAllKind().subscribe(res => {
      this.kinds = res;
    });
  }
  getAllPart() {
    this.partService.getAllPart().subscribe(res => {
      this.parts = res;
    });
  }
  getAllMaterial() {
    this.materialService.getAllMaterial().subscribe(res => {
      this.materials = res;
    });
  }
  // end api
}
