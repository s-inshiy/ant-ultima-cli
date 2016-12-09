import {
  Injectable
} from '@angular/core';
import {
  Response,
  RequestOptionsArgs
} from '@angular/http';
import {
  Router
} from '@angular/router';
import {
  AuthHttp as JwtAuthHttp
} from 'angular2-jwt';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class SettingService {

constructor(public authHttp: JwtAuthHttp, private router: Router) {}

  private isUnauthorized(status: number): boolean {
    return status === 0 || status === 401 || status === 403;
  }

  private authIntercept(response: Observable < Response > ): Observable < Response > {
    let sharableResponse = response.share();
    sharableResponse.subscribe(null, (err) => {
      if (this.isUnauthorized(err.status)) {
        this.router.navigate(['/login']);
      }
    });
    return sharableResponse;
  }

  public get(url: string, options ? : RequestOptionsArgs): Observable < Response > {
    return this.authIntercept(this.authHttp.get(url, options));
  }

  public post(url: string, body: any, options ?: RequestOptionsArgs): Observable < Response > {
    return this.authIntercept(this.authHttp.post(url, body, options));
  }

  // Address

  getAddress() {
    let crmUrl = 'http://crm.unicweb.com.ua/api/addresses';
    return this.get(crmUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchStreet(query: string) {
    let areaUrl = 'http://crm.unicweb.com.ua/ajax/search/streets',
      areaQuery = `?q=${query}`;

    return this.get(areaUrl + areaQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });

  }

  createAddress(street_id = '' , house = '', is_default: boolean, description = '', areaId= '') {
    let createUrl = 'http://crm.unicweb.com.ua/api/addresses/create',
      body = '&street_id=' + street_id + '&house=' + house + '&is_default='
      + is_default + '&description=' + description + '&area_id=' + areaId;

    return this.post(createUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteAddress(addressId: any) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/addresses/delete',
      deleteId = '?id=' + addressId;

    return this.post(deleteUrl + deleteId, '')
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }

  // Phone

  getPhones() {
    let phoneUrl = 'http://crm.unicweb.com.ua/api/phones';

    return this.get(phoneUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createPhone(phone: any) {
    let phoneUrl = 'http://crm.unicweb.com.ua/api/phones/create',
      body = '&phone=' + encodeURIComponent(phone);

    return this.post(phoneUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deletePhone(phoneId: any) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/phones/delete',
      deleteId = '?id=' + phoneId;

    return this.post(deleteUrl + deleteId, '')
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }

  // Account

  getAccount() {
    let accountUrl = 'http://crm.unicweb.com.ua/api/settings/account';

    return this.get(accountUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateAccount(username = '', email = '', password = '') {
    let accountUrl = 'http://crm.unicweb.com.ua/api/settings/account',
      body = '&username=' + username + '&email=' + email + '&password=' + password;

    return this.post(accountUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  // Profile

  getProfile() {
    let profileUrl = 'http://crm.unicweb.com.ua/api/settings/profile';
    return this.get(profileUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateProfile(firstName = '', secondName = '', patronymic = '', phone = '', skype = '', birthday = '') {
    let profileUrl = 'http://crm.unicweb.com.ua/api/settings/profile',
      body = '&first_name=' + firstName + '&second_name=' + secondName +
       '&patronymic=' + patronymic + '&phone=' + encodeURIComponent(phone) + '&skype=' + skype + '&birthday=' + birthday;

    return this.post(profileUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  searchAreas(query = '', areasIds: number[] | string = '') {
    let areaUrl = 'http://crm.unicweb.com.ua/ajax/search/areas',
      areaQuery = '?q=' + query + '&not_id=' + areasIds;

    return this.get(areaUrl + areaQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

}
