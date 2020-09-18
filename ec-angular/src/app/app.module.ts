import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './views/layout/layout/layout.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { FooterComponent } from './views/layout/footer/footer.component';
import { BreadcrumbComponent } from './views/layout/breadcrumb/breadcrumb.component';
import { LoginComponent } from './views/login/login.component';

import { P404Component } from './views/p404/p404.component';
import { P500Component } from './views/p500/p500.component';

// service
import { AlertifyService } from './_core/_service/alertify.service';
import { AuthService } from './_core/_service/auth.service';
import { AuthGuard } from './_core/_guards/auth.guard';
import { NgxSpinnerService } from 'ngx-spinner';
// handle err
import { ErrorInterceptorProvider } from './_core/_service/error.interceptor';

export function tokenGetter() {
  return localStorage.getItem('token');
}
// resolvers
import { ProjectResolver } from './_core/_resolvers/project.resolvers';
import { ProjectDetailResolver } from './_core/_resolvers/projectDetail.resolvers';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafePipeModule } from 'safe-pipe';
import { TodolistResolver } from './_core/_resolvers/todolist.resolvers';
import { HistoryResolver } from './_core/_resolvers/history.resolvers';
import { FollowResolver } from './_core/_resolvers/follow.resolvers';
import { OcResolver } from 'src/app/_core/_resolvers/oc.resolvers';

// module
import { MomentModule } from 'ngx-moment';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserResolver } from './_core/_resolvers/user.resolvers';
import { BasicAuthInterceptor } from './_core/_helper/basic-auth.interceptor';
import { RoleResolver } from './_core/_resolvers/role.resolvers';
import { MentionModule } from 'angular-mentions';
import { UploaderModule  } from '@syncfusion/ej2-angular-inputs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AvatarModalComponent } from './views/layout/header/avatar-modal/avatar-modal.component';
import { PreviewModalComponent } from './views/layout/header/preview-modal/preview-modal.component';
import { GlueResolver } from './_core/_resolvers/glue.resolver';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import {HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    LoginComponent,
    P404Component,
    P500Component,
    AvatarModalComponent,
    PreviewModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MultiSelectAllModule,
    DropDownListAllModule,
    MultiSelectModule,
    HttpClientModule,
    SafePipeModule,
    MomentModule,
    InfiniteScrollModule,
    MentionModule,
    ImageCropperModule,
    UploaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'vi'
  }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['10.4.0.76:96'],
        blacklistedRoutes: ['10.4.0.76:96/api/auth']
      }
    })
  ],
  providers: [
    AlertifyService,
    AuthGuard,
    NgxSpinnerService,
    ErrorInterceptorProvider,
    ProjectResolver,
    TodolistResolver,
    HistoryResolver,
    FollowResolver,
    UserResolver,
    ProjectDetailResolver,
    RoleResolver,
    AuthService,
    GlueResolver,

    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
