import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.css']
})
export class PreviewModalComponent implements OnInit {
  @Input() croppedImage: any;
  constructor() { }

  ngOnInit() {
  }

}
