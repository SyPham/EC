import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ElementRef, QueryList, Query } from '@angular/core';
import { ColumnModel, ResizeService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { orderDetails } from './data';
import { PlanService } from 'src/app/_core/_service/plan.service';
import * as signalr from '../../../../assets/js/ec-client.js';
import { AuthService } from 'src/app/_core/_service/auth.service';
import { IIngredient } from 'src/app/_core/_model/Ingredient';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MakeGlueService } from 'src/app/_core/_service/make-glue.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions } from 'chart.js';
import { DisplayTextModel } from '@syncfusion/ej2-angular-barcode-generator';
import { IngredientService } from 'src/app/_core/_service/ingredient.service';
import { ThemeService } from 'ng2-charts';
import { Router } from '@angular/router';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
declare var $: any;
declare var Swal: any;
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, AfterViewInit {
  @ViewChild('scanQRCode') scanQRCodeElement: ElementRef;
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
  public aStatus: boolean;
  public bStatus: boolean;
  public cStatus: boolean;
  public dStatus: boolean;
  public eStatus: boolean;
  public pieChartData: any[] = [];
  public pairOfShoeInput: number;
  public kilogramInput: number;
  public gramInput: number;
  public pairOfShoeInputStatus: boolean;
  public kilogramInputStatus: boolean;
  public gramInputStatus: boolean;
  public weight: any;
  public glue: any;
  public consumption: any;
  public glueID: number;
  public glueName: number;
  public quantity: string;
  public A: any;
  public B: any;
  public C: any;
  public D: any;
  public E: any;
  public B1: any;
  public C1: any;
  public D1: any;
  public E1: any;
  public existGlue: any = false;
  @ViewChild('ddlelement')
  public dropDownListObject1: DropDownListComponent;
  public guidances: any;
  public guidance =
    {
      modelName: 0,
      modelNo: 0,
      input: 0,
      lineID: 0,
      ingredientID: 0,
      glueID: 0
    };
  public pieChartLabels: string[];
  public pieChartPlugins = [pluginDataLabels];
  public pieChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          // console.log('formatter: ', ctx, value);
          // const label = ctx.chart.data.labels[ctx.dataIndex];
          return value + 'g';
        },
      },
    }
  };
  // end make glue
  public data: object[] = [];
  public lineColumns: ColumnModel[];
  linevalue: any;
  public buildingID: any;
  connection: any;
  feilds: any;
  @ViewChild('grid')
  grid: GridComponent;
  screenHeight: number;
  showQRCode: boolean;
  qrCode: any;
  scanStatus: boolean;
  dateTimeNow: Date;
  code: any;
  disabled = true;
  // check: boolean = true;
  cancel = false;
  constructor(
    private planService: PlanService,
    private authService: AuthService,
    public modalService: NgbModal,
    public ingredientService: IngredientService,
    private makeGlueService: MakeGlueService,
    private alertify: AlertifyService,
    private el: ElementRef,
    private router: Router,
    private renderer: Renderer2
  ) { }
  public ngOnInit(): void {
    this.showQRCode = false;
    this.qrCode = '';
    this.getBuilding();
    this.existGlue = true;
    this.connection = signalr.CONNECTION_HUB;
    if (signalr.CONNECTION_HUB.state) {
      signalr.CONNECTION_HUB.on('summaryRecieve', (status) => {
        if (status === 'ok') { this.summary(); }
      });
    }
  }
  public ngAfterViewInit(): void {
    this.screenHeight = screen.height - 200;
  }
  created(args) {
  }
  dataBound() {
  }
  summary() {
    const E_BUILDING = 8;
    const ROLES = [1, 2, 3];
    const level = JSON.parse(localStorage.getItem('level')).level;
    if (ROLES.includes(level)) {
      this.buildingID = E_BUILDING;
    }
    this.planService.summary(this.buildingID).subscribe((res: any) => {
      this.lineColumns = res.header;
      this.data = res.data;
      this.linevalue = res.data.map(item => {
        return Object.values(item);
      });
    });
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
  Finish() {
    const date = new Date();
    this.guidances = {
      id: 0,
      glueID: this.glueID,
      chemicalA: this.findIngredientRealByPosition('A'),
      chemicalB: this.findIngredientRealByPosition('B'),
      chemicalC: this.findIngredientRealByPosition('C'),
      chemicalD: this.findIngredientRealByPosition('D'),
      chemicalE: this.findIngredientRealByPosition('E'),
      cretedTime: new Date(),
      mixBy: JSON.parse(localStorage.getItem('user')).User.ID
    };
    console.log('Finish', this.guidances);
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
      this.loadDataChart();
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
          info: ''
        };
      });
      console.log('Begin press mixing button -> focus chemical A', this.ingredients);

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
  onNgModelChangeScanQRCode(args, item) {
    this.qrCode = args;
    const position = item.position;
    if (this.qrCode.length === 8) {
      // alert warning
      this.scanQRCode().then(res => {
        if (args !== item.code) {
          this.alertify.warning(`Please scan the chemical ${item.position}`, true);
          this.qrCode = '';
          this.errorScan();
        } else {
          const code = res.code;
          const ingredient = this.findIngredientCode(code);
          if (ingredient) {
            this.changeInfo('success-scan', ingredient.code);
            if (ingredient.expected === 0 && ingredient.position === 'A') {
              this.changeFocusStatus(ingredient.code, false, true);
            } else {
              this.changeFocusStatus(code, true, false);
            }
          }
        }
      }).catch(err => {
        this.errorScan();
        this.alertify.warning('This chemical does not exists!', true);
        this.qrCode = '';
      });
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
    if (item.scanStatus === false && item.focusReal === false && item.focusReal === false) {
      return false;
    }
    return true;
  }
  loadDataChart() {
    this.pieChartLabels = this.ingredients.map(item => {
      return item.name;
    });
    this.pieChartData = this.ingredients.map((item, i) => {
      return item.expected;
    });
  }
  mixingSection(data) {
    this.glueName = data[2];
    this.glueID = data[0];
    this.glue = data;
    this.scanStatus = true;
    this.consumption = parseFloat(data[data.length - 3]);
    this.getGlueWithIngredientByGlueID(this.glueID);
  }
  calculatorIngredient(weight, percentage) {
    const result = (weight * percentage) / 100;
    return result ?? 0;
  }
  onKeyupExpected(item, args) {
    if (args.keyCode === 13) {
      if (item.position === 'A') {
        const weight = parseFloat(args.target.value);
        this.changeExpected('A', args.target.value);
        const expectedB = this.calculatorIngredient(weight, this.findIngredient('B')?.percentage);
        this.changeExpected('B', expectedB);
        const expectedC = this.calculatorIngredient(weight + expectedB, this.findIngredient('C')?.percentage);
        this.changeExpected('C', expectedC);
        const expectedD = this.calculatorIngredient(weight + expectedB + expectedC, this.findIngredient('D')?.percentage);
        this.changeExpected('D', expectedD);
        const expectedE = this.calculatorIngredient(weight + expectedB + expectedC + expectedD, this.findIngredient('E')?.percentage);
        this.changeExpected('E', expectedE);
        // this.loadDataChart();
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
      const allow = this.calculatorIngredient(expected, this.findIngredient(position)?.allow);
      const min =  expected - allow;
      const max = expected + allow ;
      const expectedRange = `${this.toFixedIfNecessary(min, 3)} - ${this.toFixedIfNecessary(max, 3)}`;
      if (allow === 0) {
        this.changeExpected(position, expected);
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
      min = parseFloat(ingredient.expected.split(' - ')[0]),
      max = parseFloat(ingredient.expected.split(' - ')[1]);
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

    }
    // if Chemical is B, focus in chemical C
    if (ingredient.position === 'B' ) {
      if (currentValue <= max && currentValue >= min) {
        this.changeScanStatusFocus('B', false);
        this.changeScanStatusFocus('C', true);
        this.changeValidStatus(ingredient.code, false);
        this.changeFocusStatus(ingredient.code, false, false);
        this.disabled = false;
      } else {
        this.disabled = true;
        this.changeFocusStatus(ingredient.code, true, false);
        this.changeValidStatus(ingredient.code, true);
        this.alertify.warning(`Invaild!`, true);
      }
    }
      // if Chemical is C, focus in chemical D
    if (ingredient.position === 'C' ) {
      if (currentValue <= max && currentValue >= min) {
        this.changeScanStatusFocus('C', false);
        this.changeScanStatusFocus('D', true);
        this.changeValidStatus(ingredient.code, false);
        this.changeFocusStatus(ingredient.code, false, false);
        this.disabled = false;
      } else {
        this.disabled = true;
        this.changeFocusStatus(ingredient.code, true, false);
        this.changeValidStatus(ingredient.code, true);
        this.alertify.warning(`Invaild!`, true);
      }
    }
      // if Chemical is D, focus in chemical E
    if (ingredient.position === 'D' ) {
      if (currentValue <= max && currentValue >= min) {
        this.changeScanStatusFocus('D', false);
        this.changeScanStatusFocus('E', true);
        this.changeValidStatus(ingredient.code, false);
        this.changeFocusStatus(ingredient.code, false, false);
        this.disabled = false;
      } else {
        this.disabled = true;
        this.changeFocusStatus(ingredient.code, true, false);
        this.changeValidStatus(ingredient.code, true);
        this.alertify.warning(`Invaild!`, true);
      }
    }
    this.changeReal(ingredient.code, args.target.value);
  }
  onKeyupReal(item, args) {
    if (args.keyCode === 13) {
      this.checkValidPosition(item, args);
      console.log('on Key Up Real ', this.ingredients);
    }
  }

  lockClass(item) {
    return item.scanCode === true ? '' : 'lock';
  }
  realClass(item) {
    const validClass = item.valid === true ? ' warning-focus' : '';
    const className =  item.info + validClass;
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
  openModal(ref, data) {
    this.glueName = data[2];
    this.glueID = data[0];
    this.glue = data;
    this.consumption = parseFloat(data[data.length - 3]);
    this.modalService.open(ref).result.then((result) => {
      this.pairOfShoeInput = undefined;
      this.kilogramInput = undefined;
      this.gramInput = undefined;
      this.glueName = undefined;
      this.glue = undefined;
      this.makeGlue = undefined;
    }, (reason) => {
      this.pairOfShoeInput = undefined;
      this.kilogramInput = undefined;
      this.gramInput = undefined;
      this.glueName = undefined;
      this.glue = undefined;
    });
  }

  chartHovered($event) { }
  chartClicked($event) { }
  back() {
    this.existGlue = true;
    this.show = false;
    this.showQRCode = false;
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
    this.router.navigate([`/ec/execution/todolist/history/${data[0]}`]);
  }
}
