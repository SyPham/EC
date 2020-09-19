import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ElementRef, QueryList, Query, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { DisplayTextModel } from '@syncfusion/ej2-angular-barcode-generator';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { DatePipe } from '@angular/common';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css'],
  providers: [
    DatePipe
  ]
})
export class IncomingComponent implements OnInit {
  @ViewChild('scanQRCode') scanQRCodeElement: ElementRef;
  public displayTextMethod: DisplayTextModel = {
    visibility: false
  };
  public filterSettings: object;
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  @ViewChild('grid') public grid: GridComponent;
  toolbarOptions: string[];
  @ViewChild('scanText', { static: false }) scanText: ElementRef;
  qrcodeChange: any;
  data: [];
  dataOut: [];
  checkout = false;
  checkin = true;
  public ingredients: any = [];
  test: any = 'form-control w3-light-grey';
  checkCode: boolean;
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

  OutputChange(args) {
    this.checkin = false;
    this.checkout = true;
    this.getIngredientInfoOutput();
  }

  InputChange(args) {
    this.checkin = true;
    this.checkout = false;
    this.getIngredientInfo();
  }
  toolbarClick(args): void {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.grid.excelExport();
        break;
      /* tslint:enable */
      case 'PDF Export':
        break;
    }
  }
  // sau khi scan input thay doi
  async onNgModelChangeScanQRCode(args) {
    const input = args.split('-');
    const barcode = args.split('-')[2];
    if (input.length !== 3) {
      return;
    }
    if (input[2].length !== 8) {
      return;
    }
    const levels = [1, 2, 3, 4];
    const building = JSON.parse(localStorage.getItem('level'));
    let buildingName = building.name;
    if (levels.includes(building.level)) {
      buildingName = 'E';
    }
    this.findIngredientCode(barcode);

    if (this.checkin === true) {
      if (this.checkCode === true) {
        const userID = JSON.parse(localStorage.getItem('user')).User.ID;
        this.ingredientService.scanQRCodeFromChemicalWareHouse(args, buildingName, userID).subscribe((res: any) => {
          if (res === true) {
            this.getIngredientInfo();
          }
        });
      } else {
        this.alertify.error('Wrong Chemical!');
      }
    } else {
      if (this.checkCode === true) {
        const userID = JSON.parse(localStorage.getItem('user')).User.ID;
        this.ingredientService.scanQRCodeOutput(args, buildingName, userID).subscribe((res: any) => {
          if (res === true) {
            this.getIngredientInfoOutput();
          } else {
            this.alertify.error(res.message);
          }
        });
      } else {
        this.alertify.error('Wrong Chemical!');
      }
    }
  }

  // load danh sach IngredientInfo
  getIngredientInfo() {
    this.ingredientService.getAllIngredientInfo().subscribe((res: any) => {
      this.data = res;
      // this.ConvertClass(res);
    });
  }

  getIngredientInfoOutput() {
    this.ingredientService.getAllIngredientInfoOutput().subscribe((res: any) => {
      this.data = res;
      // this.ConvertClass(res);
    });
  }

  // tim Qrcode dang scan co ton tai khong
  findIngredientCode(code) {
    for (const item of this.ingredients) {
      if (item.code === code) {
        // return true;
        this.checkCode = true;
        break;
      } else {
        this.checkCode = false;
      }
    }
  }

  // lay toan bo Ingredient
  getAllIngredient() {
    this.ingredientService.getAllIngredient().subscribe((res: any) => {
      this.ingredients = res;
    });
  }

  // dung de convert color input khi scan nhung chua can dung
  ConvertClass(res) {
    if (res.length !== 0) {
      this.test = 'form-control success-scan';
    } else {
      this.test = 'form-control error-scan';
      this.alertify.error('Wrong Chemical!');
    }
  }

  // xoa Ingredient Receiving
  delete(item) {
    this.ingredientService.deleteIngredientInfo(item.id, item.code, item.qty, item.batch).subscribe(() => {
      this.alertify.success('Delete Success!');
      this.getIngredientInfo();
      this.getIngredientInfoOutput();
    });
  }

  // luu du lieu sau khi scan Qrcode vao IngredientReport
  confirm() {
    this.alertify.confirm('Do you want confirm this', 'Do you want confirm this', () => {
      this.alertify.success('Confirm Success');
    });
  }
}
