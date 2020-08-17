import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { UserService } from 'src/app/_core/_service/user.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderService } from 'src/app/_core/_service/header.service';

@Component({
  selector: 'app-avatar-modal',
  templateUrl: './avatar-modal.component.html',
  styleUrls: ['./avatar-modal.component.css']
})
export class AvatarModalComponent implements OnInit {
  @Input() name: string;
  imageChangedEvent: any;
  croppedImage: any;
  show: boolean;
  @ViewChild('defaultupload')
  public uploadObj: UploaderComponent;
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private userService: UserService,
    private headerService: HeaderService,
    private alertify: AlertifyService,
    private sanitizer: DomSanitizer,

  ) { }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.show = !this.show;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // console.log('imageCropped: ', this.croppedImage)
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  back() {
    this.show = !this.show;
    this.imageChangedEvent = '';
    this.croppedImage = '';
    this.uploadObj.clearAll();
  }
  save() {
    const user = {
      userid: JSON.parse(localStorage.getItem('user')).User.ID,
      imagebase64: this.croppedImage.replace('data:image/png;base64,', '')
    };
    this.userService.changeAvatar(user).subscribe( res => {
      console.log('changeAvatar: ', res);
      if (res){
        this.alertify.success('The avatar has been uploaded!!');
        this.headerService.changeImage(this.croppedImage);
        this.modalService.dismissAll();
      } else {
        this.alertify.warning('Failed to upload the avatar');
      }
    });
  }
  openPreviewModal() {
    const modalRef = this.modalService.open(AvatarModalComponent, { size: 'lg'});
    modalRef.componentInstance.title = 'Add Routine Main Task';
    // modalRef.componentInstance.user = 1;
    modalRef.result.then((result) => {
      console.log('openPreviewModal', result);
    }, (reason) => {
    });
  }
}
