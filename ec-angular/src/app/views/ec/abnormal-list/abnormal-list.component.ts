import { AbnormalService } from './../../../_core/_service/abnormal.service';
import { AlertifyService } from './../../../_core/_service/alertify.service';
import { IngredientService } from './../../../_core/_service/ingredient.service';
import { BuildingUserService } from './../../../_core/_service/building.user.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { AlertifyService } from 'src/app/_core/_service/alertify.service';
// import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { DatePipe } from '@angular/common';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
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
// import { AbnormalService } from 'src/app/_core/_service/abnormal.service';
// import { BuildingUserService } from 'src/app/_core/_service/building.user.service';
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
  @ViewChild('buildingGrid') public buildingGrid: GridComponent;
  public fieldsIngredient: object = { text: 'name', value: 'id' };
  public fieldsBatch: object = { text: 'batchName', value: 'id' };
  ingredientID: number;
  qrcodeChange: any;
  data: [];
  isShow = false;
  IngredientData: [];
  batch: string;
  searchSettings: any = { hierarchyMode: 'Parent' };
  // filterSettings = { type: 'Excel' };
  public toolbarOptions = ['Search'];
  filterSettings = { type: 'Excel' };
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
    building: '',
    batch: ''
  };
  users: any;
  constructor(
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private abnormalService: AbnormalService,
    private datePipe: DatePipe,
    private buildingUserService: BuildingUserService,
    public ingredientService: IngredientService,
  ) { }
  public ngOnInit(): void {
    this.getUsers();
    this.getIngredient();
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
    query = e.text !== '' ? query.where('name', 'contains', e.text, true) : query;
    // pass the filter data source, filter query to updateData method.
    e.updateData(this.IngredientData, query);
  }

  public onFilteringBatch: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    // frame the query based on search string with filter type.
    query = e.text !== '' ? query.where('batchName', 'contains', e.text, true) : query;
    // pass the filter data source, filter query to updateData method.
    e.updateData(this.IngredientData, query);
  }

  onChangeIngredientName(args) {
    if (args.itemData) {
      this.buildings = [];
      this.batches = [];
      this.ingredient = args.itemData?.name;
      this.abnormal.ingredient = args.itemData?.name;
      this.abnormalService.getBatchByIngredientID(args.value).subscribe((res: any) => {
        console.log(res);
        this.batches = res;
      });
    }
  }
  onChangeBatch(args) {
    if (args.itemData) {
      this.abnormal.batch = args.itemData?.batchName;
      this.abnormalService.getBuildingByIngredientAndBatch(this.ingredient, args.itemData?.batchName).subscribe((res: any) => {
        this.buildings = res;
      });
    }
  }

  search() {
  }

  getUsers() {
    this.buildingUserService.getAllUsers(1, 1000).subscribe(res => {
      const data = res.result.map((i: any) => {
        return {
          ID: i.ID,
          Username: i.Username,
          Email: i.Email
        };
      });
      this.users = data;
      this.getAll();
    });
  }

  username(id) {
    return (this.users.find(item => item.ID === id) as any).Username;
  }

  rowSelected(args) {
    this.buildingSelected = this.buildingGrid.getSelectedRecords();
  }

  rowDeselected(args) {
    this.buildingSelected = this.buildingGrid.getSelectedRecords();
  }

  getAll() {
    this.abnormalService.getAll().subscribe((res: any) => {
      this.abnormals = res.map( (item: any) => {
        return {
          id: item.id,
          ingredient: item.ingredient,
          batch: item.batch,
          building: item.building,
          lockBy: this.username(item.userID),
          createdDate: new Date(item.createdDate)
        };
      });
    });
  }

  create() {
    this.abnormalService.create(this.abnormal).subscribe(() => {
      this.alertify.success('Successfully!!!');
      this.getAll();
    });
  }

  createRange() {
    if (!this.buildingSelected) {
      this.alertify.warning('Please chose buildings first!');
      return;
    }
    const obj = this.buildingSelected.map( (item) => {
      return {
        building: item.name,
        ingredient: this.abnormal.ingredient,
        userID: this.abnormal.userID,
        batch: this.abnormal.batch
      };
    });
    console.log(obj);
    this.abnormalService.createRange(obj).subscribe(() => {
      this.alertify.success('Successfully!!!');
      this.getAll();
    });
  }

  delete(id) {
    this.abnormalService.delete(id).subscribe(() => {
      this.alertify.success('Successfully!!!');
      this.getAll();
    });
  }
  lock() {
    this.createRange();
  }
  unlock(data) {
    console.log(data);
    this.delete(data.id);
  }
}
