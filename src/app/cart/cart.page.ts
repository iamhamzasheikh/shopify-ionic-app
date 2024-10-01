import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {
    this.calculateTotals(); // Initial calculation
  }

  goToNextPage() {
    this.router.navigate(['/payment']);
  }


  deliveryCharges: number = 0; // Static delivery charges
  subtotal: number = 0;
  total: number = 0;

  // Modify the decrement function to recalculate totals
  decrement(product: any) {
    if (product.quantity > 0) {
      product.quantity--;
      this.calculateTotals();  // Recalculate totals after decrementing
    }
  }
  // Modify the increment function to recalculate totals
  increment(product: any) {
    product.quantity++;
    this.calculateTotals();  // Recalculate totals after incrementing
  }

  // Calculate subtotal and total
  // Method to calculate subtotal and total
  calculateTotals() {
    this.subtotal = this.products.reduce((acc, product) => {
      product.totalPrice = product.price * product.quantity; // Update totalPrice for each product
      return acc + product.totalPrice; // Accumulate subtotal
    }, 0);

    // Set delivery charges based on whether any product is selected
    this.deliveryCharges = this.subtotal > 0 ? 2.00 : 0.00;

    this.total = this.subtotal + this.deliveryCharges; // Total includes delivery charges
  }
}
