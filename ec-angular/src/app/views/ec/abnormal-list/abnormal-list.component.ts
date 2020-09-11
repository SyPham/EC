import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
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
declare const $: any;

@Component({
  selector: 'app-abnormal-list',
  templateUrl: './abnormal-list.component.html',
  styleUrls: ['./abnormal-list.component.css'],
  providers: [
    DatePipe
  ]
})
export class AbnormalListComponent implements OnInit {

  public fieldsIngredient: object = { text: 'name', value: 'id' };
  ingredientID: number;
  qrcodeChange: any;
  data: [];
  isShow: boolean = false;
  IngredientData: [] ;
  batch: string;
  searchSettings: any = { hierarchyMode: 'Parent' };
  public toolbarOptions = [ 'Search',
    { text: 'Lock', tooltipText: 'Lock', prefixIcon: 'fa fa-lock', id: 'Lock' }
  ];
  public ingredients: any = [];
  public pageSettings = { pageSize: 15 };
  constructor(
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    public ingredientService: IngredientService,
  ) { }
  public ngOnInit(): void {
    this.getIngredient();
  }
  public ngAfterViewInit(): void {

  }
  getIngredient() {
    this.ingredientService.getAllIngredient().subscribe((res: any) => {
      this.IngredientData = res ;
    });
  }
  toolbarClick(args: any): void {

  }
  actionBegin(args) {
  }
  actionComplete(args) {

  }
  rowSelected(args) {
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

  onChangeIngredientName(args) {
    this.isShow = false ;
  }

  search() {
    this.isShow = true ;
  }

}
