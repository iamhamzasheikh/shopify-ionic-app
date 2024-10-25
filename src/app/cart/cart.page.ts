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
  // Cart product management
  products: any[] = [];
  subtotal: number = 0;
  total: number = 0;
  private cartSubscription: Subscription;

  // Address management
  address: string = '';
  tempAddress: string = '';
  isEditing: boolean = false;

  // Contact information management
  contactInfo = {
    phone: '',
    email: ''
  };
  tempContactInfo = {
    phone: '',
    email: ''
  };
  isEditingContact: boolean = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private globalService: GlobalService
  ) {
    // Subscribe to cart changes
    this.cartSubscription = this.globalService.cartProducts$.subscribe(products => {
      this.products = products;
      this.calculateTotals();
    });

    // Load saved address info
    const savedAddressInfo = this.globalService.getAddressInfo();
    if (savedAddressInfo.shippingAddress) {
      this.address = savedAddressInfo.shippingAddress;
      this.contactInfo = savedAddressInfo.contactInfo;
    }
  }

  ngOnInit() {
    this.products = this.globalService.getCartProducts();
    this.calculateTotals();
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // Modified to use full price without discount
  calculateProductTotal(product: any): number {
    return product.price * product.quantity;
  }

  async increment(product: any, index: number) {
    product.quantity++;
    product.totalPrice = this.calculateProductTotal(product);
    await this.globalService.updateQuantity(index, product.quantity);
    this.calculateTotals();
  }
  
  async decrement(product: any, index: number) {
    if (product.quantity > 0) {
      product.quantity--;
      product.totalPrice = this.calculateProductTotal(product);
      await this.globalService.updateQuantity(index, product.quantity);
      this.calculateTotals();
    }
  }

  removeProduct(product: any) {
    const index = this.products.indexOf(product);
    if (index > -1) {
      this.globalService.removeFromCart(index);
    }
    this.calculateTotals();
  }

  // Modified to calculate totals using full price and excluding delivery charges
  calculateTotals() {
    // Calculate subtotal using full price (without discount)
    this.subtotal = this.products.reduce((total, product) => {
      const productTotal = product.price * product.quantity;
      console.log(`Product: ${product.name}, Full Price: ${product.price}, Quantity: ${product.quantity}, Total: ${productTotal}`);
      return total + productTotal;
    }, 0);
  
    console.log(`Subtotal (Full Price): ${this.subtotal}`);
    this.total = this.subtotal; // Total is now equal to subtotal without delivery charges
    console.log(`Total without delivery: ${this.total}`);
  }

  // For display purposes only - shows original price
  getDisplayPrice(product: any): string {
    return product.price.toFixed(2);
  }

  // Address and contact info methods remain unchanged
  editAddress() {
    this.isEditing = true;
    this.tempAddress = this.address;
  }

  saveAddress() {
    if (this.tempAddress.trim()) {
      this.address = this.tempAddress;
      this.updateGlobalAddressInfo();
    }
    this.isEditing = false;
  }

  cancelAddressEdit() {
    this.isEditing = false;
    this.tempAddress = this.address;
  }

  editContactInfo() {
    this.isEditingContact = true;
    this.tempContactInfo = {...this.contactInfo};
  }

  saveContactInfo() {
    if (this.tempContactInfo.phone.trim() && this.tempContactInfo.email.trim()) {
      this.contactInfo = {...this.tempContactInfo};
      this.updateGlobalAddressInfo();
    }
    this.isEditingContact = false;
  }

  cancelContactEdit() {
    this.isEditingContact = false;
    this.tempContactInfo = {...this.contactInfo};
  }

  private updateGlobalAddressInfo() {
    this.globalService.updateAddressInfo({
      shippingAddress: this.address,
      contactInfo: this.contactInfo
    });
  }

  goToPaymentPage() {
    this.updateGlobalAddressInfo();
    this.router.navigate(['/payment']);
  }
}
