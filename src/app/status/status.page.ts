import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
  selectedSegment: string = 'shipped';
  cartProducts: any[] = []; // Array to hold all products
  deliveredProducts: any[] = []; // New array for delivered products

  constructor(private globalService: GlobalService) {}

  ngOnInit() {
    // Fetch all products from the global service
    this.cartProducts = this.globalService.getCartProducts();
  }

  // Method to handle status change
  changeStatus(item: any) {
    // Remove item from cartProducts and add to deliveredProducts
    this.cartProducts = this.cartProducts.filter(cartItem => cartItem !== item);
    this.deliveredProducts.push(item);
  }
}
