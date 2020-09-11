import { StirComponent } from './stir/stir.component';
import { AbnormalListComponent } from './abnormal-list/abnormal-list.component';
import { SearchComponent } from './search/search.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MaterialNameComponent } from './material-name/material-name.component';
import { PartName2Component } from './part-name2/part-name2.component';
import { PartName1Component } from './part-name1/part-name1.component';
import { SuppilerComponent } from './suppiler/suppiler.component';
import { PlanComponent } from './plan/plan.component';
import { ModalNoComponent } from './modal-no/modal-no.component';
import { ModalNameComponent } from './modal-name/modal-name.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlueIngredientComponent } from './glue-ingredient/glue-ingredient.component';
import { GlueComponent } from './glue/glue.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { GlueModalComponent } from './glue/glue-modal/glue-modal.component';
import { IngredientModalComponent } from './ingredient/ingredient-modal/ingredient-modal.component';
import { GlueResolver } from '../../_core/_resolvers/glue.resolver';
import { IngredientResolver } from '../../_core/_resolvers/ingredient.resolver';
import { MakeGlueComponent } from './make-glue/make-glue.component';
import { LineComponent } from './line/line.component';
import { BuildingComponent } from './building/building.component';
import { BuildingUserComponent } from './building-user/building-user.component';
import { SummaryComponent } from './summary/summary.component';
import { AccountComponent } from './account/account.component';
import { BPFCScheduleComponent } from './BPFCSchedule/BPFCSchedule.component';
import { PrintQRCodeComponent } from './ingredient/print-qrcode/print-qrcode.component';
import { EstablishedRecordComponent } from './established-record/established-record.component';
import { PartComponent } from './part/part.component';
import { KindComponent } from './kind/kind.component';
import { MaterialComponent } from './material/material.component';
import { BpfcComponent } from './bpfc/bpfc.component';
import { BpfcStatusComponent } from './bpfc-status/bpfc-status.component';
import { GlueHistoryComponent } from './summary/glue-history/glue-history.component';
import { ScanQrcodeFromIngredientComponent } from './ScanQrcodeFromIngredient/ScanQrcodeFromIngredient.component';
import { DeliveredHistoryComponent } from './delivered-history/delivered-history.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ec'
    },
    children: [
      // setting
      {
        path: 'setting/account-1',
        component: AccountComponent,
        data: {
          title: 'account'
        }
      },
      {
        path: 'setting/account-2',
        component: BuildingUserComponent,
        data: {
          title: 'Account 2'
        }
      },
      {
        path: 'setting/building',
        component: BuildingComponent,
        data: {
          title: 'Building'
        }
      },
      {
        path: 'setting/supplier',
        component: SuppilerComponent,
        data: {
          title: 'Suppiler'
        }
      },
      {
        path: 'setting/ingredient',
        // resolve: { ingredients: IngredientResolver },
        component: IngredientComponent,
        data: {
          title: 'Ingredient'
        }
      },
      {
        path: 'setting/ingredient/scanQrcode',
        // resolve: { ingredients: IngredientResolver },
        component: ScanQrcodeFromIngredientComponent,
        data: {
          title: 'scanQrcode'
        }
      },
      {
        path: 'report/inventory',
        // resolve: { ingredients: IngredientResolver },
        component: InventoryComponent,
        data: {
          title: 'Inventory'
        }
      },
      {
        path: 'troubleshooting/search',
        // resolve: { ingredients: IngredientResolver },
        component: SearchComponent,
        data: {
          title: 'Inventory'
        }
      },
      {
        path: 'troubleshooting/Abnormal-List',
        // resolve: { ingredients: IngredientResolver },
        component: AbnormalListComponent,
        data: {
          title: 'Inventory'
        }
      },
      {
        path: 'setting/ingredient/print-qrcode/:id/:code/:name',
        component: PrintQRCodeComponent,
        data: {
          title: 'Print QRCode'
        }
      },
      {
        path: 'setting/kind',
        component: KindComponent,
        data: {
          title: 'Kind'
        }
      },
      {
        path: 'setting/part',
        component: PartComponent,
        data: {
          title: 'Part'
        }
      },
      {
        path: 'setting/material',
        component: MaterialComponent,
        data: {
          title: 'Material'
        }
      },
      {
        path: 'setting/glue',
        component: GlueComponent,
        resolve: { glues: GlueResolver },
        data: {
          title: 'Glue'
        }
      },
      // end setting

      // establish
      {
        path: 'establish/bpfc',
        resolve: { glues: GlueResolver },
        component: BpfcComponent,
        data: {
          title: 'bpfc'
        }
      },
      // end establish

      // manage
      {
        path: 'manage/bpfc-status',
        component: BpfcStatusComponent,
        data: {
          title: 'BPFC Status'
        }
      },
      {
        path: 'manage/bpfc-schedule',
        // resolve: { ingredients: IngredientResolver },
        component: BPFCScheduleComponent,
        data: {
          title: 'BPFC Schedule'
        }
      },
      {
        path: 'manage/workplan',
        component: PlanComponent,
        data: {
          title: 'Workplan'
        }
      },
      // end manage

      // execution
      {
        path: 'execution/addition',
        component: MakeGlueComponent,
        data: {
          title: 'Addtion'
        }
      },
      {
        path: 'execution/todolist',
        component: SummaryComponent,
        data: {
          title: 'todolist'
        }
      },
      {
        path: 'execution/stir',
        component: StirComponent,
        data: {
          title: 'Stir'
        }
      },
      {
        path: 'execution/todolist/history/:glueID',
        component: GlueHistoryComponent,
        data: {
          title: 'History'
        }
      },
      // end execution
       // report
       {
        path: 'report/established-record',
        component: EstablishedRecordComponent,
        data: {
          title: 'Established Record'
        }
      },
      {
        path: 'report/comsumption',
        component: SummaryComponent,
        data: {
          title: 'Comsumption'
        }
      },
      {
        path: 'report/delivered-history',
        component: DeliveredHistoryComponent,
        data: {
          title: 'Delivered History'
        }
      }
      // end report
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECRoutingModule { }
