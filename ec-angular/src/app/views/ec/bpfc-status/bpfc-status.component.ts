import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalName } from './../../../_core/_model/modal-name';
import { ModalNameService } from './../../../_core/_service/modal-name.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { PageSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { GlueService } from 'src/app/_core/_service/glue.service';
import { ICommentModelName } from 'src/app/_core/_model/comment';
import { CommentService } from 'src/app/_core/_service/comment.service';
import { BuildingUserService } from 'src/app/_core/_service/building.user.service';
import { CalendarsService } from 'src/app/_core/_service/calendars.service';
import { AuthService } from 'src/app/_core/_service/auth.service';
import { BPFCEstablishService } from 'src/app/_core/_service/bpfc-establish.service';
import { count } from 'console';
@Component({
  selector: 'app-bpfc-status',
  templateUrl: './bpfc-status.component.html',
  styleUrls: ['./bpfc-status.component.css']
})
export class BpfcStatusComponent implements OnInit, AfterViewInit {
  public pageSettings: PageSettingsModel;
  public editSettings: object;
  public toolbar: object;
  users: any[] = [];
  BPFCEstablishID: number;
  public editparams: object;
  public grid: GridComponent;
  modalReference: NgbModalRef;
  modalReferenceDetail: NgbModalRef;
  public data: object[];
  searchSettings: any = { hierarchyMode: 'Parent' };
  public name: string;
  pageSize: number;
  page: number;
  ingredients: any;
  glues: any;
  glueid: any;
  content: any;
  @ViewChild('gridModel')
  public gridModel: GridComponent;
  modalname: ModalName = {
    id: 0,
    name: '',
    modelNo: '',
    createdBy: JSON.parse(localStorage.getItem('user')).User.ID
  };
  comment: ICommentModelName;
  comments: [];
  setFocus: any;
  level: any;
  newglueID: any;
  constructor(
    private modalNameService: ModalNameService,
    private bPFCEstablishService: BPFCEstablishService,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private ingredientService: IngredientService,
    private glueService: GlueService,
    private commentService: CommentService,
    private calendarsService: CalendarsService,
    private buildingUserService: BuildingUserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.pageSettings = { currentPage: 1, pageSize: 10, pageCount: 20 };
    this.editparams = { params: { popupHeight: '300px' } };
    this.editSettings = { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['ExcelExport', 'Search', 'Default',
      { text: 'Approved', tooltipText: 'Approved', prefixIcon: 'fa fa-check', id: 'Approved' },
      { text: 'Not Approved', tooltipText: 'Not Approved', prefixIcon: 'fa fa-times', id: 'Not Approved' },
      'All'
    ];
    this.getAllUsers();
  }

  ngAfterViewInit() {
    this.getBuilding();
  }

  getBuilding() {
    const userID = JSON.parse(localStorage.getItem('user')).User.ID;
    this.authService.getBuildingByUserID(userID).subscribe((res: any) => {
      res = res || {};
      if (res !== {}) {
        this.level = res.level;
      }
    });
  }

  dataBound() {
  }

  no(item: any): number {
    return (this.pageSettings.currentPage - 1) * this.pageSettings.pageSize + Number(item.index) + 1;
  }

  actionBegin(args) {
    if (args.requestType === 'save') {
      this.modalname.id = args.data.id || 0;
      this.modalname.name = args.data.name;
      this.modalname.modelNo = args.data.modelNo;
      if (args.data.id > 0) {
        this.update(this.modalname);
      } else {
        this.add(this.modalname);
      }
    }
    if (args.requestType === 'delete') {
      this.delete(args.data[0].id);
    }
  }

  actionComplete(e: any): void {
    if (e.requestType === 'add') {
      (e.form.elements.namedItem('name') as HTMLInputElement).focus();
      (e.form.elements.namedItem('id') as HTMLInputElement).disabled = true;
      (e.form.elements.namedItem('tool') as HTMLInputElement).disabled = true;
    }
  }

  onDoubleClick(args: any): void {
    this.setFocus = args.column;  // Get the column from Double click event
  }

  openaddModalName(addModalName) {
    this.modalReference = this.modalService.open(addModalName);
  }

  getAllBPFCStatus() {
    this.bPFCEstablishService.getAllBPFCStatus().subscribe((res: any) => {
      this.data = res.map(item => {
        return  {
          id: item.id,
          modelNameID: item.modelNameID,
          modelNoID: item.modelNoID,
          articleNoID: item.articleNoID,
          artProcessID: item.artProcessID,
          modelName: item.modelName,
          modelNo: item.modelNo,
          articleNo: item.articleNo,
          artProcess: item.artProcess,
          approvalStatus: item.approvalStatus,
          finishedStatus: item.finishedStatus,
          approvalBy:  this.createdBy(item.approvalBy),
          createdBy:  this.createdBy(item.createdBy),
          season: item.season,
          createdDate: item.createdDate,
          modifiedDate: item.modifiedDate,
          updateTime: item.updateTime,
          bpfcName: `${item.modelName } - ${item.modelNo } - ${item.articleNo } - ${item.artProcess }`,
        };
      });
    });
  }

  filterByApprovedStatus() {
    this.bPFCEstablishService.filterByApprovedStatus().subscribe((res: any) => {
      this.data = res.map(item => {
        return  {
          id: item.id,
          modelNameID: item.modelNameID,
          modelNoID: item.modelNoID,
          articleNoID: item.articleNoID,
          artProcessID: item.artProcessID,
          modelName: item.modelName,
          modelNo: item.modelNo,
          articleNo: item.articleNo,
          artProcess: item.artProcess,
          approvalStatus: item.approvalStatus,
          finishedStatus: item.finishedStatus,
          approvalBy:  this.createdBy(item.approvalBy),
          createdBy:  this.createdBy(item.createdBy),
          season: item.season,
          createdDate: item.createdDate,
          modifiedDate: item.modifiedDate,
          updateTime: item.updateTime,
          bpfcName: `${item.modelName } - ${item.modelNo } - ${item.articleNo } - ${item.artProcess }`,
        };
      });
    });
  }

  filterByFinishedStatus() {
    this.bPFCEstablishService.filterByFinishedStatus().subscribe((res: any) => {
      this.data = res.map(item => {
        return  {
          id: item.id,
          modelNameID: item.modelNameID,
          modelNoID: item.modelNoID,
          articleNoID: item.articleNoID,
          artProcessID: item.artProcessID,
          modelName: item.modelName,
          modelNo: item.modelNo,
          articleNo: item.articleNo,
          artProcess: item.artProcess,
          approvalStatus: item.approvalStatus,
          finishedStatus: item.finishedStatus,
          approvalBy:  this.createdBy(item.approvalBy),
          createdBy:  this.createdBy(item.createdBy),
          season: item.season,
          createdDate: item.createdDate,
          modifiedDate: item.modifiedDate,
          updateTime: item.updateTime,
          bpfcName: `${item.modelName } - ${item.modelNo } - ${item.articleNo } - ${item.artProcess }`,
        };
      });
    });
  }

  filterByNotApprovedStatus() {
    this.bPFCEstablishService.filterByNotApprovedStatus().subscribe((res: any) => {
      this.data = res.map(item => {
        return  {
          id: item.id,
          modelNameID: item.modelNameID,
          modelNoID: item.modelNoID,
          articleNoID: item.articleNoID,
          artProcessID: item.artProcessID,
          modelName: item.modelName,
          modelNo: item.modelNo,
          articleNo: item.articleNo,
          artProcess: item.artProcess,
          approvalStatus: item.approvalStatus,
          finishedStatus: item.finishedStatus,
          approvalBy:  this.createdBy(item.approvalBy),
          createdBy:  this.createdBy(item.createdBy),
          season: item.season,
          createdDate: item.createdDate,
          modifiedDate: item.modifiedDate,
          updateTime: item.updateTime,
          bpfcName: `${item.modelName } - ${item.modelNo } - ${item.articleNo } - ${item.artProcess }`,
        };
      });
    });
  }

  update(modelname) {
    this.modalNameService.update(modelname).subscribe(() => {
      this.alertify.success('Update Modal Name Successfully');
    });
  }

  delete(id) {
    this.alertify.confirm('Delete Modal Name', 'Are you sure you want to delete this ModalName ID "' + id + '" ?', () => {
      this.modalNameService.delete(id).subscribe(() => {
        this.getAllBPFCStatus();
        this.alertify.success('Modal Name has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Modal Name');
      });
    });
  }

  add(modalname) {
    this.modalNameService.create(modalname).subscribe(() => {
      this.alertify.success('Add Modal Name Successfully');
      this.getAllBPFCStatus();
    });
  }

  approval(BPFCEstablishID) {
    const userid = JSON.parse(localStorage.getItem('user')).User.ID;
    this.bPFCEstablishService.approval(BPFCEstablishID, userid).subscribe(() => {
      this.alertify.success('The model name - model no has been approved!');
      this.getAllBPFCStatus();
    });
  }

  done(BPFCEstablishID) {
    const userid = JSON.parse(localStorage.getItem('user')).User.ID;
    this.bPFCEstablishService.done(BPFCEstablishID, userid).subscribe(() => {
      this.alertify.success('The model name - model no has been finished!');
      this.getAllBPFCStatus();
    });
  }

  release() {
    const userid = JSON.parse(localStorage.getItem('user')).User.ID;
    this.bPFCEstablishService.release(this.BPFCEstablishID, userid).subscribe(() => {
      this.alertify.success('The model name - model no has been released!');
      this.filterByApprovedStatus();
      this.modalReferenceDetail.close();
    });
  }

  reject() {
    const userid = JSON.parse(localStorage.getItem('user')).User.ID;
    this.bPFCEstablishService.reject(this.BPFCEstablishID, userid).subscribe((res: any) => {
      if (res.status === true) {
        this.alertify.success(res.message);
        this.filterByNotApprovedStatus();
        this.modalReferenceDetail.close();
        const email = this.users.filter(item => item.ID === res.userId)[0].Email || '';

        this.bPFCEstablishService.sendMailForPIC(email).subscribe(() => { });
      } else {
        this.alertify.error(res.message);
      }
    });
  }

  openModalDetail(detail, BPFCEstablishID) {
    this.modalReferenceDetail = this.modalService.open(detail, { size: 'xxl' });
    setTimeout(() => {
      this.getAllGluesByBPFCID(BPFCEstablishID);
    }, 300);
    this.BPFCEstablishID = BPFCEstablishID;
    this.getComments();
  }

  sortBySup(glueid) {
    this.ingredientService.sortBySup(glueid, 0).subscribe((res: any) => {
      this.ingredients = res.list1;
    });
  }

  getAllGluesByBPFCID(BPFCEstablishID) {
    this.glueService.getAllGluesByBPFCID(BPFCEstablishID).subscribe((res: any) => {
      this.glues = res.map(item => {
        return {
          chemical: item.chemical,
          code: item.code,
          consumption: item.consumption,
          createdBy: this.createdBy(item.createdBy),
          createdDate: item.createdDate,
          expiredTime: item.expiredTime,
          glueID: item.glueID,
          glueName: item.glueName,
          id: item.id,
          ingredients: item.ingredients,
          materialName: item.materialName,
          materialNameID: item.materialNameID,
          modelNameID: item.modelNameID,
          modelNo: item.modelNo,
          modelNoID: item.modelNoID,
          name: item.name,
          partNameID: item.partNameID,
          pathName: item.pathName,
          bpfcName: `${item.modelName } - ${item.modelNo } - ${item.articleNo } - ${item.artProcess }`,
        };
      });
      if (this.glues.length === 0) {
        this.glueid = 0;
      } else {
        this.glueid = this.glues[0].id;
        this.sortBySup(this.glueid);
      }
    });
  }

  rowSelected(args: any) {
    const newGlueID = args.data.id;
    this.sortBySup(newGlueID);
  }

  toolbarClick(args: any): void {
    switch (args.item.text) {
      case 'Approved':
        this.filterByApprovedStatus();
        break;
      case 'Not Approved':
        this.filterByNotApprovedStatus();
        break;
      case 'All':
        this.getAllBPFCStatus();
        break;
      case 'Excel Export':
        this.gridModel.excelExport();
        break;
      case 'Default':
        this.filterByFinishedStatus();
        break;
    }
  }

  getAllUsers() {
    this.buildingUserService.getAllUsers(1, 1000).subscribe((res: any) => {
      this.users = res.result;
      this.filterByFinishedStatus();
    });
  }

  /// comment
  createComment() {
    this.comment = {
      id: 0,
      content: this.content,
      createdBy: JSON.parse(localStorage.getItem('user')).User.ID,
      createdByName: '',
      BPFCEstablishID: this.BPFCEstablishID,
      createdDate: new Date()
    };
    this.commentService.create(this.comment).subscribe(() => {
      this.alertify.success('The comment has been created!');
      this.content = '';
      this.getComments();
    });
  }

  updateComment() {
    this.commentService.update(this.comment).subscribe(() => {
      this.alertify.success('The comment has been updated!');
      this.getComments();
    });
  }

  deleteComment() {
    this.commentService.delete(this.comment.id).subscribe(() => {
      this.alertify.success('The comment has been deleted!');
      this.getComments();
    });
  }

  getComments() {
    this.commentService.getAllCommentByBPFCEstablishID(this.BPFCEstablishID).subscribe((res: any) => {
      this.comments = res;
    });
  }

  datetime(d) {
    return this.calendarsService.JSONDateWithTime(d);
  }

  username(id) {
    return (this.users.filter((item: any) => item.ID === id)[0] as any).Username;
  }

  createdBy(id) {
    if (id === 0) {
      return '#N/A';
    }
    const result = (this.users.filter((item: any) => item.ID === id)[0] as any);
    if (result !== undefined) {
      return result.Username;
    } else {
      return '#N/A';
    }
  }

}
