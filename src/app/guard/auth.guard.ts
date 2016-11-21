import {
  Injectable
} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {
  JwtHelper
} from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  jwtHelper: JwtHelper = new JwtHelper();
  token: string;

  constructor(private router: Router) {}

  getToken() {
    this.token = localStorage.getItem('id_token');
  }

  canActivate(route ? : ActivatedRouteSnapshot, state ? : RouterStateSnapshot): boolean {

    this.getToken();

    if (this.token) {

      console.log(this.jwtHelper.decodeToken(this.token));

      let roles = route.data['roles'] as Array < string > ,
        role = this.jwtHelper.decodeToken(this.token).rol;

      switch (roles !== null) {
        case (roles.indexOf('admin') !== -1 && role === 'admin'):
          return true;
        case (roles.indexOf('manager') !== -1 && role === 'manager'):
          return true;
        case (roles.indexOf('client') !== -1 && role === 'client'):
          return true;
        default:
          return false;
      }

    }

    // if ((roles == null || roles.indexOf('admin') !== -1)) {
    //   // console.log('auth 2');
    //   this.role.admin = true;
    //   // return true;
    // } else {
    //   this.router.navigate(['/']);
    //   console.log('auth 1');
    //   return false;
    // }


    this.router.navigate(['/']);
    console.log('auth');
    return false;

  }

}
