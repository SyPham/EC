import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './views/layout/layout/layout.component';
import { LoginComponent } from './views/login/login.component';

import { P404Component } from './views/p404/p404.component';
import { P500Component } from './views/p500/p500.component';
import { AuthGuard } from './_core/_guards/auth.guard';
import { SelectivePreloadingStrategyService } from './_core/_preloading/selective-preloading-strategy.service';

const routes: Routes = [
  // App routes goes here here
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'ec',
        loadChildren: () =>
          import('./views/ec/ec.module').then(m => m.ECModule)
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Not Found'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Server Error'
    }
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      // enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategyService,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
