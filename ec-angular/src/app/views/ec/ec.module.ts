// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
// Components Routing
import { ECRoutingModule } from './ec-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { GlueIngredientComponent } from './glue-ingredient/glue-ingredient.component';
import { GlueComponent } from './glue/glue.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { GlueModalComponent } from './glue/glue-modal/glue-modal.component';
import { IngredientModalComponent } from './ingredient/ingredient-modal/ingredient-modal.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Import ngx-barcode module
import { BarcodeGeneratorAllModule, DataMatrixGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { ChartsModule } from 'ng2-charts';
import { MakeGlueComponent } from './make-glue/make-glue.component';
import { SwitchModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { ModalNameComponent } from './modal-name/modal-name.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ModalNoComponent } from './modal-no/modal-no.component';
import { PlanComponent } from './plan/plan.component';
import { PrintBarCodeComponent } from './print-bar-code/print-bar-code.component';
import { LineComponent } from './line/line.component';
import { SuppilerComponent } from './suppiler/suppiler.component';
import { BuildingComponent } from './building/building.component';
import { BuildingUserComponent } from './building-user/building-user.component';
import { SummaryComponent } from './summary/summary.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AccountComponent } from './account/account.component';
import { BPFCScheduleComponent } from './BPFCSchedule/BPFCSchedule.component';
import { BuildingModalComponent } from './building/building-modal/building-modal.component';
import { QRCodeGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { EstablishedRecordComponent } from './established-record/established-record.component';
import { PrintQRCodeComponent } from './ingredient/print-qrcode/print-qrcode.component';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { setCulture, loadCldr, L10n } from '@syncfusion/ej2-schedule/node_modules/@syncfusion/ej2-base';
import { PartComponent } from './part/part.component';
import { KindComponent } from './kind/kind.component';
import { MaterialComponent } from './material/material.component';
import { BpfcComponent } from './bpfc/bpfc.component';
import { BpfcStatusComponent } from './bpfc-status/bpfc-status.component';
import { AutofocusDirective } from './focus.directive';
import { AutoSelectDirective } from './select.directive';
import { SearchDirective } from './search.directive';
import { GlueHistoryComponent } from './summary/glue-history/glue-history.component';
import { SelectTextDirective } from './select.text.directive';
import { InventoryComponent } from './inventory/inventory.component';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { DeliveredHistoryComponent } from './delivered-history/delivered-history.component';
import { SearchComponent } from './search/search.component';
import { AbnormalListComponent } from './abnormal-list/abnormal-list.component';
import { StirComponent } from './stir/stir.component';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SelectQrCodeDirective } from './select.qrcode.directive';
import { IncomingComponent } from './incoming/incoming.component';
import { BuildingSettingComponent } from './building-setting/building-setting.component';
import { PlanOutputQuantityComponent } from './plan-output-quantity/plan-output-quantity.component';
import { DatePipe } from '@angular/common';
setCulture('de-DE');

const lang = localStorage.getItem('lang');
let defaultLang: any;
if (lang) {
  defaultLang = lang;
} else {
  defaultLang = 'en';
}
@NgModule({
  providers: [
    DatePipe,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ECRoutingModule,
    NgSelectModule,
    DropDownListModule,
    NgbModule,
    ChartsModule,
    ChartAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    BarcodeGeneratorAllModule,
    QRCodeGeneratorAllModule,
    DataMatrixGeneratorAllModule,
    SwitchModule,
    MaskedTextBoxModule,
    DatePickerModule,
    TreeGridAllModule,
    GridAllModule,
    RadioButtonModule,
    TooltipModule,
    TimePickerModule ,
    Ng2SearchPipeModule,
    DateTimePickerModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: defaultLang
    }),
  ],
  declarations: [
    GlueIngredientComponent,
    GlueComponent,
    IngredientComponent,
    GlueModalComponent,
    IngredientModalComponent,
    MakeGlueComponent,
    ModalNameComponent,
    ModalNoComponent,
    PlanComponent,
    PrintBarCodeComponent,
    LineComponent,
    SuppilerComponent,
    BuildingComponent,
    BuildingModalComponent,
    BuildingUserComponent,
    AccountComponent,
    BPFCScheduleComponent,
    SummaryComponent,
    EstablishedRecordComponent,
    PrintQRCodeComponent,
    PartComponent,
    KindComponent,
    MaterialComponent,
    BpfcComponent,
    BpfcStatusComponent,
    AutofocusDirective,
    SelectTextDirective,
    AutoSelectDirective,
    SearchDirective,
    GlueHistoryComponent,
    InventoryComponent,
    DeliveredHistoryComponent,
    SearchComponent,
    AbnormalListComponent,
    StirComponent,
    SelectQrCodeDirective,
    IncomingComponent,
    PlanOutputQuantityComponent,
    BuildingSettingComponent
  ]
})
export class ECModule { }
