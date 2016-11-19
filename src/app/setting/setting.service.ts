import {
  Injectable
} from '@angular/core';
import {
  Response,
} from '@angular/http';
import {
  AuthHttp
} from 'angular2-jwt';

@Injectable()
export class SettingService {

  constructor(public authHttp: AuthHttp) {}

  // Address

  getAddress() {
    let crmUrl = 'http://crm.unicweb.com.ua/api/addresses';
    return this.authHttp.get(crmUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchStreet(query: string) {
    let areaUrl = 'http://crm.unicweb.com.ua/ajax/search/streets',
      areaQuery = `?q=${query}`;

    return this.authHttp.get(areaUrl + areaQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });

  }

  createAddress(street_id = '' , house = '', is_default: boolean, description = '') {
    let createUrl = 'http://crm.unicweb.com.ua/api/addresses/create',
      body = '&street_id=' + street_id + '&house=' + house + '&is_default=' + is_default + '&description=' + description;

    return this.authHttp.post(createUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteAddress(addressId: any) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/addresses/delete',
      deleteId = '?id=' + addressId;

    return this.authHttp.post(deleteUrl + deleteId, '')
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }

  // Phone

  getPhones() {
    let phoneUrl = 'http://crm.unicweb.com.ua/api/phones';

    return this.authHttp.get(phoneUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createPhone(phone: any) {
    let phoneUrl = 'http://crm.unicweb.com.ua/api/phones/create',
      body = '&phone=' + encodeURIComponent(phone);

    return this.authHttp.post(phoneUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  // Account

  getAccount() {
    let accountUrl = 'http://crm.unicweb.com.ua/api/settings/account';

    return this.authHttp.get(accountUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateAccount(username = '', email = '', password = '') {
    let accountUrl = 'http://crm.unicweb.com.ua/api/settings/account',
      body = '&username=' + username + '&email=' + email + '&password=' + password;

    return this.authHttp.post(accountUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  // Profile

  getProfile() {
    let profileUrl = 'http://crm.unicweb.com.ua/api/settings/profile';
    return this.authHttp.get(profileUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateProfile(firstName = '', secondName = '', patronymic = '', phone = '', skype = '', birthday = '') {
    let profileUrl = 'http://crm.unicweb.com.ua/api/settings/profile',
      body = '&first_name=' + firstName + '&second_name=' + secondName +
       '&patronymic=' + patronymic + '&phone=' + encodeURIComponent(phone) + '&skype=' + skype + '&birthday=' + birthday;

    return this.authHttp.post(profileUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
