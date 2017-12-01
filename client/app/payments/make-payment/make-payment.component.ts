import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MakePaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openCheckout() {
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_Xir69NM5BVMfBBDDxKhFceuW',
      locale: 'es',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 2000
    });

  }

}
