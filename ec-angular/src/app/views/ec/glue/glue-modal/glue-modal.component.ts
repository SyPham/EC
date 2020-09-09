import { IMaterialName } from './../../../../_core/_model/material-name';
import { IPartname } from './../../../../_core/_model/partname';
import { ModalNameService } from './../../../../_core/_service/modal-name.service';
import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpErrorResponse } from '@angular/common/http';
import { IGlue } from 'src/app/_core/_model/glue';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { GlueService } from 'src/app/_core/_service/glue.service';
@Component({
  selector: 'app-glue-modal',
  templateUrl: './glue-modal.component.html',
  styleUrls: ['./glue-modal.component.scss']
})
export class GlueModalComponent implements OnInit {
  @Input() title: '';
  @Input() glue: IGlue = {
    id: 0,
    name: '',
    code: this.makeid(8),
    gluename: '',
    createdDate: '',
    kindID: null,
    partID: null,
    materialID: null,
    consumption: '',
    expiredTime: 0,
    createdBy: JSON.parse(localStorage.getItem('user')).User.ID,
    BPFCEstablishID: 0,
  };
  showBarCode: boolean;
  public MaterialName: object []
  public partName: object []
  public fieldsGlue: object = { text: 'name', value: 'id' };
  public textGlue: string = 'Select';
  constructor(
    public activeModal: NgbActiveModal,
    private alertify: AlertifyService,
    private glueService: GlueService,
    private modalNameService: ModalNameService
  ) { }

  ngOnInit() {
    if (this.glue.id === 0) {
      this.showBarCode = false;
      this.genaratorGlueCode();
    } else {
      this.showBarCode = true;
    }
    this.getAllMaterialName();
    this.getAllPartName();
    this.glueService.currentGlue.subscribe((res: any) => {
    });
  }

  onChangepartName(args) {
    this.glue.partID = args.value ;
  }
  onChangeMaterialName(args) {
    this.glue.materialID = args.value ;
    this.showBarCode = true;
  }
  getAllPartName() {
    this.glueService.getAllPartName().subscribe((res => {
      this.partName = res ;
    }));
  }
  getAllMaterialName(){
    this.glueService.getAllMaterialName().subscribe((res =>{
      this.MaterialName = res;
    }))
  }
  getAllModelName() {
    this.modalNameService.getAllModalName().subscribe((res => {
    }));
  }

  create() {
    this.glueService.create1(this.glue).subscribe( () => {
        this.alertify.success('Created successed!');
        this.activeModal.dismiss();
        this.glue.gluename = '';
        this.showBarCode = false;
    },
    (error) => {
      this.alertify.error(error);
      this.genaratorGlueCode();
    });
  }

  update() {
    this.glueService.create(this.glue).subscribe( res => {
      if (res) {
        this.alertify.success('Updated successed!');
      }
    });
  }

  save() {
    if (this.glue.id === 0) {
      if (this.glue.code === '') {
        this.genaratorGlueCode();
      }
      this.create();
    } else {
      this.update();
    }
  }

  onBlur($event) {
    this.showBarCode = true;
  }

  genaratorGlueCode() {
    this.glue.code = this.makeid(8);
  }

  makeid(length) {
    let result           = '';
    let characters       = '0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
   // return '59129032';
  }

}
