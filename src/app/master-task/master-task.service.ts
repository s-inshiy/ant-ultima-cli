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
export class MasterTaskService {

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

  getTasks(page: number) {
    let tasksUrl = 'http://crm.unicweb.com.ua/api/shedules',
      areasQuery = `?per-page=20&page=${page}`;

    return this.get(tasksUrl + areasQuery).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  setMasDone(taskId: number) {
    let tasksUrl = 'http://crm.unicweb.com.ua/api/shedules/pending?',
      id = 'id=' + taskId;

    return this.get(tasksUrl + id).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });

  }

    setManDone(taskId: number) {
    let tasksUrl = 'http://crm.unicweb.com.ua/api/shedules/done?',
      id = 'id=' + taskId;

    return this.get(tasksUrl + id).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }


}
