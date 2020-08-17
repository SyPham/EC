import { Component, OnInit, ViewChild } from '@angular/core';

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
@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {
  data: IIngredient[];
  modalReference: NgbModalRef;
  excelDownloadUrl: string;
  @ViewChild('barcode')
  public barcode: QRCodeGenerator;
  ingredient: IIngredient = {
    id: 0,
    name: '',
    code: '',
    percentage: 0,
    createdDate: '',
    supplierID: 0,
    position: 0,
    allow: 0,
    expiredTime: 0,
    voc: '0'
  };
  pagination: Pagination;
  page = 1;
  currentPage = 1;
  itemsPerPage = 10;
  totalItems: any;
  file: any;
  public displayTextMethod: DisplayTextModel = {
    visibility: false
  };
  text: any;
  constructor(
    private modalNameService: ModalNameService,
    public modalService: NgbModal,
    private ingredientService: IngredientService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }
  show: boolean;
  ngOnInit() {
    this.excelDownloadUrl = `${environment.apiUrlEC}Ingredient/ExcelExport`;
    this.ingredientService.currentIngredient.subscribe(res => {
      if (res === 300) {
        this.getIngredients();
      }
    });
    this.getIngredients();
  }
  printData() {
    const printContent = document.getElementById('qrcode');
    const WindowPrt = window.open('');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
  printBarcode() {
    this.show = true;
  }
  backList() {
    this.show = false;
  }
  getIngredients() {
    // this.spinner.show();
    this.ingredientService.getIngredients(this.currentPage, this.itemsPerPage)
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
      // console.log('Get All: ', res);
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
    this.getIngredients();
  }
  openIngredientModalComponent() {
    const modalRef = this.modalService.open(IngredientModalComponent, { size: 'md' });
    modalRef.componentInstance.ingredient = this.ingredient;
    modalRef.componentInstance.title = 'Add Ingredient';
    modalRef.result.then((result) => {
      // console.log('OpenIngredientModalComponent', result );
    }, (reason) => {
    });
  }
  openIngredientEditModalComponent(item) {
    const modalRef = this.modalService.open(IngredientModalComponent, { size: 'md' });
    modalRef.componentInstance.ingredient = item;
    modalRef.componentInstance.title = 'Edit Ingredient';
    modalRef.result.then((result) => {
      // console.log('openIngredientEditModalComponent', result );
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
}
