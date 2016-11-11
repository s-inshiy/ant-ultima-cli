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
  token = localStorage.getItem('id_token');

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.token) {
      // console.log(this.jwtHelper.decodeToken(this.token));
      let rol = this.jwtHelper.decodeToken(this.token).rol;
      let roles = route.data['roles'] as Array < string > ;

      if ((roles == null || roles.indexOf(rol) !== -1)) {
        console.log('auth 2');
        return true;
      } else {
        this.router.navigate(['/']);
        console.log('auth 1');
        return false;
      }
    }

    this.router.navigate(['/']);
    console.log('auth');
    return false;

  }

}
