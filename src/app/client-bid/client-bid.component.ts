import {
  Component,
  OnInit
} from '@angular/core';

import {
  Message,
  MenuItem
} from 'primeng/primeng';

import {
  ClientBidService
} from './client-bid.service';

@Component({
  selector: 'app-client-bid',
  templateUrl: './client-bid.component.html',
  styleUrls: ['./client-bid.component.scss'],
  providers: [
    ClientBidService
  ]
})

export class ClientBidComponent implements OnInit {

  bids: any[];

  constructor(private clientBidService: ClientBidService) {}

  ngOnInit() {
    this.getBids();
  }

  getBids() {
    this.clientBidService
      .getBids()
      .subscribe(
        data => {
          this.bids = data[0].json.data;
          console.log(this.bids);
        },
        err => console.log(err),
        // () => console.log('Customer Bids')
      );
  }

}
