import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { IngredientModalComponent } from './ingredient-modal/ingredient-modal.component';
import { Pagination, PaginatedResult } from 'src/app/_core/_model/pagination';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { IIngredient } from 'src/app/_core/_model/Ingredient';
import { ModalNameService } from 'src/app/_core/_service/modal-name.service';
import { environment } from '../../../../environments/environment';
import { QRCodeGenerator, DisplayTextModel } from '@syncfusion/ej2-angular-barcode-generator';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DatePipe } from '@angular/common';

declare let $: any;
@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss'],
  providers: [DatePipe]
})
export class IngredientComponent implements OnInit, AfterViewInit {
  editSettings = { showDeleteConfirmDialog: false, allowEditing: true, mode: 'Normal' };
  pageSettings = { pageCount: 20, pageSizes: true, currentPage: 1, pageSize: 10 };
  data: any;
  modalReference: NgbModalRef;
  excelDownloadUrl: string;
  public mfg = this.datePipe.transform(new Date(), 'yyyyMMdd');
  public exp = this.datePipe.transform(new Date().setMonth(4), 'yyyyMMdd');
  @ViewChild('barcode')
  public barcode: QRCodeGenerator;
  @ViewChild('printGrid')
  public printGrid: GridComponent;
  ingredient: IIngredient = {
    id: 0,
    name: '',
    code: '',
    percentage: 0,
    createdDate: new Date(),
    supplierID: 0,
    position: 0,
    allow: 0,
    expiredTime: 0,
    voc: 0,
    materialNO: '',
    unit: 0
  };
  pagination: Pagination;
  page = 1;
  currentPage = 1;
  itemsPerPage = 15;
  totalItems: any;
  file: any;
  public displayTextMethod: DisplayTextModel = {
    visibility: false
  };
  toolbar = ['Search'];
  text: any;
  dataPrint: any;
  dataPicked: Array<any> = [];
  filterSettings: any;
  toolbarOptions: any;
  @ViewChild('ingredientGrid') ingredientGrid: GridComponent;
  show: boolean;
  constructor(
    private modalNameService: ModalNameService,
    public modalService: NgbModal,
    private ingredientService: IngredientService,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.filterSettings = { type: 'Excel' };
    this.toolbarOptions = ['ExcelExport', 'Search'];
    this.excelDownloadUrl = `${environment.apiUrlEC}Ingredient/ExcelExport`;
    this.ingredientService.currentIngredient.subscribe(res => {
      if (res === 300) {
        this.getIngredients();
        this.ingredient = {
          id: 0,
          name: '',
          code: '',
          percentage: 0,
          createdDate: new Date(),
          supplierID: 0,
          position: 0,
          allow: 0,
          voc: 0,
          expiredTime: 0,
          materialNO: '',
          unit: 0
        };
      }
    });
    this.getIngredients();
    this.getAllIngredients();

  }
  ngAfterViewInit() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  dataBound() {
    console.log('sadasdasd', this.ingredientGrid.pageSettings.currentPage);
  }
  toolbarClick(args): void {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.ingredientGrid.excelExport();
        break;
      /* tslint:enable */
      case 'PDF Export':
        break;
    }
  }
  actionBegin(args) {
    if (args.requestType === 'beginEdit') {
    }
    if (args.requestType === 'save') {
      if (args.action === 'edit') {
        if (args.data) {
          this.updateBatch(args.data.id, args.data.batch);
          const pd = (args.data.productionDate as Date);
          if (pd instanceof Date) {
            const productionDate = this.datePipe.transform(pd, 'yyyyMMdd');
            this.updateProductionDate(args.data.id, productionDate);
            const expDate = this.datePipe.transform(pd.setMonth(4), 'yyyyMMdd');
            this.updateExp(args.data.id, expDate);
          }
        }
      }
    }
  }
  configurePrint(html) {
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
      padding: .15rem .75rem;
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
        ${html}
      </body>
    </html>
    `);
    WindowPrt.document.close();
  }
  printData() {
    let html = '';
    for (const item of this.dataPicked) {
      const content = document.getElementById(item.code);
      html += `
       <div class='content'>
        <div class='qrcode'>
         ${content.innerHTML}
         </div>
          <div class='info'>
          <ul>
            <li class='subInfo'>Name: ${ item.name}</li>
              <li class='subInfo'>QR Code: ${ item.qrCode}</li>
              <li class='subInfo'>Expired Time: ${ item.expiredTime} min</li>
              <li class='subInfo'>MFG: ${ item.productionDate}</li>
              <li class='subInfo'>EXP: ${ item.exp}</li>
          </ul>
         </div>
      </div>
      `;
    }
    this.configurePrint(html);
  }
  printBarcode() {
    this.show = true;
    this.getAllIngredients();

  }
  rowSelected(args) {
    this.dataPicked = this.printGrid.getSelectedRecords().map((item: any) => {
      return {
        id: item.id,
        code: item.code,
        name: item.name,
        supplier: item.supplier,
        batch: item.batch,
        expiredTime: item.expiredTime,
        productionDate: item.productionDate,
        exp: item.exp,
        qrCode: `${item.productionDate}-${item.batch}-${item.code}`
      };
    });
  }
  rowDeselected(args) {
    this.dataPicked = this.printGrid.getSelectedRecords().map((item: any) => {
      return {
        id: item.id,
        code: item.code,
        name: item.name,
        supplier: item.supplier,
        batch: item.batch,
        expiredTime: item.expiredTime,
        productionDate: item.productionDate,
        exp: item.exp,
        qrCode: `${item.productionDate}-${item.batch}-${item.code}`
      };
    });

  }
  updateBatch(id, batch) {
    for (const key in this.dataPrint) {
      if (this.dataPrint[key].id === id) {
        this.dataPrint[key].batch = batch;
        break;
      }
    }
  }
  updateProductionDate(id, batch) {
    for (const key in this.dataPrint) {
      if (this.dataPrint[key].id === id) {
        this.dataPrint[key].productionDate = batch;
        break;
      }
    }
  }
  updateExp(id, batch) {
    for (const key in this.dataPrint) {
      if (this.dataPrint[key].id === id) {
        this.dataPrint[key].exp = batch;
        break;
      }
    }
  }
  onChange(args, data) {
    this.updateBatch(data.id, args.target.value);
  }
  pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }
  onChangeDate(args, data) {
    console.log('onChangeDate', args, data);
    if (data) {
      const pd = (args.value as Date);
      const productionDate = this.datePipe.transform(pd, 'yyyyMMdd');
      this.updateProductionDate(args.data.id, productionDate);
      const expDate = this.datePipe.transform(pd.setMonth(4), 'yyyyMMdd');
      this.updateExp(args.data.id, expDate);
    }
  }
  backList() {
    this.show = false;
    this.dataPicked = [];
  }
  getIngredients() {
    // this.spinner.show();
    this.ingredientService.getAllIngredient()
      .subscribe((res: any) => {
        this.data = res.map((item: any) => {
          return {
            id: item.id,
            supplier: item.supplier,
            name: item.name,
            voc: item.voc,
            expiredTime: item.expiredTime,
            materialNO: item.materialNO,
            unit: item.unit,
            createdDate: new Date(item.createdDate),
          };
        });
      }, error => {
        this.alertify.error(error);
      });
  }
  getAllIngredients() {
    // this.spinner.show();
    this.ingredientService.getAllIngredient()
      .subscribe((res: any) => {
        this.dataPrint = res.map((item: any) => {
          return {
            id: item.id,
            code: item.code,
            name: item.name,
            supplier: item.supplier,
            batch: 'DEFAULT',
            expiredTime: item.expiredTime,
            productionDate: this.datePipe.transform(new Date(), 'yyyyMMdd'),
            exp: this.datePipe.transform(new Date().setMonth(4), 'yyyyMMdd')
          };
        });
      }, error => {
        this.alertify.error(error);
      });
  }
  search() {
    // this.spinner.show();
    if (this.text) {
      this.ingredientService.search(this.currentPage, this.itemsPerPage, this.text)
        .subscribe((res: PaginatedResult<IIngredient[]>) => {
          this.data = res.result;
          this.pagination = res.pagination;
          this.totalItems = res.pagination.totalItems;
          this.currentPage = res.pagination.currentPage;
          this.itemsPerPage = res.pagination.itemsPerPage;
          //    this.spinner.hide();
        }, error => {
          this.alertify.error(error);
        });
    } else {
      this.getIngredients();
    }
  }

  getAll() {
    this.ingredientService.getAllIngredient().subscribe(res => {
      this.data = res;
    });
  }

  delete(ingredient: IIngredient) {
    this.alertify.confirm('Delete Ingredient', 'Are you sure you want to delete this IngredientID "' + ingredient.id + '" ?', () => {
      this.ingredientService.delete(ingredient.id).subscribe(() => {
        this.getIngredients();
        this.alertify.success('Ingredient has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Ingredient');
      });
    });
  }
  onPageChange($event) {
    this.currentPage = $event;
    if (this.text) {
      this.ingredientService.search(this.currentPage, this.itemsPerPage, this.text)
        .subscribe((res: PaginatedResult<IIngredient[]>) => {
          this.data = res.result;
          this.pagination = res.pagination;
          this.totalItems = res.pagination.totalItems;
          this.currentPage = res.pagination.currentPage;
          this.itemsPerPage = res.pagination.itemsPerPage;
          //    this.spinner.hide();
        }, error => {
          this.alertify.error(error);
        });
    } else {
      this.getIngredients();
    }
  }
  openIngredientModalComponent() {
    const modalRef = this.modalService.open(IngredientModalComponent, { size: 'md' });
    modalRef.componentInstance.ingredient = this.ingredient;
    modalRef.componentInstance.title = 'Add Ingredient';
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
  openIngredientEditModalComponent(item) {
    const modalRef = this.modalService.open(IngredientModalComponent, { size: 'md' });
    modalRef.componentInstance.ingredient = item;
    modalRef.componentInstance.title = 'Edit Ingredient';
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
  fileProgress(event) {
    this.file = event.target.files[0];
  }
  uploadFile() {
    const createdBy = JSON.parse(localStorage.getItem('user')).User.ID;
    this.ingredientService.import(this.file, createdBy)
      .subscribe((res: any) => {
        this.getAll();
        this.alertify.success('The excel has been imported into system!');
      });
  }
  showModal(name) {
    this.modalReference = this.modalService.open(name, { size: 'xl' });
  }
  NO(index) {
    return (this.ingredientGrid.pageSettings.currentPage - 1) * this.pageSettings.pageSize + Number(index) + 1;
  }
}
