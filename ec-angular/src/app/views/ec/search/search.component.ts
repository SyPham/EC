import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { DatePipe } from '@angular/common';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';

import { PlanService } from 'src/app/_core/_service/plan.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  isShow = false;
  showBatch = false;
  IngredientData: [] ;
  dataBatch: [];
  dataSearch: [];
  ingredientName: string ;
  public ingredients: any = [];
  constructor(
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    public ingredientService: IngredientService,
    private planService: PlanService,
    private spinner: NgxSpinnerService

  ) { }
  public ngOnInit(): void {
    this.getIngredient();
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
    const id = args.value ;
    this.ingredientName = args.itemData.name ;
    this.GetBatchByIngredientID(id);
  }
  GetBatchByIngredientID(id) {
    this.planService.GetBatchByIngredientID(id).subscribe((res: any) => {
      this.dataBatch = res;
    });
  }
  searchBatch(item) {
    this.isShow = true ;
    this.spinner.show();
    this.planService.TroubleShootingSearch(this.ingredientName, item.batchName)
    .subscribe((res: any) => {
      this.dataSearch = res ;
      this.spinner.hide();
    });
  }
}
