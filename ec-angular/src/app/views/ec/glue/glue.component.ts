import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { GlueModalComponent } from './glue-modal/glue-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { IGlue } from 'src/app/_core/_model/glue';
import { Pagination, PaginatedResult } from 'src/app/_core/_model/pagination';
import { GlueService } from 'src/app/_core/_service/glue.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { DisplayTextModel } from '@syncfusion/ej2-angular-barcode-generator';

@Component({
  selector: 'app-glue',
  templateUrl: './glue.component.html',
  styleUrls: ['./glue.component.scss']
})
export class GlueComponent implements OnInit {
  data: IGlue[];
  glue: IGlue = {
    id: 0,
    name: '',
    code: '',
    gluename: '',
    createdDate: '',
    kindID: null,
    partID: null,
    materialID: null,
    BPFCEstablishID: 0,
    consumption: '',
    expiredTime: 0,
    createdBy: JSON.parse(localStorage.getItem('user')).User.ID,
  };
  show: boolean;
  pagination: Pagination;
  page = 1 ;
  public displayTextMethod: DisplayTextModel = {
    visibility: false
  };
  constructor(
    public modalService: NgbModal,
    private glueService: GlueService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.data = data.glues.result;
      this.pagination = data.glues.pagination;
      this.glueService.currentGlue.subscribe(res => {
        if (res === 200) {
           this.getGlues();
        }
      });
    });
  }
  printBarcode() {
    this.show = true;
  }
  backList() {
    this.show = false;
  }
  getGlues() {
     this.glueService.getGlues(this.pagination.currentPage, this.pagination.itemsPerPage)
       .subscribe((res: PaginatedResult<IGlue[]>) => {
         this.data = res.result;
         this.pagination = res.pagination;
       }, error => {
         this.alertify.error(error);
       });
   }
  getAll() {
    this.glueService.getAllGlue().subscribe(res => {
      this.data = res;
    });
  }

  delete(glue: IGlue) {
    this.alertify.confirm('Delete Glue', 'Are you sure you want to delete this GlueID "' + glue.id + '" ?', () => {
      this.glueService.delete(glue.id).subscribe(() => {
        this.getGlues();
        this.alertify.success('Glue has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Glue');
      });
    });
  }
  onPageChange($event) {
    this.pagination.currentPage = $event;
    this.getGlues();
  }
  openGlueModalComponent() {
    const modalRef = this.modalService.open(GlueModalComponent, { size: 'md' });
    modalRef.componentInstance.glue = this.glue;
    modalRef.componentInstance.title = 'Add Glue';
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
  openGlueEditModalComponent(item) {
    const modalRef = this.modalService.open(GlueModalComponent, { size: 'md' });
    modalRef.componentInstance.glue = item;
    modalRef.componentInstance.title = 'Edit Glue';
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

}
