import {
  Component,
  OnInit
} from '@angular/core';
import {
  ServiceService
} from './service.service';
import {
  Message,
  // MenuItem,
  TreeNode
} from 'primeng/primeng';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  providers: [
    ServiceService
  ]
})
export class ServiceComponent implements OnInit {

  // Classses
  parent = new SearchService();
  service = new NewService();

  // PrimeNG
  items: TreeNode[];
  msgs: Message[];

  dialog: boolean;
  resCRUD: any;
  checked: boolean = true;

  constructor(private serviceService: ServiceService) {}

  ngOnInit() {
    this.getServices();
  }

  showDialog() {
    this.dialog = true;
  }

  nodeSelected(event: any) {
    this.service = event.node.data;
    console.log(this.service);
  }

  getServices() {
    this.serviceService
      .getServices()
      .subscribe(
        data => {
          this.items = data[0].json;
        },
        err => console.error(err),
        // () => {
        //   console.log('GET Tree!');
        // }
      );
  }

  searchService(event: any) {
    this.serviceService
      .searchService(event.query)
      .subscribe(
        data => {
          this.parent.result = data[0].search.results;
        },
        err => console.error(err),
        () => {
          // console.log(this.resCRUD);
        }
      );
  }

  createCategory(name: string, parentId: number, description: string) {
    this.serviceService
      .createCategory(this.service.name, this.parent.id, this.service.description)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getServices();
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Категория создана',
              detail: this.service.name
            });
            this.service = new NewService();
            this.parent = new SearchService();
          }
          for (let i = 0; i < this.resCRUD.errors.length; i++) {
            this.msgs.push({
              severity: 'error',
              summary: 'Ошибка',
              detail: this.resCRUD.errors[i]
            });
          }
        }
      );
  }

  createWork(name: string, categoryId: number, description: string) {
    this.serviceService
      .createWork(this.service.name, this.parent.id, this.service.description)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          console.log(this.resCRUD);
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getServices();
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Услуга добавлена',
              detail: this.service.name
            });
            this.service = new NewService();
            this.parent = new SearchService();
          }
          for (let i = 0; i < this.resCRUD.errors.length; i++) {
            this.msgs.push({
              severity: 'error',
              summary: 'Ошибка',
              detail: this.resCRUD.errors[i]
            });
          }
        }
      );
  }

  createService(checked: boolean) {
    this.checked ? this.createWork(this.service.name, this.service.parentId, this.service.description) :
      this.createCategory(this.service.name, this.service.parentId, this.service.description);
  }

  deleteCategory(id: number) {
    this.serviceService
      .deleteCategory(this.service.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Категория удалена',
            detail: this.service.name
          });
          this.service = new NewService();
          this.parent = new SearchService();
          this.getServices();
        }
      );
  }

  deleteWork(id: number) {
    this.serviceService
      .deleteWork(this.service.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Услуга  удалена',
            detail: this.service.name
          });
          this.service = new NewService();
          this.parent = new SearchService();
          this.getServices();
        }
      );
  }

  deleteService(type: string, id: number) {
    type === 'Категория' ? this.deleteCategory(id) : this.deleteWork(id);
    // if (type === 'Тип работ') {
    //   this.deleteWork(id);
    // } else {
    //   this.msgs = [];
    //   this.msgs.push({
    //     severity: 'error',
    //     summary: 'Ошибка',
    //     detail: 'Невозможно удалить родительскую категорию'
    //   });
    // }
  }

  updateWork(id: number, name: string, description: string) {
    this.serviceService
      .updateWork(this.service.id, this.service.name, this.service.description)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getServices();
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Услуга обновленна',
              detail: this.service.name
            });
            this.service = new NewService();
            this.parent = new SearchService();
          }
          for (let i = 0; i < this.resCRUD.errors.length; i++) {
            this.msgs.push({
              severity: 'error',
              summary: 'Ошибка',
              detail: this.resCRUD.errors[i]
            });
          }
        }
      );
  }

  updateCategory(id: number, name: string, description: string) {
    this.serviceService
      .updateCategory(this.service.id, this.service.name, this.service.description)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          console.log(this.resCRUD);
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getServices();
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Категория обновленна',
              detail: this.service.name
            });
            this.service = new NewService();
            this.parent = new SearchService();
          }
          for (let i = 0; i < this.resCRUD.errors.length; i++) {
            this.msgs.push({
              severity: 'error',
              summary: 'Ошибка',
              detail: this.resCRUD.errors[i]
            });
          }
        }
      );
  }

  updateService(id: number, name: string, description: string, type: string) {
    type === 'Категория' ? this.updateCategory(id, name, description) : this.updateWork(id, name, description);
    // if (type === 'Тип работ') {
    //   this.updateWork(id, name, description);
    // } else {
    //   this.msgs = [];
    //   this.msgs.push({
    //     severity: 'error',
    //     summary: 'Ошибка',
    //     detail: 'Невозможно редактироватьы родительскую категорию'
    //   });
    // }
  }

}

export interface Service {
  id ? : number;
  parentId ? : number;
  name ? : string;
  description ? : string;
  type ? : string;
}

class NewService implements Service {
  constructor(public id ? : number, public parentId ? : number,
    public name ? : string, public description ? : string, public type ? : string) {}
}

export interface Search {
  id ? : number;
  complete ? : string;
  result ? : any[];
}

class SearchService implements Search {
  constructor(public id ? : number, public complete ? : string, public result ? : string[]) {}
}
