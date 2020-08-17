import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisplayTextModel, QRCodeGenerator } from '@syncfusion/ej2-angular-barcode-generator';
import { DatePipe } from '@angular/common';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-print-qrcode',
  templateUrl: './print-qrcode.component.html',
  styleUrls: ['./print-qrcode.component.css'],
  providers: [DatePipe]
})
export class PrintQRCodeComponent implements OnInit, AfterViewInit {
  public qrcode: any;
  public name: any;
  public id: any;
  public dateValue: any;
  public dateprint: Date = new Date();
  public dateprints: any;
  public dateValueDefault: any;
  public deadlineDefault: any;
  data: [];
  @ViewChild('barcode')
  public barcode: QRCodeGenerator;
  @ViewChild('displayText')
  public displayText: TextBoxComponent;
  public displayTextMethod: DisplayTextModel = {
    visibility: false
  };
  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private ingredientService: IngredientService,
  ) {
      this.dateprints = this.datePipe.transform(this.dateprint, 'MM-dd-yyyy');
    }

  ngOnInit(): void {
    this.onRouteChange();
    this.LoadQrCodeByID(this.id);
  }
  ngAfterViewInit() {

  }
  LoadQrCodeByID(id) {
    this.ingredientService.GetQrcodeByid(id).subscribe((result: any) => {
      if (result.manufacturingDate === '0001-01-01T00:00:00') {
        this.name = result.name;
        this.dateValue = new Date();
        this.dateValueDefault = new Date();
      } else {
        this.name = result.name;
        this.dateValue = result.manufacturingDate;
        this.dateValueDefault = result.manufacturingDate;
      }
    });
  }
  printData() {
    const printContent = document.getElementById('qrcode');
    const WindowPrt = window.open('', '_blank', 'left=0,top=0,width=1000,height=900,toolbar=0,scrollbars=0,status=0');
    // WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write(`
    <html>
      <head>
      </head>
      <body onload="window.print(); window.close()">
        <h1 style="text-align: center"> ${printContent.innerHTML}</h1>
        <h2 style="text-align: center">${ this.barcode.displayText.text} </h2>
      </body>
    </html>
    `);
    WindowPrt.document.close();
    // WindowPrt.focus();
    // WindowPrt.print();
    // WindowPrt.close();
  }
  onRouteChange() {
    this.route.data.subscribe(data => {
      this.qrcode = this.route.snapshot.paramMap.get('code');
      this.name = this.route.snapshot.paramMap.get('name');
      this.id = this.route.snapshot.params.id;
    });
  }
  PrintChanges(args) {
    const printtime = this.datePipe.transform(args.value, 'MM-dd-yyyy');
    this.deadlineDefault = printtime;
    // tslint:disable-next-line: prefer-const
    let d = new Date(args.value);
    d.setMonth(d.getMonth() + 3);
    this.dateprints = this.datePipe.transform(d, 'MM-dd-yyyy');
    // tslint:disable-next-line: prefer-const
    let Ingredient = {
      id: this.route.snapshot.params.id,
      manufacturingDate: printtime
    };
    this.ingredientService.UpdatePrint(Ingredient).subscribe(() => {
      // this.barcode.displayText.visibility = true;
      if (printtime === this.datePipe.transform(this.dateValueDefault, 'MM-dd-yyyy') ) {
        this.barcode.displayText.text = this.name;
      } else {
        this.barcode.displayText.text = this.name + ' - ' +
        this.datePipe.transform(this.dateValue, 'MM/dd/yyyy') + ' - ' +
        this.datePipe.transform(this.dateprints, 'MM/dd/yyyy');
      }
    });
  }
}
