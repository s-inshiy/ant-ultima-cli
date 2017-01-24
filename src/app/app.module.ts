import {
  NgModule,
  ApplicationRef
} from '@angular/core';

import {
  BrowserModule
} from '@angular/platform-browser';

import {
  FormsModule
} from '@angular/forms';

import {
  HttpModule,
  Http,
  RequestOptions
} from '@angular/http';

import {
  RouterModule,
  // Routes,
  // PreloadAllModules
} from '@angular/router';

import {
  routes
} from './app.routes';
import {
  AppComponent
} from './app.component';
import {
  APP_RESOLVER_PROVIDERS
} from './app.resolver';
import {
  AppState,
  InternalStateType
} from './app.service';

// Services
import {
  StreetService
} from './street/street.service';
import {
  AreaService
} from './area/area.service';
import {
  SettlementService
} from './settlement/settlement.service';
import {
  RegionService
} from './region/region.service';
import {
  BranchService
} from './branch/branch.service';
import {
  LoginService
} from './login/login.service';
import {
  AuthGuard
} from './guard';

// ng2Scroll
import {
  Ng2PageScrollModule
} from 'ng2-page-scroll';

// PrimeNG
// import {
//   AccordionModule
// } from 'primeng/primeng';
import {
  AutoCompleteModule
} from 'primeng/components/autocomplete/autocomplete';
// import { BreadcrumbModule } from 'primeng/primeng';
import {
  ButtonModule
} from 'primeng/components/button/button';
import {
  CalendarModule
} from 'primeng/components/calendar/calendar';
// import {CarouselModule} from 'primeng/primeng';
// import {ChartModule} from 'primeng/primeng';
import {
  CheckboxModule
} from 'primeng/components/checkbox/checkbox';
// import {CodeHighlighterModule} from 'primeng/primeng';
import {
  ConfirmDialogModule
} from 'primeng/components/confirmdialog/confirmdialog';
// import {
//   SharedModule
// } from 'primeng/primeng';
import {
  ContextMenuModule
} from 'primeng/components/contextmenu/contextmenu';
// import { DataGridModule } from 'primeng/primeng';
import {
  DataListModule
} from 'primeng/components/datalist/datalist';
// import { DataScrollerModule } from 'primeng/primeng';
import {
  DataTableModule
} from 'primeng/components/datatable/datatable';
import {
  DialogModule
} from 'primeng/components/dialog/dialog';
// import {DragDropModule} from 'primeng/primeng';
import {
  DropdownModule
} from 'primeng/components/dropdown/dropdown';
// import {EditorModule} from 'primeng/primeng';
// import { FieldsetModule } from 'primeng/primeng';
// import {FileUploadModule} from 'primeng/primeng';
// import {GalleriaModule} from 'primeng/primeng';
// import {GMapModule} from 'primeng/primeng';
import {
  GrowlModule
} from 'primeng/components/growl/growl';
import {
  InputMaskModule
} from 'primeng/components/inputmask/inputmask';
// import { InputSwitchModule } from 'primeng/primeng';
import {
  InputTextModule
} from 'primeng/components/inputtext/inputtext';
import {
  InputTextareaModule
} from 'primeng/components/inputtextarea/inputtextarea';
// import { LightboxModule } from 'primeng/primeng';
// import { ListboxModule } from 'primeng/primeng';
// import { MegaMenuModule } from 'primeng/primeng';
// import { MenuModule } from 'primeng/primeng';
// import { MenubarModule } from 'primeng/primeng';
// import { MessagesModule } from 'primeng/primeng';
import {
  MultiSelectModule
} from 'primeng/components/multiselect/multiselect';
// import {OrderListModule} from 'primeng/primeng';
// import { OverlayPanelModule } from 'primeng/primeng';
import {
  PaginatorModule
} from 'primeng/components/paginator/paginator';
import {
  PanelModule
} from 'primeng/components/panel/panel';
// import { PanelMenuModule } from 'primeng/primeng';
import {
  PasswordModule
} from 'primeng/components/password/password';
// import { PickListModule } from 'primeng/primeng';
// import { ProgressBarModule } from 'primeng/primeng';
// import { RadioButtonModule } from 'primeng/primeng';
// import {RatingModule} from 'primeng/primeng';
import {
  ScheduleModule
} from 'primeng/components/schedule/schedule';
// import { SelectButtonModule } from 'primeng/primeng';
// import { SlideMenuModule } from 'primeng/primeng';
// import {SliderModule} from 'primeng/primeng';
// import { SpinnerModule }  from 'primeng/primeng';
// import { SplitButtonModule } from 'primeng/primeng';
// import { TabMenuModule } from 'primeng/primeng';
// import {TabViewModule} from 'primeng/primeng';
// import {TerminalModule} from 'primeng/primeng';
// import {TieredMenuModule} from 'primeng/primeng';
// import {ToggleButtonModule} from 'primeng/primeng';
// import {ToolbarModule} from 'primeng/primeng';
// import {TooltipModule} from 'primeng/primeng';
// import {
//   CarouselModule
// } from 'primeng/primeng';
import {
  TreeModule
} from 'primeng/components/tree/tree';
import {
  TreeTableModule
} from 'primeng/components/treetable/treetable';

