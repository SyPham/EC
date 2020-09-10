import { Component, OnInit } from '@angular/core';
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
declare const $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [
    DatePipe
  ]
})
export class SearchComponent implements OnInit {
  public fieldsIngredient: object = { text: 'name', value: 'id' };
  ingredientID: number;
  qrcodeChange: any;
  data: [];
  isShow: boolean = false;
  showBatch: boolean = false;
  IngredientData: [] ;
  public ingredients: any = [];
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
    this.showBatch = true;
  }

  searchBatch() {
    this.isShow = true ;
  }
}
