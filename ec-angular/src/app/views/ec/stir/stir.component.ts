import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { DatePipe } from '@angular/common';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { DataService } from 'src/app/_core/_service/data.service';
import { SettingService } from 'src/app/_core/_service/setting.service';
declare const $: any;
@Component({
  selector: 'app-stir',
  templateUrl: './stir.component.html',
  styleUrls: ['./stir.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    DatePipe
  ]
})
export class StirComponent implements OnInit {
  public value: any =  '';
  public dateValue: any =  '';
  public Envalue: any =  '';
  public interval: number = 1;
  public customFormat: string = 'HH:mm:ss a';
  ingredientID: number;
  qrcodeChange: any;
  data: [];
  isShow: boolean = false;
  showBatch: boolean = false;
  IngredientData: [] ;
  public ingredients: any = [];
  glueID: number;
  settingID: number ;
  settingData: object = [];
  constructor(
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    public ingredientService: IngredientService,
    public settingService: SettingService,
    private dataService: DataService
  ) { }
  public ngOnInit(): void {
    this.getIngredient();
    this.getAllSetting();
    this.ingredientService.currentIngredient.subscribe((res: any) => {
      this.glueID = res.GlueID ;
    });
  }
  // tslint:disable-next-line: use-lifecycle-interface
  public ngAfterViewInit(): void {

  }

  onChange(args) {
    this.isShow = false ;
    this.settingID = args.value ;
    const dateCreate = this.datePipe.transform(args.value, 'yyyy-MM-dd HH:mm:ss');
    this.value = new Date();
    this.dateValue = new Date();
    const endValue = new Date (this.value);
    if (this.settingID === 1) {
      endValue.setMinutes (this.value.getMinutes() + 4);
    } else {
      endValue.setMinutes (this.value.getMinutes() + 6);
    }
    this.Envalue = endValue ;
  }

  saveStir() {
    const model = {
      glueID: this.glueID,
      settingID: this.settingID,
      mixingInfoID: 0,
      startTime: this.datePipe.transform(this.value, 'yyyy-MM-dd HH:mm:ss'),
      endTime: this.datePipe.transform(this.Envalue, 'yyyy-MM-dd HH:mm:ss')
    };
    this.settingService.AddStir(model).subscribe((res) => {
      this.alertify.success('Success');
    });
  }

  getIngredient() {
    this.ingredientService.getAllIngredient().subscribe((res: any) => {
      this.IngredientData = res ;
    });
  }

  openPopupDropdownlist() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  public onFilteringIngredientName: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    // frame the query based on search string with filter type.
    query =
      e.text !== '' ? query.where('name', 'contains', e.text, true) : query;
    // pass the filter data source, filter query to updateData method.
    e.updateData(this.IngredientData, query);
  }

  onChangeIngredientName(args) {
    this.isShow = false ;
    this.showBatch = true;
  }

  searchStir() {
    this.isShow = true ;
  }

  getAllSetting() {
    this.settingService.getAllSetting().subscribe((res) => {
      this.settingData = res ;
    });
  }

}
