import { Component, OnInit, PipeTransform } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';

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
    this.getIngredientInfoReport();
  }
  public ngAfterViewInit(): void {

  }
  resetSearch() {
    this.searchText = null ;
  }
  getIngredientInfoReport() {
    this.ingredientService.getAllIngredientInfo().subscribe((res: any) => {
      this.data = res ;
    });
  }
  startDateOnchange(args) {
    this.startDate = (args.value as Date);
    this.search(this.startDate, this.endDate);
  }

  endDateOnchange(args) {
    this.endDate = (args.value as Date);
    this.search(this.startDate, this.endDate);
  }

  onClickDefault() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.getIngredientInfoReport();
  }



  search(startDate, endDate) {
    this.ingredientService.searchInventory(startDate.toDateString(), endDate.toDateString()).subscribe((res: any) => {
      this.data = res ;
    });
  }

}
