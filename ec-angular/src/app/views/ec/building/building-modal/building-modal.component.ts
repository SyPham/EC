import { Component, OnInit, Input } from '@angular/core';
import { BuildingService } from 'src/app/_core/_service/building.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';

@Component({
  selector: 'app-building-modal',
  templateUrl: './building-modal.component.html',
  styleUrls: ['./building-modal.component.css']
})
export class BuildingModalComponent implements OnInit {
  @Input() title: string;
  @Input() building: { id: number, name: string, level: number, parentID: number };
  constructor(
    public activeModal: NgbActiveModal,
    private buildingService: BuildingService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
  }
  validation() {
    if (this.building.name === '') {
      this.alertify.warning('Please enter building name!', true);
      return false;
    } else {
      return true;
    }
  }
  createBuilding() {
    if (this.validation()) {
      if (this.building.parentID > 0) {
        this.buildingService.createSubBuilding(this.building).subscribe(res => {
          this.alertify.success('The building has been created!!');
          this.activeModal.dismiss();
          this.buildingService.changeMessage(200);
        });
      } else {
        this.buildingService.createMainBuilding(this.building).subscribe(res => {
          this.buildingService.changeMessage(200);
          this.alertify.success('The building has been created!!');
          this.activeModal.dismiss();
        });
      }
    }
  }
}
