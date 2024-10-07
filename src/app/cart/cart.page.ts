import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  products = [
    {
      name: 'Product 1', description: 'Lorem ipsum dolor sit amet consectetur.',
      color: 'Pink', size: 'M', quantity: 0,
      image: '../../assets/cart1.png', price: 19.00, totalPrice: 0.00
    },
    {
      name: 'Product 2', description: 'Adipisicing elit.',
      color: 'Blue', size: 'L', quantity: 0,
      image: '../../assets/cart2.png', price: 15.00, totalPrice: 0.00
    },
  ];

  newProductAdded: any = null;
  deliveryCharges: number = 0;
  subtotal: number = 0;
  total: number = 0;

  constructor(private router: Router, private alertService: AlertService) {
    this.calculateTotals();
  }

  goToNextPage() {
    this.router.navigate(['/payment']);
  }

  async decrement(product: any) {
    if (product.quantity > 0) {
      product.quantity--;
      this.calculateTotals();
    }

    if (product.quantity === 0) {
      await this.alertService.showQuantityZeroAlert();
      this.removeProduct(product);
    }
  }

  async increment(product: any) {
    product.quantity++;
    this.calculateTotals();

    if (product.quantity > 5) {
      await this.alertService.showQuantityLimitExceededAlert();

      if (!this.newProductAdded) {
        this.addNewProduct();
      }
    }
  }

  removeProduct(product: any) {
    this.products = this.products.filter(p => p !== product);
    this.calculateTotals();
  }

  addNewProduct() {
    this.newProductAdded = {
      name: 'New Product', description: 'A newly added product after exceeding the limit.',
      color: 'Red', size: 'S', quantity: 1,
      image: '../../assets/cart1.png', price: 20.00, totalPrice: 0.00
    };
    this.products.push(this.newProductAdded);
    this.calculateTotals();
  }

  removeNewProduct() {
    if (this.newProductAdded) {
      this.products = this.products.filter(product => product !== this.newProductAdded);
      this.newProductAdded = null;
      this.calculateTotals();
    }
  }

  calculateTotals() {
    this.subtotal = this.products.reduce((acc, product) => {
      product.totalPrice = product.price * product.quantity;
      return acc + product.totalPrice;
    }, 0);

    this.deliveryCharges = this.subtotal > 0 ? 2.00 : 0.00;
    this.total = this.subtotal + this.deliveryCharges;
  }
}