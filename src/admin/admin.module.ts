import {
  NgModule
} from '@angular/core';

import {
  AdminComponent
} from './admin.component';

import {
  routing
} from './admin.routes';

@NgModule({
  imports: [
    routing
  ],
  declarations: [AdminComponent]
})

export class AdminModule {}
