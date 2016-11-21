import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ModuleWithProviders
} from '@angular/core';

//  Custom Component
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
  UserComponent
} from './user';
import {
  ManagerComponent
} from './manager';
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
  NoContentComponent
} from './no-content';
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
  BidComponent
} from './bid';
import {
  AuthGuard
} from './guard';
import {
  SettingComponent
} from './setting';

export const routes: Routes = [{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'manager', 'client']
    },
    //  Admin Routes
    children: [{
      path: '',
      redirectTo: 'users',
      pathMatch: 'full'
    }, {
      path: 'streets',
      component: StreetComponent,
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'areas',
      component: AreaComponent,
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'settlements',
      component: SettlementComponent,
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'regions',
      component: RegionComponent,
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'branches',
      component: BranchComponent,
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'users',
      component: UserComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'managers',
      component: ManagerComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['admin']
      },
    }, {
      path: 'companies',
      component: CompanyComponent,
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'masters',
      component: MasterComponent,
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'services',
      component: ServiceComponent,
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'master/:id',
      component: MasterDetailComponent,
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'bids',
      component: BidComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['admin', 'manager', 'client']
      }
    }, {
      path: 'settings',
      component: SettingComponent,
      data: {
        roles: ['admin', 'manager', 'client']
      },
    }]
  }
  //  Root Routes
  , {
    path: '',
    component: LoginComponent,
  }, {
    path: '**',
    component: NoContentComponent
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
