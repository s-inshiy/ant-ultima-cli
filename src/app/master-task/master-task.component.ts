import {
  Component,
  OnInit
} from '@angular/core';

import {
  MasterTaskService
} from './master-task.service';

import {
  Message,
  MenuItem
} from 'primeng/components/common/api';

import {
  JwtHelper
} from 'angular2-jwt';

@Component({
  selector: 'app-master-task',
  templateUrl: './master-task.component.html',
  styleUrls: ['./master-task.component.scss'],
  providers: [
    MasterTaskService
  ]
})
export class MasterTaskComponent implements OnInit {

  tasks: any[];
  token: string;
  role: string;
  msgs: Message[];
  tieredItems: MenuItem[];
  pag: Paginate = new NewPaginate();
  task: Task = new NewTask();
  jwtHelper: JwtHelper = new JwtHelper();
  resCRUD: any;

  constructor(private masterTaskService: MasterTaskService) {}

  ngOnInit() {
    this.getTasks(this.pag.curr);
    this.getToken();
    // ContextMenu
    if (this.role === 'master') {
      this.tieredItems = [{
        label: 'Выполнено',
        icon: 'fa ui-icon-add',
        command: (event) => this.setMasDone(this.task.id)
      }];
    } else {
      this.tieredItems = [{
        label: 'Выполнено',
        icon: 'fa ui-icon-add',
        command: (event) => this.setManDone(this.task.id)
      }];
    }
  }

  getToken() {
    this.token = localStorage.getItem('id_token');
    this.role = this.jwtHelper.decodeToken(this.token).rol;
  }


  onRowSelect(event: any) {
    this.task.id = event.data.id;
  }

  onRowUnselect(event: any) {
    this.task = new NewTask();
  }

  getTasks(page: number) {
    this.masterTaskService
      .getTasks(this.pag.curr)
      .subscribe(
        data => {
          this.tasks = data[0].json.data;
          this.pag.count = data[0].json['total-count'];
        },
        err => console.log(err),
        // () => console.log(this.tasks)
      );
  }

  setMasDone(id: number) {
    this.masterTaskService
      .setMasDone(this.task.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json.data;
        },
        err => console.log(err),
        () => {
          this.msgs = [];
          // if (this.resCRUD.errors.length < 1) {
          this.getTasks(this.pag.curr);
          this.msgs.push({
            severity: 'info',
            summary: 'Задание выполнено',
            detail: 'Задание выполнено'
          });
          // }
          // for (let i = 0; i < this.resCRUD.errors.length; i++) {
          //   this.msgs.push({
          //     severity: 'error',
          //     summary: 'Ошибка',
          //     detail: this.resCRUD.errors[i]
          //   });
          // }
        }
      );
  }

  setManDone(id: number) {
    this.masterTaskService
      .setManDone(this.task.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json.data;
        },
        err => console.log(err),
        () => {
          this.msgs = [];
          // if (this.resCRUD.errors.length < 1) {
          this.getTasks(this.pag.curr);
          this.msgs.push({
            severity: 'info',
            summary: 'Задание выполнено',
            detail: 'Задание выполнено'
          });
          // }
          // for (let i = 0; i < this.resCRUD.errors.length; i++) {
          //   this.msgs.push({
          //     severity: 'error',
          //     summary: 'Ошибка',
          //     detail: this.resCRUD.errors[i]
          //   });
          // }
        }
      );
  }


}

export interface Task {
  id ? : any;
  title ? : any;
  allDay ? : any;
  master ? : any;
  start ? : any;
  end ? : any;
  urlData ? : any;
  status ? : any;
}

class NewTask implements Task {
  constructor(public id ? : number, public title ? : string, allDay ? : string, ) {}
}

export interface Paginate {
  count ? : string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ? : string[], public curr = 1) {}
}
