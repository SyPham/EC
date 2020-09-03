import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ElementRef, QueryList, Query, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { DisplayTextModel } from '@syncfusion/ej2-angular-barcode-generator';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { DatePipe } from '@angular/common';
import { ok } from 'assert';

@Component({
  selector: 'app-ScanQrcodeFromIngredient',
  templateUrl: './ScanQrcodeFromIngredient.component.html',
  styleUrls: ['./ScanQrcodeFromIngredient.component.css'],
  providers: [
    DatePipe
  ]
})
export class ScanQrcodeFromIngredientComponent implements OnInit, AfterViewInit {
  @ViewChild('scanQRCode') scanQRCodeElement: ElementRef;
  public displayTextMethod: DisplayTextModel = {
    visibility: false
  };
  @ViewChild('scanText', { static: false }) scanText: ElementRef;
  qrcodeChange: any;
  data: [];
  public ingredients: any = [];
  test: any =  'form-control';
  checkCode: boolean ;
  constructor(
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    public ingredientService: IngredientService,
  ) { }
  public ngOnInit(): void {
    this.getIngredientInfo();
    this.getAllIngredient();
  }
  public ngAfterViewInit(): void {

  }
  onNgModelChangeScanQRCode(args) {
    let barcode = args.split('-')[2];
    console.log(barcode);
    this.findIngredientCode(barcode);
    if (this.checkCode === true) {
        this.ingredientService.scanQRCodeFromChemicalWareHouse(args).subscribe((res: any) => {
        if (res === true) {
          this.getIngredientInfo();
        }
      });
    } else {
        this.alertify.error('Wrong Chemical!');
    }
  }
  getIngredientInfo() {
    this.ingredientService.getAllIngredientInfo().subscribe((res: any) => {
      this.data = res ;
      // this.ConvertClass(res);
    });
  }
  findIngredientCode(code) {
    for (let item of this.ingredients) {
      if (item.code === code) {
        // return true;
        this.checkCode = true ;
        break;
      } else {
        this.checkCode = false ;
      }
    }
  }
  getAllIngredient() {
    this.ingredientService.getAllIngredient().subscribe((res: any) => {
      this.ingredients = res ;
    });
  }
  ConvertClass(res) {
    if (res.length !== 0) {
      this.test = 'form-control success-scan';
    } else {
      this.test = 'form-control error-scan';
      this.alertify.error('Wrong Chemical!');
    }
  }
  delete(item){
    this.ingredientService.deleteIngredientInfo(item.id, item.code, item.qty).subscribe(() => {
      this.alertify.success('Delete Success!');
      this.getIngredientInfo();
    });
  }
  confirm() {
    this.alertify.confirm('Do you want confirm this', 'Do you want confirm this', () => {
      this.alertify.success('Confirm Success');
    });
  }
}
