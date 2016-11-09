import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
// import { TranslateModule } from 'ng2-translate';
// import { ENV_PROVIDERS } from './environment';

import { routes } from './app.routes';
import { Application } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';


// Services
import { StreetService } from './street/street.service';
import { AreaService } from './area/area.service';
import { SettlementService } from './settlement/settlement.service';
import { RegionService } from './region/region.service';
import { BranchService } from './branch/branch.service';

import { CarService } from './ultima/service/carservice';
import { CountryService } from './ultima/service/countryservice';
import { EventService } from './ultima/service/eventservice';
import { NodeService } from './ultima/service/nodeservice';

// PrimeNG
import { AccordionModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
// import { BreadcrumbModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
// import {CalendarModule} from 'primeng/primeng';
// import {CarouselModule} from 'primeng/primeng';
// import {ChartModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
// import {CodeHighlighterModule} from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
// import { DataGridModule } from 'primeng/primeng';
// import { DataListModule } from 'primeng/primeng';
// import { DataScrollerModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
// import {DragDropModule} from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
// import {EditorModule} from 'primeng/primeng';
// import { FieldsetModule } from 'primeng/primeng';
// import {FileUploadModule} from 'primeng/primeng';
// import {GalleriaModule} from 'primeng/primeng';
// import {GMapModule} from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
// import { InputSwitchModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
// import { LightboxModule } from 'primeng/primeng';
// import { ListboxModule } from 'primeng/primeng';
// import { MegaMenuModule } from 'primeng/primeng';
// import { MenuModule } from 'primeng/primeng';
// import { MenubarModule } from 'primeng/primeng';
// import { MessagesModule } from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
// import {OrderListModule} from 'primeng/primeng';
// import { OverlayPanelModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
// import { PanelModule } from 'primeng/primeng';
// import { PanelMenuModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
// import { PickListModule } from 'primeng/primeng';
// import { ProgressBarModule } from 'primeng/primeng';
// import { RadioButtonModule } from 'primeng/primeng';
// import {RatingModule} from 'primeng/primeng';
// import {ScheduleModule} from 'primeng/primeng';
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
import {TreeModule} from 'primeng/primeng';
import {TreeTableModule} from 'primeng/primeng';

// Ultima
// import {DashboardDemo} from './ultima/view/dashboarddemo';
// import {SampleDemo} from './ultima/view/sampledemo';
// import {FormsDemo} from './ultima/view/formsdemo';
// import {DataDemo} from './ultima/view/datademo';
// import {PanelsDemo} from './ultima/view/panelsdemo';
// import {OverlaysDemo} from './ultima/view/overlaysdemo';
// import {MenusDemo} from './ultima/view/menusdemo';
// import {MessagesDemo} from './ultima/view/messagesdemo';
// import {MiscDemo} from './ultima/view/miscdemo';
// import {EmptyDemo} from './ultima/view/emptydemo';
// import {ChartsDemo} from './ultima/view/chartsdemo';
// import {FileDemo} from './ultima/view/filedemo';
import { UtilsDemo } from './ultima/view/utilsdemo';
import { Documentation } from './ultima/view/documentation';
// import { MenuItem } from 'primeng/primeng';


import { NoContentComponent } from './no-content';
import { StreetComponent } from './street';
import { AreaComponent } from './area';
import { SettlementComponent } from './settlement';
import { RegionComponent } from './region';
import { BranchComponent } from './branch';
import { ManagerComponent } from './manager/manager.component';
import { UserComponent } from './user/user.component';
import { CompanyComponent } from './company/company.component';
import { MasterComponent } from './master/master.component';
import { ServiceComponent } from './service/service.component';
import { BidComponent } from './bid/bid.component';
import { MasterDetailComponent } from './master-detail/master-detail.component';


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
  bootstrap: [ Application ],
  declarations: [
    Application,
    UtilsDemo,
    Documentation,
    NoContentComponent,
    // DashboardDemo,
    // SampleDemo,
    // FormsDemo,
    // DataDemo,
    // PanelsDemo,
    // OverlaysDemo,
    // MenusDemo,
    // MessagesDemo,
    // MiscDemo,
    // ChartsDemo,
    // EmptyDemo,
    // FileDemo,
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
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    // Ultima Starter
    // BrowserModule,
    // FormsModule,a.
    //  AppRoutes,
    HttpModule,
    AccordionModule,
    AutoCompleteModule,
    // BreadcrumbModule,
    ButtonModule,
    // CalendarModule,
    // CarouselModule,
    // ChartModule,
    CheckboxModule,
    // CodeHighlighterModule,
    ConfirmDialogModule,
    SharedModule,
    ContextMenuModule,
    // DataGridModule,
    // DataListModule,
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
    // PanelModule,
    // PanelMenuModule,
    PasswordModule,
    // PickListModule,
    // ProgressBarModule,
    // RadioButtonModule,
    // RatingModule,
    // ScheduleModule,
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
    // MenuItem,
    // TranslateModule.forRoot({
    //       provide: TranslateLoader,
    //       useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
    //       deps: [Http] 
    //   }),
    RouterModule.forRoot(routes, { useHash: true }),
    // TranslateModule.forRoot()
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    // ENV_PROVIDERS,
    APP_PROVIDERS,
    CarService, CountryService, EventService, NodeService,
     StreetService, AreaService, SettlementService, RegionService, BranchService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  // hmrOnInit(store: StoreType) {
  //   if (!store || !store.state) return;
  //   console.log('HMR store', JSON.stringify(store, null, 2));
  //   // set state
  //   this.appState._state = store.state;
  //   // set input values
  //   if ('restoreInputValues' in store) {
  //     let restoreInputValues = store.restoreInputValues;
  //     setTimeout(restoreInputValues);
  //   }

  //   this.appRef.tick();
  //   delete store.state;
  //   delete store.restoreInputValues;
  // }

  // hmrOnDestroy(store: StoreType) {
  //   const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
  //   // save state
  //   const state = this.appState._state;
  //   store.state = state;
  //   // recreate root elements
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   // save input values
  //   store.restoreInputValues  = createInputTransfer();
  //   // remove styles
  //   removeNgStyles();
  // }

  // hmrAfterDestroy(store: StoreType) {
  //   // display new elements
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }

}

