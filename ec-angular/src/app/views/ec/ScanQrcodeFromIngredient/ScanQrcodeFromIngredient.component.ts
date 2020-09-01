import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ElementRef, QueryList, Query, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { DisplayTextModel } from '@syncfusion/ej2-angular-barcode-generator';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { DatePipe } from '@angular/common';

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
  test: any =  'form-control';
  constructor(
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    public ingredientService: IngredientService,
  ) { }
  public ngOnInit(): void {
    this.getIngredientInfo();
  }
  public ngAfterViewInit(): void {

  }
  onNgModelChangeScanQRCode(args) {
    if (args.length === 8) {
      this.ingredientService.scanQRCodeFromChemicalWareHouse(args).subscribe((res: any) => {
        // console.log(res);
        if (res === true) {
          this.getIngredientInfo();
        }
      });
    }
  }
  getIngredientInfo() {
    let start = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    let end = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.ingredientService.getAllIngredientInfo().subscribe((res: any) => {
      this.data = res ;
      // this.ConvertClass(res);
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
  delete(id){
    console.log(id);
    this.ingredientService.deleteIngredientInfo(id).subscribe(() => {
      this.alertify.success('Delete Success!');
      this.getIngredientInfo();
    })
  }
}
