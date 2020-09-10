import { Component, OnInit } from '@angular/core';
import { MakeGlueService } from 'src/app/_core/_service/make-glue.service';

@Component({
  selector: 'app-delivered-history',
  templateUrl: './delivered-history.component.html',
  styleUrls: ['./delivered-history.component.css']
})
export class DeliveredHistoryComponent implements OnInit {
  data: any;
  constructor(
    private makeGlueService: MakeGlueService,
  ) { }

  ngOnInit(): void {
    this.deliveredHistory();
  }
  deliveredHistory() {
    this.makeGlueService.deliveredHistory()
      .subscribe(res => {
       this.data = res;
      });
  }
}
