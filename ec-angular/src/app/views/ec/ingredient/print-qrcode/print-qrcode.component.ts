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
  public text: any;
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
      <style>
          body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #FAFAFA;
        font: 12pt "Tahoma";
    }
    * {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    .page {
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        margin: 10mm auto;
        border: 1px #D3D3D3 solid;
        border-radius: 5px;
        background: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
    .subpage {
        padding: 1cm;
        border: 5px red solid;
        height: 257mm;
        outline: 2cm #FFEAEA solid;
    }
     .content {
        height: 221px;
         border: 1px #D3D3D3 solid;
    }
    .content .qrcode {
      float:left;

      width: 177px;
      height:177px;
      margin-top: 12px;
      margin-bottom: 12px;
      margin-left: 5px;
       border: 1px #D3D3D3 solid;
    }
    .content .info {
       float:left;
       list-style: none;
    }
    .content .info ul {
       float:left;
       list-style: none;
       padding: 0;
       margin: 0;
      margin-top: 25px;
    }
    .content .info ul li.subInfo {
      padding: .75rem 1.25rem;
    }
    @page {
        size: A4;
        margin: 0;
    }
    @media print {
        html, body {
            width: 210mm;
            height: 297mm;
        }
        .page {
            margin: 0;
            border: initial;
            border-radius: initial;
            width: initial;
            min-height: initial;
            box-shadow: initial;
            background: initial;
            page-break-after: always;
        }
    }
      </style>
      <body onload="window.print(); window.close()">
      <div class='content'>
        <div class='qrcode'>
         ${printContent.innerHTML}
         </div>
          <div class='info'>
          <ul>
            <li class='subInfo'>${ this.text}</li>
              <li class='subInfo'>NSX: </li>
              <li class='subInfo'>NHH: </li>
          </ul>
         </div>
      </div>
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
      this.text = this.route.snapshot.paramMap.get('name');
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
      id: Number(this.route.snapshot.params.id),
      manufacturingDate: printtime
    };
    if (printtime !== this.datePipe.transform(this.dateValueDefault, 'MM-dd-yyyy')) {
      this.ingredientService.UpdatePrint(Ingredient).subscribe(() => {
        if (printtime === this.datePipe.transform(this.dateValueDefault, 'MM-dd-yyyy')) {
          this.text = this.name;
        } else {
          this.text = this.name +
            ' ' + this.datePipe.transform(this.dateValue, 'MM/dd/yyyy')
            + ' ' + this.datePipe.transform(this.dateprints, 'MM/dd/yyyy');
        }
      });
    }
  }
}


