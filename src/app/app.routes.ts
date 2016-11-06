// import { Routes, RouterModule } from '@angular/router';
// import { Home } from './home';
// import { About } from './about';
import { StreetComponent } from './street';
import { AreaComponent } from './area';
import { SettlementComponent } from './settlement';
import { RegionComponent } from './region';
import { BranchComponent } from './branch';
import { NoContentComponent } from './no-content';
// import { DataResolver } from './app.resolver';

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
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

export const routes: Routes = [
    // {path: '', component: DashboardDemo},
    // {path: 'sample', component: SampleDemo},
    // {path: 'forms', component: FormsDemo},
    // {path: 'data', component: DataDemo},
    // {path: 'panels', component: PanelsDemo},
    // {path: 'overlays', component: OverlaysDemo},
    // {path: 'menus', component: MenusDemo},
    // {path: 'messages', component: MessagesDemo},
    // {path: 'misc', component: MiscDemo},
    // {path: 'empty', component: EmptyDemo},
    // {path: 'charts', component: ChartsDemo},
    // {path: 'file', component: FileDemo},
    {path: 'utils', component: UtilsDemo},
    {path: 'documentation', component: Documentation},
    {path: 'streets',    component: StreetComponent},
    {path: 'areas', component: AreaComponent},
    {path: 'settlements', component: SettlementComponent},
    {path: 'regions', component: RegionComponent},
    {path: 'branches', component:  BranchComponent},
    {path: '**',    component: NoContentComponent }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
