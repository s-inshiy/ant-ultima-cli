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

export const routes: Routes = [{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'manager', 'client', 'master']
    },
    //  Children Routes
    children: [{
      path: '',
      redirectTo: 'bids',
      pathMatch: 'full'
    }, {
      path: 'streets',
      component: StreetComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'areas',
      component: AreaComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'settlements',
      component: SettlementComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'regions',
      component: RegionComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'branches',
      component: BranchComponent,
      canActivate: [AuthGuard],
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
      canActivate: [AuthGuard],
      component: CompanyComponent,
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'masters',
      component: MasterComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'services',
      component: ServiceComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['admin', 'manager']
      },
    }, {
      path: 'master/:id',
      component: MasterDetailComponent,
      canActivate: [AuthGuard],
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
      canActivate: [AuthGuard],
      data: {
        roles: ['admin', 'manager', 'client', 'master']
      }
    }, {
      path: 'tasks',
      component: MasterTaskComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['admin', 'master']
      }
    }, {
      path: 'calls',
      component: CallComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['admin', 'manager']
      }
    }, {
      path: 'messages',
      component: MessageComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['admin', 'manager', 'client', 'master']
      }
    }]
  }
  //  Root Routes
  , {
    path: 'login',
    component: LoginComponent,
  }, {
    path: '',
    component: LandingComponent,
  }, {
    path: '**',
    component: NoContentComponent
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
