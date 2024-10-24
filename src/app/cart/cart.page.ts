import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { GlobalService } from '../services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {
  products: any[] = [];
  deliveryCharges: number = 0;
  subtotal: number = 0;
  total: number = 0;
  private cartSubscription: Subscription;

  address: string = "26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city";
  tempAddress: string = '';
  isEditing: boolean = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private globalService: GlobalService
  ) {
    // Subscribe to cart products
    this.cartSubscription = this.globalService.cartProducts$.subscribe(products => {
      this.products = products;
      this.calculateTotals();
    });
    
  }

  ngOnInit() {
    this.products = this.globalService.getCartProducts();
    this.calculateTotals();
  }

    // Start editing the address
    editAddress() {
      this.isEditing = true;
      this.tempAddress = this.address; // Store the current address in a temp variable for editing
    }
  
    // Save the edited address
    saveAddress() {
      if (this.tempAddress.trim()) {
        this.address = this.tempAddress; // Update the main address
      }
      this.isEditing = false; // Exit editing mode
    }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  

  // Calculate final price considering possible discount
  calculateProductPrice(product: any): number {
    if (product.discount) {
      return product.price - (product.price * (product.discount / 100));
    }
    return product.price;
  }

  // Calculate total price for a product
  calculateProductTotal(product: any): number {
    const finalPrice = this.calculateProductPrice(product);
    return finalPrice * product.quantity;
  }

  goToNextPage() {
    this.router.navigate(['/payment']);
  }

  async decrement(product: any, index: number) {
    if (product.quantity > 0) {
      product.quantity--;
      product.totalPrice = this.calculateProductTotal(product);
      this.globalService.updateQuantity(index, product.quantity);
      this.calculateTotals();
    }
    if (product.quantity === 0) {
      await this.alertService.showQuantityZeroAlert();
      this.removeProduct(product);
    }
  }

  async increment(product: any, index: number) {
    product.quantity++;
    product.totalPrice = this.calculateProductTotal(product);
    this.globalService.updateQuantity(index, product.quantity);
    this.calculateTotals();
    if (product.quantity >= 5) {
      await this.alertService.showQuantityLimitExceededAlert();
    }
  }

  removeProduct(product: any) {
    const index = this.products.indexOf(product);
    if (index > -1) {
      this.globalService.removeFromCart(index);
    }
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.products.reduce((total, product) => {
      return total + this.calculateProductTotal(product);
    }, 0);

    // You can adjust delivery charges logic as needed
    this.deliveryCharges = this.subtotal > 0 ? 5.00 : 0;
    this.total = this.subtotal + this.deliveryCharges;
  }

  // Helper method to display price with or without discount
  getDisplayPrice(product: any): string {
    const finalPrice = this.calculateProductPrice(product);
    return finalPrice.toFixed(2);
  }
}