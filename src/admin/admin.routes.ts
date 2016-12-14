import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ModuleWithProviders
} from '@angular/core';
import {
  AdminComponent
} from './admin.component';

export const routes: Routes = [{
  path: '',
  component: AdminComponent
}];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
