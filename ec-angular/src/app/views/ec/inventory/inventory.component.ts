import { Component, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [
    DatePipe,
    DecimalPipe
  ]
})
export class InventoryComponent implements OnInit {
  startDate: object = new Date();
  endDate: object = new Date();
  qrcodeChange: any;
  searchText: any;
  toolbarOptions = ['Search', 'ExcelExport'];
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 20 };
  filterSettings = { type: 'Excel' };
  @ViewChild('ingredientinforeportGrid') ingredientinforeportGrid: GridComponent;
  data: any = [];
  public ingredients: any = [];
  constructor(
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    public ingredientService: IngredientService,
    pipe: DecimalPipe
  ) { }

  public ngOnInit(): void {
    // this.getIngredientInfoReport();
    this.getIngredientInfoReportByBuilding();
  }
  public ngAfterViewInit(): void {

  }
  resetSearch() {
    this.searchText = null ;
  }
  toolbarClick(args) {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.ingredientinforeportGrid.excelExport();
        break;
      /* tslint:enable */
      case 'PDF Export':
        break;
    }
  }
  getIngredientInfoReport() {
    this.ingredientService.getAllIngredientInfo().subscribe((res: any) => {
      this.data = res ;
    });
  }
  getIngredientInfoReportByBuilding() {
    const levels = [1, 2, 3, 4];
    const building = JSON.parse(localStorage.getItem('level'));
    let buildingName = building.name;
    if (levels.includes(building.level)) {
      buildingName = 'E';
    }
    this.ingredientService.getAllIngredientInfoReportByBuildingName(buildingName).subscribe((res: any) => {
      this.data = res ;
    });
  }

  startDateOnchange(args) {
    this.startDate = (args.value as Date);
    // this.search(this.startDate, this.endDate);
    this.searchWithBuilding(this.startDate, this.endDate);
  }

  endDateOnchange(args) {
    this.endDate = (args.value as Date);
    // this.search(this.startDate, this.endDate);
    this.searchWithBuilding(this.startDate, this.endDate);
  }

  onClickDefault() {
    this.startDate = new Date();
    this.endDate = new Date();
    // this.getIngredientInfoReport();
    this.getIngredientInfoReportByBuilding();
  }

  search(startDate, endDate) {
    this.ingredientService.searchInventory(startDate.toDateString(), endDate.toDateString()).subscribe((res: any) => {
      this.data = res ;
    });
  }

  searchWithBuilding(startDate, endDate) {
    // this.ingredientService.searchInventory(startDate.toDateString(), endDate.toDateString()).subscribe((res: any) => {
    //   this.data = res ;
    // });
    const levels = [1, 2, 3, 4];
    const building = JSON.parse(localStorage.getItem('level'));
    let buildingName = building.name;
    if (levels.includes(building.level)) {
      buildingName = 'E';
    }
    this.ingredientService.searchInventoryByBuildingName(startDate.toDateString(), endDate.toDateString(), buildingName)
    .subscribe((res: any) => {
      this.data = res ;
    });
  }

}
