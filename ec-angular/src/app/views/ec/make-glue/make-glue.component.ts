import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AccumulationChartComponent, IAccLoadedEventArgs, AccumulationTheme, AccumulationChart } from '@syncfusion/ej2-angular-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions } from 'chart.js';
import { IGlue } from 'src/app/_core/_model/glue';
import { IMakeGlue } from 'src/app/_core/_model/make-glue';
import { IIngredient } from 'src/app/_core/_model/Ingredient';
import { MakeGlueService } from 'src/app/_core/_service/make-glue.service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { GlueService } from 'src/app/_core/_service/glue.service';
import { ChartDataService } from 'src/app/_core/_service/chart-data.service';
import { GlueIngredientService } from 'src/app/_core/_service/glue-ingredient.service';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { highlightSearch, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { PlanService } from 'src/app/_core/_service/plan.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/_core/_service/auth.service';
import { BPFCEstablishService } from 'src/app/_core/_service/bpfc-establish.service';
const ADMIN_LEVEL = 1;
const SUP_LEVEL = 2;
const STAFF_LEVEL = 3;
const WORKER_LEVEL = 4;

@Component({
  selector: 'app-make-glue',
  templateUrl: './make-glue.component.html',
  styleUrls: ['./make-glue.component.scss'],
  providers: [ToolbarService, EditService, PageService]
})
export class MakeGlueComponent implements OnInit {
  public glues: IGlue[];
  public makeData: IGlue;
  pairOfShoeInput: number;
  kilogramInput: number;
  gramInput: number;
  glueID: number;
  glue: any;
  makeGlue = {
    id: 0,
    name: '',
    code: '',
    ingredients: []
  };
  modalReference: NgbModalRef;
  guidance =
    {
      modelName: 0,
      modelNo: 0,
      input: 0,
      lineID: 0,
      ingredientID: 0,
      glueID: 0
    };
  guidances: any[] = [];
  level: any;
  public ingredients: any;
  public fields: object = { text: 'name', value: 'id' };
  public fieldsGlue: object = { text: 'name', value: 'id' };
  public inputIngredient: number;
  public weight: any;
  show: boolean;
  // Pie
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
  public dataModalName: { [key: string]: object }[] = [];
  public dataModalNo: { [key: string]: object }[] = [];
  public queryString: string;
  public fields2: object = {
    text: 'name', value: 'id', itemCreated: (e: any) => {
      highlightSearch(e.item, this.queryString, true, 'StartsWith');
    }
  };
  public textName = 'Select Model Name - Model No.';
  public textLine = 'Select line';
  public textNo = 'Select Model No';
  public textGlue = 'Select glue name or glue code';
  public pieChartLabels: string[];
  public pieChartData: any[] = [];
  public pieChartType = 'pie';
  public pieChartPlugins = [pluginDataLabels];
  public isModalNo: boolean;
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
  line: any;
  @ViewChild('glueDropdownlist')
  public dropDownListObject: DropDownListComponent;
  public suggestions: any;
  public editSettings: object = {
    showDeleteConfirmDialog: false,
    allowEditing: false,
    allowAdding: false,
    allowDeleting: false,
    mode: 'Normal'
  };
  public toolbar: string[] = ['Delete', 'Search'];
  public gluess: object[];
  public modelNameid: any;
  buildingID: number;
  lines: any;
  glueName: any;
  consumption: number;
  constructor(
    private makeGlueService: MakeGlueService,
    private glueService: GlueService,
    private planService: PlanService,
    private alertify: AlertifyService,
    public authService: AuthService,
    public bPFCEstablishService: BPFCEstablishService,
    public modalService: NgbModal,
    private chartDataService: ChartDataService,
    private glueIngredientService: GlueIngredientService
  ) { }
  ngOnInit() {
    this.getBuilding();
    this.getAllGlue();
    this.existGlue = true;

  }
  getBuilding() {
    const userID = JSON.parse(localStorage.getItem('user')).User.ID;
    this.authService.getBuildingByUserID(userID).subscribe((res: any) => {
      res = res || {};
      if (res !== {}) {
        this.level = res;
        this.getLine(res.id);
      }
    });
  }

  getLine(buildingID) {
    this.planService.getLines(buildingID).subscribe((res: any) => {
      this.lines = res;
    });
  }
  getAllBPFCByBuildingID(buildingID) {
    this.bPFCEstablishService.getAllBPFCByBuildingID(buildingID).subscribe((res: any) => {
      this.dataModalName = res.map(item => {
        return {
          id: item.id,
          name: item.bpfcName
        };
      });
    });
  }
  getGlueByBuildingModelName(buildingID, modelNameID) {
    this.planService.getGlueByBuildingModelName(buildingID, modelNameID).subscribe((res: any) => {
      this.gluess = res;
    });
  }
  getGlueByBuilding(buildingID) {
    this.planService.getGlueByBuilding(buildingID).subscribe((res: any) => {
      this.gluess = res;
    });
  }
  actionBegin(args) {

  }
  clickHandler(args) {

  }
  rowSelected(args) {

  }
  getGlueByModelName(id) {
    this.glueService.getGlueByModelName(id).subscribe((res: any) => {
      this.gluess = res;
    });
  }
  changeLine(args) {
    if (args.isInteracted) {
      this.buildingID = args.itemData.id;
      this.getAllBPFCByBuildingID(this.buildingID);
    }
  }
  changeModalName(args) {
    if (args.isInteracted) {
      this.modelNameid = args.value;
      this.getGlueByBuildingModelName(this.buildingID, this.modelNameid);
      this.existGlue = true;
      this.show = false;
      if (this.buildingID === undefined) {
        this.alertify.warning('Please select on building!', true);
      }
    }
  }

  async onChangeInput(args) {
    const { value: weight } = await this.alertify.$swal.fire({
      title: 'How many amount do you want to mix?',
      input: 'number',
      inputPlaceholder: 'Enter amount'
    });
    this.weight = weight;
    if (this.weight) {
      this.alertify.message(`Entered amount: ${this.weight}`);
      this.getGlueWithIngredientByGlueCode(args.target.value);
    }
  }
  getAllGlue() {
    this.makeGlueService.getAllGlues().subscribe((res) => {
      this.glues = res;
    });
  }

  fillterGlues(source, text) {
    let reslt = source;
    reslt = source.filter(item => {
      if (item.code.includes(text) || item.name.includes(text)) {
        return item;
      }
    });
    return reslt;
  }
  public onFiltering = (e: FilteringEventArgs) => {
    const query = new Query();
    this.queryString = e.text;
    e.updateData(this.fillterGlues(this.glues, e.text));
  }
  fillterBuildings(source, text) {
    let reslt = source;
    reslt = source.filter(item => {
      if (item.name.includes(text)) {
        return item;
      }
    });
    return reslt;
  }
  public onFilteringBuilding = (e: FilteringEventArgs) => {
    const query = new Query();
    this.queryString = e.text;
    e.updateData(this.fillterBuildings(this.lines, e.text));
  }
  fillterModel(source, text) {
    let reslt = source;
    reslt = source.filter(item => {
      if (item.name.includes(text) || item.modelNo.includes(text)) {
        return item;
      }
    });
    return reslt;
  }
  public onFilteringModel = (e: FilteringEventArgs) => {
    const query = new Query();
    this.queryString = e.text;
    e.updateData(this.fillterModel(this.dataModalName, e.text));
  }
  openModal(ref, data) {
    this.glueID = data.glueID;
    this.glue = data;
    this.modalService.open(ref).result.then((result) => {
      this.pairOfShoeInput = undefined;
      this.kilogramInput = undefined;
      this.gramInput = undefined;
    }, (reason) => {
      this.pairOfShoeInput = undefined;
      this.kilogramInput = undefined;
      this.gramInput = undefined;
      this.glueID = undefined;
      this.glue = undefined;
    });
  }
  onPairOfShoeInput(args) {
    this.kilogramInput = undefined;
    this.gramInput = undefined;
  }
  onKilogramInput(args) {
    this.pairOfShoeInput = undefined;
    this.gramInput = undefined;
  }
  onGramInput(args) {
    this.pairOfShoeInput = undefined;
    this.kilogramInput = undefined;

  }
  calculatorWeight(weight) {
    if (this.glue.consumption === '') {
      this.weight = weight;
    } else {
      this.weight = Math.round(weight * parseFloat(this.glue.consumption));
    }
    this.getGlueWithIngredientByGlueID(this.glueID);
  }
  mix() {
    if (this.pairOfShoeInput !== undefined) {
      this.calculatorWeight(this.pairOfShoeInput);
    }
    if (this.kilogramInput !== undefined) {
      this.calculatorWeight(this.kilogramInput);
    }
    if (this.gramInput !== undefined) {
      this.calculatorWeight(this.gramInput);
    }
    this.modalService.dismissAll();
  }

  getAllModelName() {
    this.makeGlueService.getAllModalName().subscribe((res: any) => {
      this.dataModalName = res.map(item => {
        return {
          id: item.id,
          name: `${item.name} - ${item.modelNo}`,
          createdDate: item.createdDate,
          artNo: item.artNo,
          artNoID: item.artNoID,
          modelNo: item.modelNo,
          createdBy: item.createdBy,
          createdStatus: item.createdStatus,
          approvedStatus: item.approvedStatus,
          articleNoDtos: item.articleNoDtos
        };
      });
    });
  }

  getAllModelNo(id) {
    this.makeGlueService.getAllModalNo(id).subscribe((res: any) => {
      this.dataModalNo = res.modelNos;
    });
  }

  onChange($event, item) {
    const weightNew = parseFloat($event.target.value);
    const weightOld = (Number(this.weight) * item.percentage) / 100;
    if (weightNew > weightOld) {
      this.alertify.warning('Exceeded weight!', true);
    }
    const items = {
      modelName: this.guidance.modelName,
      modelNo: this.guidance.modelNo,
      input: $event.target.value,
      lineID: 0,
      ingredientID: item.id,
      glueID: this.makeGlue.id
    };
    this.guidances.push(items);
  }

  Finish() {
    this.makeGlueService.Guidance(this.guidances).subscribe(() => {
      this.alertify.success('The Glue has been finished successfully');
    });
  }

  async change($event) {
    this.show = true;
    const { value: weight } = await this.alertify.$swal.fire({
      title: 'How many kilogram do you want to mix?',
      input: 'number',
      inputPlaceholder: 'Enter kilogram',
      inputAttributes: {
      }
    });
    this.weight = weight;
    if (this.weight) {
      this.alertify.message(`Entered kilogram: ${this.weight}`);
    }
    this.getMakeGlueByGlueID($event.value);
  }

  suggestion(item, i) {
    if (i === 0) { // A
      return Math.round(this.weight) + 'g';
    } else if (i === 1) { // B
      this.B = Math.round(parseFloat(this.weight) * item.percentage / 100) + 'g';
      return this.B;
    } else if (i === 2) { // C
      this.C = Math.round((parseFloat(this.B) + parseFloat(this.weight)) * item.percentage / 100) + 'g';
      return this.C;
    } else if (i === 3) {
      this.D = Math.round((parseFloat(this.B) + parseFloat(this.C) + parseFloat(this.weight)) * item.percentage / 100) + 'g';
      return this.D;
    } else if (i === 4) {
      this.E = Math.round((parseFloat(this.B) + parseFloat(this.C)
        + parseFloat(this.D) + parseFloat(this.weight)) * item.percentage / 100) + 'g';
      return this.E;
    }
  }
  getMakeGlueByGlueID(id: number) {
    this.makeGlueService.getMakeGlueByGlueID(id).subscribe((res: any) => {
      this.ingredients = res.ingredients as IIngredient[];
      this.pieChartLabels = this.ingredients.map(item => {
        return item.name;
      });
      this.pieChartData = this.ingredients.map(item => {
        return (Math.round(this.weight * item.percentage) / 100);
      });
    });
  }

  // 09978373
  getGlueWithIngredientByGlueCode(code: string) {
    this.makeGlueService.getGlueWithIngredientByGlueCode(code).subscribe((res: any) => {
      if (res.id === 0) {
        this.alertify.warning('Glue Code is not available!', true);
        this.show = false;
      } else {
        this.show = true;
        this.existGlue = false;
        this.makeGlue = res;
        this.ingredients = res.ingredients as IIngredient[];
        this.loadDataChart();
      }
    });
  }
  getGlueWithIngredientByGlueID(glueID: number) {
    this.makeGlueService.getGlueWithIngredientByGlueID(glueID).subscribe((res: any) => {
      if (res.id === 0) {
        this.alertify.warning('Glue Code is not available!', true);
        this.show = false;
      } else {
        this.show = true;
        this.existGlue = false;
        this.makeGlue = res;
        this.ingredients = res.ingredients.map( item => {
          return {
            id: item.id,
            name: item.name,
            percentage: item.percentage,
            position: item.position,
            allow: item.allow,
            expected: 0,
            real: 0
          };
        });
        this.loadDataChart();
      }
    });
  }
  loadDataChart() {
    this.pieChartLabels = this.ingredients.map(item => {
      return item.name;
    });
    this.pieChartData = this.ingredients.map((item, i) => {
      return item.expected;
    });
  }

  chartHovered($event) {

  }
  chartClicked($event) { }

  mapGlueIngredient(glueIngredient) {
    this.glueIngredientService.mappGlueIngredient(glueIngredient).subscribe(res => {
      this.alertify.success('Glue and Ingredient have been mapping!');
    });
  }

  mixingSection(data) {
    this.glueName = data.name;
    this.glueID = data.glueID;
    this.glue = data;
    this.getGlueWithIngredientByGlueID(this.glueID);
  }
  calculatorIngredient(weight, percentage) {
    return (weight * percentage) / 100 ?? 0;
  }
  real(item, args) {
    if (item.position === 'A') {
      const weight = parseFloat(args.target.value);
      const expectedB = this.calculatorIngredient(weight, this.findIngredient('B')?.percentage);
      this.changeExpected('B', expectedB);
      const expectedC = this.calculatorIngredient(weight + expectedB , this.findIngredient('C')?.percentage);
      this.changeExpected('C', expectedC);
      const expectedD = this.calculatorIngredient(weight + expectedB  + expectedC , this.findIngredient('D')?.percentage);
      this.changeExpected('D', expectedD);
      const expectedE = this.calculatorIngredient(weight + expectedB  + expectedC  + expectedD , this.findIngredient('E')?.percentage);
      this.changeExpected('E', expectedE);
      this.loadDataChart();
    }
  }
  findIngredient(position) {
    for (const item of this.ingredients) {
      if (item.position === position) {
        return item;
      }
    }
  }
  changeExpected(position, expected) {
    for (const i in this.ingredients) {
      if (this.ingredients[i].position === position) {
        this.ingredients[i].expected = expected;
        break; // Stop this loop, we found it!
      }
    }
  }
  changeReal(position, real) {
    for (const i in this.ingredients) {
      if (this.ingredients[i].position === position) {
        this.ingredients[i].real = real;
        break; // Stop this loop, we found it!
      }
    }
  }
  expected(item, args) {
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
      this.loadDataChart();
    }
  }
  back() {
    this.existGlue = true;
    this.show = false;
  }
}
