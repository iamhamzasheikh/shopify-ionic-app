import { Component } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {

  products = [
    { name: 'Product 1', description: 'Lorem ipsum dolor sit amet consectetur.', color: 'Pink', size: 'M', quantity: 1, image: '../../assets/cart1.png' },
    { name: 'Product 2', description: 'Adipisicing elit.', color: 'Blue', size: 'L', quantity: 1, image: '../../assets/cart2.png' },
  ];

  constructor() { }

  decrement(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  increment(product: any) {
    product.quantity++;
  }
}
