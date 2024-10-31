import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
  selectedSegment: string = 'shipped';
  cartProducts: any[] = [];
  deliveredProducts: any[] = [];

  constructor(private globalService: GlobalService) {
    // Subscribe to cart products
    this.globalService.cartProducts$.subscribe(products => {
      this.cartProducts = products;
    });

    // Subscribe to delivered products
    this.globalService.deliveredProducts$.subscribe(products => {
      this.deliveredProducts = products;
    });
  }

  ngOnInit() {
    // Initial load not needed due to subscriptions
  }

  changeStatus(item: any) {
    this.globalService.moveToDelivered(item);
  }

  removeDeliveredItem(item: any) {
    this.globalService.removeDeliveredItem(item);
  }
}