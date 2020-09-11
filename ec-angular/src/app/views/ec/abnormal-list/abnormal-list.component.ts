import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { DisplayTextModel } from '@syncfusion/ej2-angular-barcode-generator';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { DatePipe } from '@angular/common';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';
import {
  PageSettingsModel,
  GridComponent,
  IEditCell,
  ToolbarItems,
} from '@syncfusion/ej2-angular-grids';
import {
  EditService,
  ToolbarService,
  PageService,
} from '@syncfusion/ej2-angular-grids';
import { AbnormalService } from 'src/app/_core/_service/abnormal.service';
declare const $: any;

@Component({
  selector: 'app-abnormal-list',
  templateUrl: './abnormal-list.component.html',
  styleUrls: ['./abnormal-list.component.css'],
  providers: [
    DatePipe
  ]
})
export class AbnormalListComponent implements OnInit, AfterViewInit {
  @ViewChild('buildingGrid')
  public buildingGrid: GridComponent;
  public fieldsIngredient: object = { text: 'name', value: 'id' };
  public fieldsBatch: object = { text: 'batchName', value: 'id' };
  ingredientID: number;
  qrcodeChange: any;
  data: [];
  isShow = false;
  IngredientData: [];
  batch: string;
  searchSettings: any = { hierarchyMode: 'Parent' };
  public toolbarOptions = ['Search',
    { text: 'Lock', tooltipText: 'Lock', prefixIcon: 'fa fa-lock', id: 'Lock' }
  ];
  public ingredients: any = [];
  public pageSettings = { pageSize: 15 };
  batches: any;
  ingredient: any;
  buildings: any;
  buildingSelected: any[];
  abnormals: any;
  abnormal = {
    userID: JSON.parse(localStorage.getItem('user')).User.ID,
    ingredient: '',
    building: ''
  };
  constructor(
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private abnormalService: AbnormalService,
    private datePipe: DatePipe,
    public ingredientService: IngredientService,
  ) { }
  public ngOnInit(): void {
    this.getIngredient();
    this.getAll();
  }
  public ngAfterViewInit(): void {

  }
  getIngredient() {
    this.ingredientService.getAllIngredient().subscribe((res: any) => {
      this.IngredientData = res;
    });
  }
  toolbarClick(args: any): void {

  }
  actionBegin(args) {
  }
  actionComplete(args) {

  }
  openPopupDropdownlist() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  public onFilteringIngredientName: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    // frame the query based on search string with filter type.
    query =
      e.text !== '' ? query.where('name', 'contains', e.text, true) : query;
    // pass the filter data source, filter query to updateData method.
    e.updateData(this.IngredientData, query);
  }
  public onFilteringBatch: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    // frame the query based on search string with filter type.
    query =
      e.text !== '' ? query.where('batchName', 'contains', e.text, true) : query;
    // pass the filter data source, filter query to updateData method.
    e.updateData(this.IngredientData, query);
  }

  onChangeIngredientName(args) {
    console.log(args);
    this.ingredient = args.itemData.name;
    this.abnormal.ingredient = args.itemData.name;
    this.abnormalService.getBatchByIngredientID(args.value).subscribe((res: any) => {
      console.log(res);
      this.batches = res;
    });
  }
  onChangeBatch(args) {
    console.log(args);
    this.abnormalService.getBuildingByIngredientAndBatch(this.ingredient, args.itemData.batchName).subscribe((res: any) => {
      console.log('getBuildingByIngredientAndBatch', res);
      this.abnormal.ingredient = args.itemData.batchName;
      this.buildings = res;
    });
  }
  search() {
  }
  rowSelected(args) {
    this.buildingSelected = this.buildingGrid.getSelectedRecords();
    console.log(this.buildingSelected)
  }
  rowDeselected(args) {
    this.buildingSelected = this.buildingGrid.getSelectedRecords();
    console.log(this.buildingSelected)
  }

  getAll() {
    this.abnormalService.getAll().subscribe(res => {
      this.abnormals = res;
    });
  }
  create() {
    this.abnormalService.create(this.abnormal).subscribe(() => {
      this.alertify.success('Successfully!!!');
      this.getAll();
    });
  }
  createRange() {
   const obj = this.buildingSelected.map( (item) => {
      return {
        building: item.name,
        ingredient: this.abnormal.ingredient,
        userID: this.abnormal.userID
      };
    });
   console.log(obj);
   this.abnormalService.createRange(obj).subscribe(() => {
      this.alertify.success('Successfully!!!');
      this.getAll();
    });
  }
  lock() {
    this.createRange();
  }
}
