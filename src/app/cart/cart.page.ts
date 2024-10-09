import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { DataService } from '../services/data.service'; // Import the DataService

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  products: any[] = [];
  newProductAdded: any = null;
  deliveryCharges: number = 0;
  subtotal: number = 0;
  total: number = 0;

  constructor(private router: Router, private alertService: AlertService, private dataService: DataService) {
    this.products = this.dataService.getCartProducts(); // Fetch products from DataService
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
      name: 'New Product',
      description: 'A newly added product after exceeding the limit.',
      color: 'Red',
      size: 'S',
      quantity: 1,
      image: '../../assets/cart1.png',
      price: 20.00,
      totalPrice: 0.00
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
    const totals = this.dataService.calculateCartTotals(this.products);
    this.subtotal = totals.subtotal;
    this.deliveryCharges = totals.deliveryCharges;
    this.total = totals.total;
  }
}
