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
@Component({
  selector: 'app-modal-name',
  templateUrl: './modal-name.component.html',
  styleUrls: ['./modal-name.component.css'],
  providers: [ToolbarService, EditService, PageService]
})
export class ModalNameComponent implements OnInit, AfterViewInit {
  public pageSettings: PageSettingsModel;
  public editSettings: object;
  public toolbar: object;
  users: any[] = [];
  modelNameid: number;
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
  constructor(
    private modalNameService: ModalNameService,
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
    this.pageSettings = { currentPage: 1, pageSize: 20 };
    this.editparams = { params: { popupHeight: '300px' } };
    this.editSettings = { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Delete', 'Search', 'Edit', 'Update', 'Cancel', 'Default',
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
  getAllModelName() {
    this.modalNameService.getAllModelNameForAdmin().subscribe((res: any) => {
      this.data = res.map(item => {
        return {
          approvedStatus: item.approvedStatus,
          artNo: item.artNo,
          artNoID: item.artNoID,
          articleNoDtos: item.articleNoDtos,
          createdBy: this.createdBy(item.createdBy),
          approvedBy: this.createdBy(item.approvedBy),
          createdDate: item.createdDate,
          createdStatus: item.createdStatus,
          id: item.id,
          modelNo: item.modelNo,
          name: item.name
        };
      });
    });
  }
  filterByApprovedStatus() {
    this.modalNameService.filterByApprovedStatus().subscribe((res: any) => {
      this.data = res.map(item => {
        return {
          approvedStatus: item.approvedStatus,
          artNo: item.artNo,
          artNoID: item.artNoID,
          articleNoDtos: item.articleNoDtos,
          createdBy: this.createdBy(item.createdBy),
          approvedBy: this.createdBy(item.approvedBy),
          createdDate: item.createdDate,
          createdStatus: item.createdStatus,
          id: item.id,
          modelNo: item.modelNo,
          name: item.name
        };
      });
    });
  }
  filterByFinishedStatus() {
    this.modalNameService.filterByFinishedStatus().subscribe((res: any) => {
      this.data = res.map(item => {
        return {
          approvedStatus: item.approvedStatus,
          artNo: item.artNo,
          artNoID: item.artNoID,
          articleNoDtos: item.articleNoDtos,
          createdBy: this.createdBy(item.createdBy),
          approvedBy: this.createdBy(item.approvedBy),
          createdDate: item.createdDate,
          createdStatus: item.createdStatus,
          id: item.id,
          modelNo: item.modelNo,
          name: item.name
        };
      });
    });
  }
  filterByNotApprovedStatus() {
    this.modalNameService.filterByNotApprovedStatus().subscribe((res: any) => {
      this.data = res.map(item => {
        return {
          approvedStatus: item.approvedStatus,
          artNo: item.artNo,
          artNoID: item.artNoID,
          articleNoDtos: item.articleNoDtos,
          createdBy: this.createdBy(item.createdBy),
          approvedBy: this.createdBy(item.approvedBy),
          createdDate: item.createdDate,
          createdStatus: item.createdStatus,
          id: item.id,
          modelNo: item.modelNo,
          name: item.name
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
        this.getAllModelName();
        this.alertify.success('Modal Name has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Modal Name');
      });
    });
  }
  add(modalname) {
    this.modalNameService.create(modalname).subscribe(() => {
      this.alertify.success('Add Modal Name Successfully');
      this.getAllModelName();
    });
  }
  approval(modelNameid) {
    const userid = JSON.parse(localStorage.getItem('user')).User.ID;
    this.modalNameService.approval(modelNameid, userid).subscribe(() => {
      this.alertify.success('The model name - model no has been approved!');
      this.getAllModelName();
    });
  }
  done(modelNameid) {
    const userid = JSON.parse(localStorage.getItem('user')).User.ID;
    this.modalNameService.done(modelNameid, userid).subscribe(() => {
      this.alertify.success('The model name - model no has been finished!');
      this.getAllModelName();
    });
  }
  release() {
    const userid = JSON.parse(localStorage.getItem('user')).User.ID;
    this.modalNameService.release(this.modelNameid, userid).subscribe(() => {
      this.alertify.success('The model name - model no has been released!');
      this.filterByApprovedStatus();
      this.modalReferenceDetail.close();
    });
  }
  reject() {
    const userid = JSON.parse(localStorage.getItem('user')).User.ID;
    this.modalNameService.reject(this.modelNameid, userid).subscribe((res: any) => {
      if (res.status === true) {
        this.alertify.success(res.message);
        this.filterByNotApprovedStatus();
        this.modalReferenceDetail.close();
        const email = this.users.filter(item => item.ID === res.userId)[0].Email || '';

        this.modalNameService.sendMailForPIC(email).subscribe(() => { });
      } else {
        this.alertify.error(res.message);
      }
    });
  }
  openModalDetail(detail, modelName) {
    this.modalReferenceDetail = this.modalService.open(detail, { size: 'xxl' });
    this.getGlueByModelName(modelName);
    this.modelNameid = modelName;
    this.ingredients = [];
    this.getComments();
  }
  sortBySup(glueid) {
    this.ingredientService.sortBySup(glueid, 0).subscribe((res: any) => {
      this.ingredients = res.list1;
    });
  }
  getGlueByModelName(modelName) {
    this.glueService.getGlueByModelName(modelName).subscribe((res: any) => {
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
          pathName: item.pathName
        }
      });
    });
  }
  rowSelected(args: any) {
    const item = args.data[0] || args.data;
    this.sortBySup(item.id);
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
        this.getAllModelName();
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
      BPFCEstablishID: this.modelNameid,
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
    this.commentService.getAllCommentByBPFCEstablishID(this.modelNameid).subscribe((res: any) => {
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
    let result = (this.users.filter((item: any) => item.ID === id)[0] as any);
    if (result !== undefined) {
      return result.Username;
    } else {
      return '#N/A';
    }
  }
}