// Import Angular JWT

import {
  provideAuth,
  AuthHttp,
  AuthConfig
} from 'angular2-jwt';

// Declarations 

import {
  NoContentComponent
} from './no-content';
import {
  StreetComponent
} from './street';
import {
  AreaComponent
} from './area';
import {
  SettlementComponent
} from './settlement';
import {
  RegionComponent
} from './region';
import {
  BranchComponent
} from './branch';
import {
  ManagerComponent
} from './manager';
import {
  UserComponent
} from './user';
import {
  CompanyComponent
} from './company';
import {
  MasterComponent
} from './master';
import {
  ServiceComponent
} from './service';
import {
  BidComponent
} from './bid';
import {
  MasterDetailComponent
} from './master-detail';
import {
  LoginComponent
} from './login';
import {
  DashboardComponent
} from './dashboard';
import {
  SettingComponent
} from './setting';
import {
  MasterTaskComponent
} from './master-task';
import {
  LandingComponent
} from './landing';
import {
  CallComponent
} from './call';
import {
  MessageComponent
} from './message';
import {
  BinotelComponent
} from './binotel';
import {
  TruncatePipe
} from './landing/truncate.pipe';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    tokenName: 'id_token',
    tokenGetter: (() => localStorage.getItem('id_token')),
    globalHeaders: [{
      'Accept': 'application/json;q=0.9'
    }],
    noJwtError: true,
    noTokenScheme: true
  }), http, options);
}


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NoContentComponent,
    StreetComponent,
    AreaComponent,
    SettlementComponent,
    RegionComponent,
    BranchComponent,
    ManagerComponent,
    UserComponent,
    CompanyComponent,
    MasterComponent,
    ServiceComponent,
    BidComponent,
    MasterDetailComponent,
    LoginComponent,
    DashboardComponent,
    SettingComponent,
    MasterTaskComponent,
    LandingComponent,
    CallComponent,
    MessageComponent,
    TruncatePipe,
    BinotelComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    // Ultima Starter
    // BrowserModule,
    // FormsModule,a.
    //  AppRoutes,
    // HttpModule,
    // AccordionModule,
    AutoCompleteModule,
    // BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    // CarouselModule,
    // ChartModule,
    CheckboxModule,
    // CodeHighlighterModule,
    ConfirmDialogModule,
    // SharedModule,
    ContextMenuModule,
    // DataGridModule,
    DataListModule,
    // DataScrollerModule,
    DataTableModule,
    DialogModule,
    // DragDropModule,
    DropdownModule,
    // EditorModule,
    // FieldsetModule,
    // FileUploadModule,
    // GalleriaModule,
    // GMapModule,
    GrowlModule,
    InputMaskModule,
    // InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    // LightboxModule,
    // ListboxModule,
    // MegaMenuModule,
    // MenuModule,
    // MenubarModule,
    // MessagesModule,
    MultiSelectModule,
    // OrderListModule,
    // OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    // PanelMenuModule,
    PasswordModule,
    // PickListModule,
    // ProgressBarModule,
    // RadioButtonModule,
    // RatingModule,
    ScheduleModule,
    // SelectButtonModule,
    // SlideMenuModule,
    // SliderModule,
    // SpinnerModule,
    // SplitButtonModule,
    // TabMenuModule,
    // TabViewModule,
    // TerminalModule,
    // TieredMenuModule,
    // ToggleButtonModule,
    // ToolbarModule,
    // TooltipModule,
    TreeModule,
    TreeTableModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    Ng2PageScrollModule.forRoot(),
  ],
  providers: [
    APP_PROVIDERS,
    StreetService, AreaService, SettlementService, RegionService, BranchService, LoginService, AuthGuard,
    // provideAuth({
    //   headerName: 'Authorization',
    //   headerPrefix: 'Bearer',
    //   tokenName: 'id_token',
    //   tokenGetter: (() => localStorage.getItem('id_token')),
    //   globalHeaders: [{
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }, {
    //     'Accept': 'application/json;q=0.9'
    //   }],
    //   noJwtError: true,
    //   noTokenScheme: true
    // })
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}
}
