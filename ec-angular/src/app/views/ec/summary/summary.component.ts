import { DataService } from './../../../_core/_service/data.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener, ViewChildren, QueryList, ɵConsole } from '@angular/core';
import { ColumnModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { PlanService } from 'src/app/_core/_service/plan.service';
import * as signalr from '../../../../assets/js/ec-client.js';
import { AuthService } from 'src/app/_core/_service/auth.service';
import { IIngredient } from 'src/app/_core/_model/Ingredient';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MakeGlueService } from 'src/app/_core/_service/make-glue.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

import { DisplayTextModel } from '@syncfusion/ej2-angular-barcode-generator';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { AbnormalService } from 'src/app/_core/_service/abnormal.service.js';
import { TooltipComponent, Position } from '@syncfusion/ej2-angular-popups';

declare var $: any;
declare var Swal: any;
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, AfterViewInit {
  @ViewChild('fullScreen') divRef;
  @ViewChildren('tooltip') tooltip: QueryList<any>;
  @ViewChild('tooltip') public control: TooltipComponent;
  @ViewChild('scanQRCode') scanQRCodeElement: ElementRef;
  @ViewChild('deliveredGrid') deliveredGrid: GridComponent;
  public filterSettings: object;
  public displayTextMethod: DisplayTextModel = {
    visibility: false
  };
  @ViewChild('scanText', { static: false }) scanText: ElementRef;
  // make glue
  public ingredients: any;
  public show: boolean;
  public makeGlue = {
    id: 0,
    name: '',
    code: '',
    ingredients: []
  };
  public weight: any;
  public glue: any;
  public glueID: number;
  public glueName: number;
  public quantity: string;
  public level = JSON.parse(localStorage.getItem('level'));
  public A: any;
  public B: any;
  public C: any;
  public D: any;
  public E: any;
  public existGlue: any = false;
  public deliveredData: any;
  @ViewChild('ddlelement') public dropDownListObject1: DropDownListComponent;
  public guidances: any;
  public guidance: any;
  // end make glue
  public data: object[] = [];
  public lineColumns: ColumnModel[];
  linevalue: any;
  public buildingID: any;
  connection: any;
  @ViewChild('grid')
  grid: GridComponent;
  screenHeight: number;
  showQRCode: boolean;
  qrCode: any;
  scanStatus: boolean;
  dateTimeNow: Date;
  code: any;
  disabled = true;
  hasWarning: boolean;
  cancel = false;
  hasFullScreen = false;
  modalReference: NgbModalRef;
  public editSettings: object;
  toolbarOptions: string[];
  @HostListener('window:keyup.alt.enter', ['$event']) enter(e: KeyboardEvent) {
    if (!this.disabled) {
      this.Finish();
    }
  }
  @HostListener('window:keyup.esc', ['$event']) keyup(e: KeyboardEvent) {
    this.summary();
  }
  @HostListener('document:fullscreenchange', ['$event']) fullScreen(e) {

    if (document.fullscreenElement !== null) {
      this.screenHeight = screen.height - 100;
      this.hasFullScreen = true;
    } else {
      this.screenHeight = window.innerHeight - 200;
      this.hasFullScreen = false;
    }
  }

  constructor(
    private planService: PlanService,
    private authService: AuthService,
    public modalService: NgbModal,
    public ingredientService: IngredientService,
    private makeGlueService: MakeGlueService,
    private abnormalService: AbnormalService,
    private alertify: AlertifyService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }
  public ngOnInit(): void {
    this.toolbarOptions = ['Edit', 'Delete', 'Search', 'ExcelExport'];
    this.editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.filterSettings = { type: 'Excel' };
    this.showQRCode = false;
    this.disabled = true;
    this.qrCode = '';
    this.getBuilding();
    this.existGlue = true;
    this.hasWarning = false;
    this.connection = signalr.CONNECTION_HUB;
    if (signalr.CONNECTION_HUB.state === 'Connected') {
      signalr.CONNECTION_HUB.on('summaryRecieve', (status) => {
        if (status === 'ok') { this.summary(); }
      });
    }
  }
  public ngAfterViewInit(): void {
    console.log(screen.height);
    console.log(window.innerHeight);
    this.screenHeight = window.innerHeight - 200;
    $('input.mixing').tooltip({
      placement: 'right',
      trigger: 'focus'
    });
  }
  actionBegin(args) {
    if (args.requestType === 'delete') {
      const id = args.data.id;
      this.planService.deleteDelivered(id).subscribe(res => {
        if (res) {
          this.modalReference.close();
          this.summary();
        }
      });
    }
    if (args.requestType === 'save') {
       if (args.action === 'edit') {
         const id = args.data.id;
         const qty = args.data.qty;
         this.planService.editDelivered(id, qty).subscribe( res => {
           if (res) {
             this.modalReference.close();
             this.summary();
           }
         });
       }
    }
  }
  showModal(name, value) {
    this.modalReference = this.modalService.open(name, { size: 'lg' });
    this.deliveredData = value.deliveredInfos.map( (item: any) => {
      return {
        id: item.id,
        glueName: item.glueName,
        qty: item.qty,
        createdDate: new Date(item.createdDate)
      };
    });
  }
  openFullscreen() {
    // Use this.divRef.nativeElement here to request fullscreen
    this.screenHeight = screen.height - 100;
    this.hasFullScreen = true;
    const elem = this.divRef.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
  closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (window.top.document as any).msExitFullscreen();
    }
    this.hasFullScreen = false;
    this.screenHeight = window.innerHeight - 200;
  }
  created(args) {
  }
  dataBound() {
  }
  labelLang(text) {
    if (text === 'Chemical') {
      return 'GLUE';
    }
    if (text === 'GlueID') {
      return 'ID';
    }
    if (text === 'Supplier') {
      return 'SUPPLIER';
    }
    if (text === 'TotalConsumption') {
      return 'TOTAL_COMSUMPTION';
    }
    return text;
  }
  stirGlue(values) {
    // this.dataService.changeMessage(2);
    this.ingredientService.changeIngredient(values);
    return this.router.navigate(['/ec/execution/stir']);
  }
  summary() {
    const E_BUILDING = 8;
    const ROLES = [1, 2, 3];
    const level = JSON.parse(localStorage.getItem('level')).level;
    if (ROLES.includes(level)) {
      this.buildingID = E_BUILDING;
    }
    this.spinner.show();
    this.planService.summary(this.buildingID).subscribe((res: any) => {
      this.lineColumns = res.header;
      this.data = res.data;
      this.linevalue = res.data;
      if (this.linevalue.length === 0) {
        this.hasWarning = true;
      }
      this.spinner.hide();
    });
  }
  hasLineValue(value) {
    const labels = ['Chemical', 'GlueID', 'Real', 'Standard ', 'Supplier', 'Count'];
    for (const key in value) {
      if (labels.includes(key)) {
        return true;
      }
    }
  }
  hasRowspan(index) {
    const labels = ['Chemical', 'Real', 'GlueID', 'Standard', 'Supplier', 'Count', 'TotalConsumption', 'Delivered'];
    return labels.includes(this.lineColumns[index + 1].field);
  }
  hasValue(col, cell) {
    if (col.field === Object.keys(cell).toString()) {
      return true;
    }
    return false;
  }
  hasObject(value) {
    if (value instanceof Object) {
      return true;
    }
    return false;
  }

  hasArray(value) {
    if (value instanceof Array) {
      return true;
    }
    return false;
  }
  // api
  hasLock(ingredient, building, batch): Promise<any> {
    const levels = [1, 2, 3, 4];
    let buildingName = building;
    if (levels.includes(this.level.level)) {
      buildingName = 'E';
    }
    return new Promise((resolve, reject) => {
      this.abnormalService.hasLock(ingredient, buildingName, batch).subscribe((res) => {
        resolve(res);
      }, err => {
        reject(false);
      });
    });
  }
  //
  getValueCell(cellObject) {
    return Object.values(cellObject);
  }
  cells(values) {
    delete values.rowCountInfo;
    delete values.rowRealInfo;
    return values;
  }

  getCellValue(values): any {
    const res = Object.values(values).filter(item => {
      return !this.hasArray(item);
    });
    // console.log('getCellValue', res.slice(1, res.length));

    return res.slice(1, res.length);
  }

  getBuilding() {
    const userID = JSON.parse(localStorage.getItem('user')).User.ID;
    this.authService.getBuildingByUserID(userID).subscribe((res: any) => {
      res = res || {};
      if (res !== {}) {
        this.buildingID = res.id;
        this.summary();
      }
    });
  }
  // make glue
  findIngredientRealByPosition(position) {
    let real = '';
    for (const item of this.ingredients) {
      if (item.position === position) {
        real = item.real;
        break;
      }
    }
    return real;
  }
  findIngredientBatchByPosition(position) {
    let batch = '';
    for (const item of this.ingredients) {
      if (item.position === position) {
        batch = item.batch;
        break;
      }
    }
    return batch;
  }
  Finish() {
    const date = new Date();
    const levels = [1, 2, 3, 4];
    const building = JSON.parse(localStorage.getItem('level'));
    let buildingID = building.id;
    if (levels.includes(building.level)) {
      buildingID = 8;
    }
    this.guidances = {
      id: 0,
      glueID: this.glueID,
      glueName: this.makeGlue.name,
      chemicalA: this.findIngredientRealByPosition('A'),
      chemicalB: this.findIngredientRealByPosition('B'),
      chemicalC: this.findIngredientRealByPosition('C'),
      chemicalD: this.findIngredientRealByPosition('D'),
      chemicalE: this.findIngredientRealByPosition('E'),
      batchA: this.findIngredientBatchByPosition('A'),
      batchB: this.findIngredientBatchByPosition('B'),
      batchC: this.findIngredientBatchByPosition('C'),
      batchD: this.findIngredientBatchByPosition('D'),
      batchE: this.findIngredientBatchByPosition('E'),
      createdTime: date,
      mixBy: JSON.parse(localStorage.getItem('user')).User.ID,
      buildingID,
    };
    if (this.guidances) {
      this.makeGlueService.Guidance(this.guidances).subscribe((glue: any) => {
        this.alertify.success('The Glue has been finished successfully');
        this.showQRCode = true;
        this.show = false;
        this.expiredTime = glue.expiredTime;
        this.code = glue.code;
        this.summary();
      });
    }
  }
  getGlueWithIngredientByGlueName(glueName: number) {
    this.makeGlueService.getGlueWithIngredientByGlueName(glueName).subscribe((res: any) => {
      this.show = true;
      this.existGlue = false;
      this.makeGlue = res;
      this.ingredients = res.ingredients as IIngredient[];
    });
  }
  getGlueWithIngredientByGlueID(glueID: number) {
    this.makeGlueService.getGlueWithIngredientByGlueID(glueID).subscribe((res: any) => {
      this.show = true;
      this.existGlue = false;
      this.makeGlue = res;
      this.ingredients = res.ingredients.map(item => {
        return {
          id: item.id,
          scanStatus: item.position === 'A',
          code: item.code,
          scanCode: '',
          name: item.name,
          percentage: item.percentage,
          position: item.position,
          allow: item.allow,
          expected: 0,
          real: 0,
          focusReal: false,
          focusExpected: false,
          valid: false,
          info: '',
          batch: ''
        };
      });

    });
  }
  scanQRCode(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ingredientService.scanQRCode(this.qrCode).subscribe((res: any) => {
        if (res == null) {
          reject(null);
        } else {
          resolve(res);
        }
      });
    });
  }
  setBatch(item, batch) {
    for (const i in this.ingredients) {
      if (this.ingredients[i].id === item.id) {
        this.ingredients[i].batch = batch;
        break; // Stop this loop, we found it!
      }
    }
  }
  async onNgModelChangeScanQRCode2(args, item) {
    const input = args;
    if (input.length === 8) {
      try {
        this.qrCode = input;
        const result = await this.scanQRCode();
        if (this.qrCode !== item.code) {
          this.alertify.warning(`Please you should look for the chemical name "${item.name}"`);
          this.qrCode = '';
          this.errorScan();
          return;
        }
        // const checkLock = await this.hasLock(item.name, this.level.name, input[1]);
        // if (checkLock === true) {
        //   this.alertify.error('This chemical has been locked!');
        //   this.qrCode = '';
        //   this.errorScan();
        //   return;
        // }
        const code = result.code;
        const ingredient = this.findIngredientCode(code);
        const batch = 'DEFAULT';
        this.setBatch(ingredient, batch);
        if (ingredient) {
          this.changeInfo('success-scan', ingredient.code);
          if (ingredient.expected === 0 && ingredient.position === 'A') {
            this.changeFocusStatus(ingredient.code, false, true);
            this.changeScanStatus(ingredient.code, false);
          } else {
            this.changeScanStatus(ingredient.code, false);
            this.changeFocusStatus(code, true, false);
          }
        }
      } catch (error) {
        this.errorScan();
        this.alertify.error('Wrong Chemical!');
        this.qrCode = '';
      }
    }
  }
  async onNgModelChangeScanQRCode(args, item) {
    const input = args.split('-') || [];
    const inputdemo = '20200914' + '-' + 'DEFAULT' + '-' + args ;
    const input2 = inputdemo.split('-') || [];
    // if(inputdemo)
    if (input[2]?.length === 8) {
      try {
        this.qrCode = input[2];
        // this.qrCode = input2[2];
        const result = await this.scanQRCode();
        if (this.qrCode !== item.code) {
          this.alertify.warning(`Please you should look for the chemical name "${item.name}"`);
          this.qrCode = '';
          this.errorScan();
          return;
        }
        const checkLock = await this.hasLock(item.name, this.level.name, input[1]);
        // const checkLock = await this.hasLock(item.name, this.level.name, input2[1]);
        if (checkLock === true) {
          this.alertify.error('This chemical has been locked!');
          this.qrCode = '';
          this.errorScan();
          return;
        }
        const code = result.code;
        const ingredient = this.findIngredientCode(code);
        this.setBatch(ingredient, input[1]);
        // this.setBatch(ingredient, input2[1]);
        if (ingredient) {
          this.changeInfo('success-scan', ingredient.code);
          if (ingredient.expected === 0 && ingredient.position === 'A') {
            this.changeFocusStatus(ingredient.code, false, true);
            this.changeScanStatus(ingredient.code, false);
          } else {
            this.changeScanStatus(ingredient.code, false);
            this.changeFocusStatus(code, true, false);
          }
        }
      } catch (error) {
        this.errorScan();
        this.alertify.error('Wrong Chemical!');
        this.qrCode = '';
      }
    }
  }
  private errorScan() {
    for (const key in this.ingredients) {
      if (this.ingredients[key].scanStatus) {
        const element = this.ingredients[key];
        this.changeInfo('error-scan', element.code);
      }
    }
  }

  showArrow(item): boolean {
    if (item.scanStatus === false && item.focusExpected === false && item.focusReal === false) {
      return false;
    }
    return true;
  }

  mixingSection(data) {
    this.glueName = data.Chemical;
    this.glueID = data.GlueID;
    this.glue = data;
    this.scanStatus = true;
    this.getGlueWithIngredientByGlueID(this.glueID);
  }

  calculatorIngredient(weight, percentage) {
    const result = (weight * percentage) / 100;
    return result * 1000 ?? 0;
  }

  onKeyupExpected(item, args) {
    if (args.keyCode === 13) {
      if (item.position === 'A') {
        const weight = parseFloat(args.target.value);
        this.changeExpected('A', args.target.value);
        const expectedB = this.calculatorIngredient(weight, this.findIngredient('B')?.percentage);
        this.changeExpected('B', this.toFixedIfNecessary(expectedB, 3));
        const expectedC = this.calculatorIngredient(weight + expectedB, this.findIngredient('C')?.percentage);
        this.changeExpected('C', this.toFixedIfNecessary(expectedC, 3));
        const expectedD = this.calculatorIngredient(weight + expectedB + expectedC, this.findIngredient('D')?.percentage);
        this.changeExpected('D', this.toFixedIfNecessary(expectedD, 3));
        const expectedE = this.calculatorIngredient(weight + expectedB + expectedC + expectedD, this.findIngredient('E')?.percentage);
        this.changeExpected('E', this.toFixedIfNecessary(expectedE, 3));
        this.changeFocusStatus(item.code, true, false);
      }
    }
  }

  resetIngredientFocus() {
    this.ingredients = this.ingredients.map(item => {
      return {
        id: item.id,
        scanStatus: true,
        code: item.code,
        name: item.name,
        percentage: item.percentage,
        position: item.position,
        allow: item.allow,
        expected: 0,
        real: 0,
        focusReal: false,
        focusExpected: false,
        batch: ''
      };
    });
  }

  changeExpectedRange(args, position) {
    const positionArray = ['A', 'B', 'C', 'D', 'E'];
    if (positionArray.includes(position)) {
      const weight = parseFloat(args.target.value);
      const expected = this.calculatorIngredient(weight, this.findIngredient(position)?.percentage);
      if (position === 'B') {
        this.B = expected;
      }
      if (position === 'C') {
        this.C = expected;
      }
      if (position === 'D') {
        this.D = expected;
      }
      const allow = this.calculatorIngredient(expected / 1000, this.findIngredient(position)?.allow);
      const min = expected - allow;
      const max = expected + allow;
      const minRange = this.toFixedIfNecessary(min / 1000, 3);
      const maxRange = this.toFixedIfNecessary(max / 1000, 3);
      const expectedRange = `${minRange}kg - ${maxRange}kg ( ${this.toFixedIfNecessary(min, 3)}g - ${this.toFixedIfNecessary(max, 3)}g )`;
      if (allow === 0) {
        const kgValue = this.toFixedIfNecessary(expected / 1000, 3);
        this.changeExpected(position, `${kgValue}kg (${expected}g)`);
      } else {
        this.changeExpected(position, expectedRange);
      }
    }
  }

  checkValidPosition(ingredient, args) {
    let min;
    let max;
    const currentValue = parseFloat(args.target.value);
    if (ingredient.allow === 0) {
      min = parseFloat(ingredient.expected),
        max = parseFloat(ingredient.expected);
    } else {
      const exp = ingredient.expected.split(' ( ')[0];
      min = parseFloat(exp.split(' - ')[0].replace('kg', '')),
        max = parseFloat(exp.split(' - ')[1].replace('kg', ''));
    }
    // if Chemical is A, focus in chemical B
    if (ingredient.position === 'A') {
      const positionArray = ['B', 'C', 'D', 'E'];
      for (const position of positionArray) {
        this.changeExpectedRange(args, position);
      }
      this.changeScanStatusFocus('A', false);
      this.changeScanStatusFocus('B', true);
      this.changeFocusStatus(ingredient.code, false, false);
      if (this.ingredients.length === 1) {
        this.disabled = false;
      }
    }

    // if Chemical is B, focus in chemical C
    if (ingredient.position === 'B') {
      if (currentValue <= max && currentValue >= min) {
        this.changeScanStatusFocus('B', false);
        this.changeScanStatusFocus('C', true);
        this.changeValidStatus(ingredient.code, false);
        this.changeFocusStatus(ingredient.code, false, false);
        if (this.ingredients.length === 2) {
          this.disabled = false;
        }
      } else {
        this.disabled = true;
        this.changeFocusStatus(ingredient.code, true, false);
        this.changeValidStatus(ingredient.code, true);
        this.alertify.warning(`Invalid!`, true);
      }
    }

    // if Chemical is C, focus in chemical D
    if (ingredient.position === 'C') {
      if (currentValue <= max && currentValue >= min) {
        this.changeScanStatusFocus('C', false);
        this.changeScanStatusFocus('D', true);
        this.changeValidStatus(ingredient.code, false);
        this.changeFocusStatus(ingredient.code, false, false);
        if (this.ingredients.length === 3) {
          this.disabled = false;
        }
      } else {
        this.disabled = true;
        this.changeFocusStatus(ingredient.code, true, false);
        this.changeValidStatus(ingredient.code, true);
        this.alertify.warning(`Invalid!`, true);
      }
    }

    // if Chemical is D, focus in chemical E
    if (ingredient.position === 'D') {
      if (currentValue <= max && currentValue >= min) {
        this.changeScanStatusFocus('D', false);
        this.changeScanStatusFocus('E', true);
        this.changeValidStatus(ingredient.code, false);
        this.changeFocusStatus(ingredient.code, false, false);
        if (this.ingredients.length >= 4) {
          this.disabled = false;
        }
      } else {
        this.disabled = true;
        this.changeFocusStatus(ingredient.code, true, false);
        this.changeValidStatus(ingredient.code, true);
        this.alertify.warning(`Invalid!`, true);
      }
    }

    this.changeReal(ingredient.code, args.target.value);
  }

  onKeyupReal(item, args) {
    if (args.keyCode === 13) {
      this.checkValidPosition(item, args);
      const levels = [1, 2, 3, 4];
      const building = JSON.parse(localStorage.getItem('level'));
      let buildingName = building.name;
      if (levels.includes(building.level)) {
        buildingName = 'E';
      }
      // this.UpdateConsumption(item.code, item.batch, item.real);
      const obj = {
        qrCode: item.code,
        batch: item.batch,
        consump: item.real,
        buildingName
      };
      this.UpdateConsumptionWithBuilding(obj);

    }
  }

  UpdateConsumption(code, batch, consump) {
    this.ingredientService.UpdateConsumption(code, batch, consump).subscribe(() => { });
  }

  UpdateConsumptionWithBuilding(obj) {
    this.ingredientService.UpdateConsumptionOfBuilding(obj).subscribe(() => { });
  }

  lockClass(item) {
    return item.scanCode === true ? '' : 'lock';
  }

  realClass(item) {
    const validClass = item.valid === true ? ' warning-focus' : '';
    const className = item.info + validClass;
    return className;
  }

  changeScanStatusFocus(position, status) {
    for (const i in this.ingredients) {
      if (this.ingredients[i].position === position) {
        this.ingredients[i].scanStatus = status;
        break; // Stop this loop, we found it!
      }
    }
  }
  changeValidStatus(code, validStatus) {
    for (const i in this.ingredients) {
      if (this.ingredients[i].code === code) {
        this.ingredients[i].valid = validStatus;
        break; // Stop this loop, we found it!
      }
    }
  }

  findIngredient(position) {
    for (const item of this.ingredients) {
      if (item.position === position) {
        return item;
      }
    }
  }

  findIngredientCode(code) {
    for (const item of this.ingredients) {
      if (item.code === code) {
        return item;
      }
    }
  }
  toFixedIfNecessary(value, dp) {
    return +parseFloat(value).toFixed(dp);
  }
  scanChemicalA() {
    for (const i in this.ingredients) {
      if (this.ingredients[i].code === 'A') {
        this.ingredients[i].scanStatus = true;
        break; // Stop this loop, we found it!
      }
    }
  }
  changeInfo(info, code) {
    for (const i in this.ingredients) {
      if (this.ingredients[i].code === code) {
        this.ingredients[i].info = info;
        break; // Stop this loop, we found it!
      }
    }
  }
  changeScanStatus(code, scanStatus) {
    for (const i in this.ingredients) {
      if (this.ingredients[i].code === code) {
        this.ingredients[i].scanStatus = scanStatus;
        break; // Stop this loop, we found it!
      }
    }
  }
  changeFocusStatus(code, focusReal, focusExpected) {
    for (const i in this.ingredients) {
      if (this.ingredients[i].code === code) {
        this.ingredients[i].focusReal = focusReal;
        this.ingredients[i].focusExpected = focusExpected;
        break; // Stop this loop, we found it!
      }
    }
  }
  allowCaculator(item, expected) {
    if (item.allow === 0) {
      return expected;
    }
    return (item.allow / 100) * expected;
  }
  changeExpected(position, expected) {
    for (const i in this.ingredients) {
      if (this.ingredients[i].position === position) {
        const expectedResult = expected;
        // const expectedResult = this.toFixedIfNecessary(expected, 2);
        this.ingredients[i].expected = expectedResult;
        break; // Stop this loop, we found it!
      }
    }
  }
  changeReal(code, real) {
    for (const i in this.ingredients) {
      if (this.ingredients[i].code === code) {
        this.ingredients[i].real = this.toFixedIfNecessary(real, 3);
        break; // Stop this loop, we found it!
      }
    }
  }

  chartHovered($event) { }
  chartClicked($event) { }

  back() {
    this.existGlue = true;
    this.show = false;
    this.showQRCode = false;
    this.disabled = true;
    this.glue = [];
    this.qrCode = '';
    this.expiredTime = null;
    this.code = '';
  }

  printGlue() {
    const qrcode = document.getElementById('qrcode');
    const glueName = document.getElementById('glueName');
    const glueNameExpiredTime = document.getElementById('glueNameExpiredTime');
    const WindowPrt = window.open('', '_blank', 'left=0,top=0,width=1000,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(`
    <html>
      <head>
      </head>
      <body onload="window.print(); window.close()">
        <h1 style="text-align: center"> ${qrcode.innerHTML}</h1>
        <h2 style="text-align: center"> ${glueName.innerHTML}</h2>
        <h2 style="text-align: center"> ${glueNameExpiredTime.innerHTML}</h2>

      </body>
    </html>
    `);
    WindowPrt.document.close();
  }
  // end make glue
  expiredTime() {
    const date = this.dateTimeNow;
    const result = date.setMinutes(date.getMinutes() + this.glue.expiredTime);
    return `${new Date(result).toLocaleDateString()} ${new Date(result).toLocaleTimeString()}`;
  }

  onChangeScanQRCode(args) {
    // this.qrCode = args;
    // if (this.qrCode.length === 8) {
    //   this.scanQRCode();
    // }
  }
  pushHistory(data) {
    this.router.navigate([`/ec/execution/todolist/history/${data.GlueID}`]);
  }

  blurTd(data) {
    data.editable = false;
    this.summary();
  }
  editDomain(data: any) {
    console.log('Edit Domain', data);
    if (data.consumption === 0) {
      // this.alertify.warning(`This glue ${data.glueName} has not been mixed!!!`);
      this.alertify.warning(`Chuyền ${data.line} không sử dụng keo này!<br>
        The line ${data.line} doesn't use this glue.
      `, true);
      return;
    }
    if (data.maxReal === 0) {
      // this.alertify.warning(`This glue ${data.glueName} has not been mixed!!!`);
      this.alertify.warning(`Keo ${data.glueName} chưa trộn mà!<br>
       This glue ${data.glueName} hasn't mixed yet.
      `, true);
    } else {
      data.editable = !data.editable;
    }
  }
  dispatchGlue(args, data) {
    if (args.key === 'Enter') {
      if (args.target.value === '') {
        return;
      }
      const value = args.target.value || 0;
      const qty = parseFloat(value) || 0;
      if (qty === 0) {
        // this.alertify.warning(`Please enter numeric values ​​only or the value must be greater than 0 !!!`);
        this.alertify.warning(`Chỉ nhập số và phải lớn hơn 0.<br>
        Please enter numeric values ​​only or the value must be greater than 0.
        `, true);
        return;
      }
      const remainingGlue = this.toFixedIfNecessary(data.maxReal - data.delivered, 3);
      if (qty > remainingGlue) {
        this.alertify.warning(`
        Keo ${data.glueName} đã giao ${data.delivered}kg còn lại ${remainingGlue}kg. <br>
        Nhập giá trị nhỏ hơn hoặc bằng ${remainingGlue}kg!!!
        `, true);
        return;
      }
      const obj = {
        glueID: data.glueID,
        glueName: data.glueName,
        buildingID: data.lineID,
        qty: qty + '',
        createdBy: Number(JSON.parse(localStorage.getItem('user')).User.ID)
      };
      // call api here
      this.planService.dispatchGlue(obj)
        .subscribe(res => {
          if (res) {
            this.alertify.success('Successfully!');
            this.summary();
          }
        });
    }

  }
  frozen(field) {
    if (field === 'Supplier') {
      return 'my-sticky';
    }
    if (field === 'Chemical') {
      return 'my-sticky-glue';
    }
  }
  frozenBody(i) {
    if (i === 0) {
      return 'my-sticky';
    }
    if (i === 1) {
      return 'my-sticky-glue';
    }
  }

  onBeforeRender(args, data, i) {
    const t = this.tooltip.filter((item, index) => index === i)[0];
    t.content = 'Loading...';
    t.dataBind();
    this.planService.getBPFCByGlue(data.glueName)
      .subscribe((res: any) => {
        t.content = res.join('<br>');
        t.dataBind();
      });
  }
  toolbarClick(args): void {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.deliveredGrid.excelExport();
        break;
      /* tslint:enable */
      case 'PDF Export':
        break;
    }
  }
}
