import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  FormsModule
} from '@angular/forms';
import {
  HttpModule
} from '@angular/http';
import {
  RouterModule
} from '@angular/router';

import {
  AdminComponent
} from './admin.component';

import {
  routes
} from './admin.routes';

// import {
//   APP_RESOLVER_PROVIDERS
// } from './admin.resolver';

 // Application wide providers
// const APP_PROVIDERS = [
//   ...APP_RESOLVER_PROVIDERS,
// ];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes],
  declarations: [AdminComponent],
  // providers: [
  //   APP_PROVIDERS
  // ],
    exports: [
    RouterModule
  ]
 })

export class AdminModule {}
