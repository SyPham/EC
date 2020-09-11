import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ElementRef, QueryList, Query, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { DisplayTextModel } from '@syncfusion/ej2-angular-barcode-generator';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [
    DatePipe
  ]
})
export class InventoryComponent implements OnInit {
  startDate: object = new Date();
  endDate: object = new Date();
  qrcodeChange: any;
  data: [];
  public ingredients: any = [];
  constructor(
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    public ingredientService: IngredientService,
  ) { }
  public ngOnInit(): void {
    this.getIngredientInfoReport();
  }
  public ngAfterViewInit(): void {

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

  getIngredientInfoReport() {
    this.ingredientService.getAllIngredientInfoReport().subscribe((res: any) => {
      this.data = res ;
    });
  }

  search(startDate, endDate) {
    this.ingredientService.searchInventory(startDate.toDateString(), endDate.toDateString()).subscribe((res: any) => {
      this.data = res ;
    });
  }

}
