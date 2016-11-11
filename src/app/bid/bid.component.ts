import {
  Component,
  OnInit
} from '@angular/core';

import {
  BidService
} from './bid.service';

import {
  Message,
  MenuItem,
  SelectItem
} from 'primeng/primeng';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss'],
  providers: [
    BidService
  ]
})

export class BidComponent implements OnInit {

  // Classes
  pag: Paginate = new NewPaginate();
  searchBid: Bid = new NewBid();

  // PrimeNG
  items: any;
  msgs: Message[];
  tieredItems: MenuItem[];

  dialog: boolean;
  resCRUD: any;

  constructor(private bidService: BidService) {}

  ngOnInit() {
    this.getBids(this.pag.curr);
  }

  getBids(page: number, id ?: any, fio ?: any, phone ?: any) {
    this.bidService
      .getBids(this.pag.curr, this.searchBid.id, this.searchBid.fio, this.searchBid.phone)
      .subscribe(
        data => {
          this.items = data[0].json.data;
          this.pag.count = data[0].json['total-count'];
        },
        err => console.error(err),
        // () => console.log('GET Bids')
      );
  }

  showDialog() {
    this.dialog = true;
  }

}

export interface Bid {
  id ? : any;
  address ? : any;
  manager ? : any;
  service ? : any;
  fio ? : any;
  phone ? : any;
  master ? : any;
  contact_person ? : any;
  status ? : any;
  description ? : any;
  created_at ? : any;
}


class NewBid implements Bid {
  constructor(public id ? : any, public address ? : any, public manager ? : any, public service ? : any,
    public fio ? : any, public phone ? : any, public master ? : any, public contact_person ? : any,
    public status ? : any, public description ? : any,
    public created_at ? : any) {}
}

export interface Search {
  complete ?: SelectItem[];
  result ?: [number];
  id ?: number;
}

class SearchRegion implements Search {
  constructor(public complete ?: SelectItem[], public result ?: [number], public id ?: number) {}
}

export interface Paginate {
  count ?: string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ?: string[], public curr = 1) {}
}
