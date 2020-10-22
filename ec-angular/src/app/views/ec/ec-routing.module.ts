import { StirComponent } from './stir/stir.component';
import { AbnormalListComponent } from './abnormal-list/abnormal-list.component';
import { SearchComponent } from './search/search.component';
import { InventoryComponent } from './inventory/inventory.component';
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
import { DeliveredHistoryComponent } from './delivered-history/delivered-history.component';
import { IncomingComponent } from './incoming/incoming.component';
import { BuildingSettingComponent } from './building-setting/building-setting.component';
import { PlanOutputQuantityComponent } from './plan-output-quantity/plan-output-quantity.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ec',
      breadcrumb: 'Home'
    },
    children: [

      // setting
      {
        path: 'setting',
        data: {
          title: 'setting',
          breadcrumb: 'Setting'
        },
        children: [
          {
            path: '',
            component: IngredientComponent,
          },
          {
            path: 'ingredient',
            // component: IngredientComponent,
            data: {
              title: 'Ingredient',
              breadcrumb: 'Ingredient',
              url: 'ec/setting/Ingredient'
            },
            children: [
              {
                path: '',
                component: IngredientComponent,
              },
              {
                path: 'print-qrcode/:id/:code/:name',
                component: PrintQRCodeComponent,
                data: {
                  title: 'Print QRCode',
                  breadcrumb: 'Print QRCode'
                }
              }
            ]
          },
          {
            path: 'account-1',
            component: AccountComponent,
            data: {
              title: 'account',
              breadcrumb: 'Account'
            }
          },
          {
            path: 'account-2',
            component: BuildingUserComponent,
            data: {
              title: 'Account 2',
              breadcrumb: 'Account 2'
            }
          },
          {
            path: 'building-setting',
            component: BuildingSettingComponent,
            data: {
              title: 'Building Setting',
              breadcrumb: 'Building Setting'
            }
          }
          ,
          {
            path: 'building',
            component: BuildingComponent,
            data: {
              title: 'Building',
              breadcrumb: 'Building'
            }
          },
          {
            path: 'supplier',
            component: SuppilerComponent,
            data: {
              title: 'Suppiler',
              breadcrumb: 'Suppiler'
            }
          },
          {
            path: 'kind',
            component: KindComponent,
            data: {
              title: 'Kind',
              breadcrumb: 'Kind'
            }
          },
          {
            path: 'part',
            component: PartComponent,
            data: {
              title: 'Part',
              breadcrumb: 'Part'
            }
          },
          {
            path: 'material',
            component: MaterialComponent,
            data: {
              title: 'Material',
              breadcrumb: 'Material'
            }
          },
          {
            path: 'glue',
            component: GlueComponent,
            resolve: { glues: GlueResolver },
            data: {
              title: 'Glue',
              breadcrumb: 'Glue'
            }
          },
        ]
      },
       // end setting

      {
        path: 'troubleshooting',
        data: {
          title: 'Troubleshooting',
          breadcrumb: 'Troubleshooting'
        },
        children: [
          {
            path: 'search',
            component: SearchComponent,
            data: {
              title: 'Troubleshooting Search',
              breadcrumb: 'Search'
            }
          },
          {
            path: 'Abnormal-List',
            component: AbnormalListComponent,
            data: {
              title: 'Troubleshooting Black List',
              breadcrumb: 'Abnormal-List'
            }
          },
        ]
      },

      // establish
      {
        path: 'establish',
        data: {
          title: 'Establish',
          breadcrumb: 'Establish'
        },
        children: [
          {
            path: 'bpfc-schedule',
            component: BPFCScheduleComponent,
            data: {
              title: 'BPFC Schedule',
              breadcrumb: 'BPFC Schedule'
            }
          },
          {
            path: 'bpfc',
            resolve: { glues: GlueResolver },
            component: BpfcComponent,
            data: {
              title: 'bpfc',
              breadcrumb: 'BPFC'
            }
          }
        ]
      },
      // end establish

      // manage
      {
        path: 'manage',
        data: {
          title: 'Manage',
          breadcrumb: 'Manage'
        },
        children: [
          {
            path: 'workplan',
            component: PlanComponent,
            data: {
              title: 'Workplan',
              breadcrumb: 'Work Plan'
            }
          },
          {
            path: 'bpfc-status',
            component: BpfcStatusComponent,
            data: {
              title: 'BPFC Status',
              breadcrumb: 'BPFC Status'
            }
          }
        ]
      },
      // end manage

      // execution
      {
        path: 'execution',
        data: {
          title: 'Execution',
          breadcrumb: 'Execution'
        },
        children: [
          {
            path: 'addition',
            component: MakeGlueComponent,
            data: {
              title: 'Addtion',
              breadcrumb: 'Addtion'
            }
          },
          {
            path: 'todolist',
            // component: SummaryComponent,
            data: {
              title: 'todolist',
              breadcrumb: 'Todolist'
            },
            children: [
              {
                path: '',
                component: SummaryComponent,
              },
              {
                path: 'stir',
                component: StirComponent,
                data: {
                  title: 'Stir',
                  breadcrumb: 'Stir'
                }
              },
              {
                path: 'stir/:glueName',
                component: StirComponent,
                data: {
                  title: 'Stir',
                  breadcrumb: 'Stir'
                }
              },
              {
                path: 'history/:glueID',
                component: GlueHistoryComponent,
                data: {
                  title: 'History',
                  breadcrumb: 'History'
                }
              },
            ]
          },
          {
            path: 'incoming',
            // resolve: { ingredients: IngredientResolver },
            component: IncomingComponent,
            data: {
              title: 'Incoming',
              breadcrumb: 'Incoming'
            }
          },
        ]
      },
      // end execution

       // report
      {
        path: 'report',
        data: {
          title: 'Report',
          breadcrumb: 'Report'
        },
        children: [
          {
            path: 'established-record',
            component: EstablishedRecordComponent,
            data: {
              title: 'Established Record',
              breadcrumb: 'Established Record'
            }
          },
          {
            path: 'comsumption',
            component: SummaryComponent,
            data: {
              title: 'Comsumption',
              breadcrumb: 'Comsumption'
            }
          },
          {
            path: 'delivered-history',
            component: DeliveredHistoryComponent,
            data: {
              title: 'Delivered History',
              breadcrumb: 'Delivered History'
            }
          },
          {
            path: 'inventory',
            component: InventoryComponent,
            data: {
              title: 'Inventory',
              breadcrumb: 'Inventory'
            },
          },
          {
            path: 'output-quantity',
            component: PlanOutputQuantityComponent,
            data: {
              title: 'Output Quantity',
              breadcrumb: 'Output Quantity'
            }
          }
        ]
      },
      // end report
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECRoutingModule { }
