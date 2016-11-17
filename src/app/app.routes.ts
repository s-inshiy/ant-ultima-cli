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
  ClientBidComponent
} from './client-bid';
import {
  ClientComponent
} from './client';
import {
  SettingComponent
} from './setting';

export const routes: Routes = [{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'manager']
    },
    //  Admin Routes
    children: [{
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      }, {
        path: 'streets',
        component: StreetComponent
      }, {
        path: 'areas',
        component: AreaComponent
      }, {
        path: 'settlements',
        component: SettlementComponent
      }, {
        path: 'regions',
        component: RegionComponent
      }, {
        path: 'branches',
        component: BranchComponent
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
        component: CompanyComponent
      }, {
        path: 'masters',
        component: MasterComponent
      }, {
        path: 'services',
        component: ServiceComponent
      }, {
        path: 'master/:id',
        component: MasterDetailComponent
      }, {
        path: 'bids',
        component: BidComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin', 'manager']
        }
      }, {
        path: 'settings',
        component: SettingComponent
      },
      //  Client Routes
      {
        path: 'client',
        component: ClientComponent,
        children: [{
          path: '',
          redirectTo: 'bids',
          pathMatch: 'full'
        }, {
          path: 'bids',
          component: ClientBidComponent
        }
        ]
      }
    ]
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
