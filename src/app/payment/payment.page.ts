import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit, OnDestroy {
  private cartSubscription: Subscription;
  private totalsSubscription: Subscription;
  private addressSubscription: Subscription;
  cartProducts: any[] = [];
  cartTotals: any;
  items: any[] = [];

  // Headings and addresses arrays
  headings: string[] = [
    'Shipping Address',
    'Contact Information'
  ];
  addresses: string[] = [
    '26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city',
    '+923360639358,  Email: zafarhamza789@gmail.com',
  ];

  // Email for billing
  email: string = 'zafarhamza789@gmail.com';

  // Shipping options
  shippingOptions = [
    { type: 'Express', time: '1-2 days', price: '$12.00' },
    { type: 'Standard', time: '3-5 days', price: '$5.00' }
  ];

  // Address editing properties
  isEditingAddress: boolean = false;
  tempAddress: string = '';
  tempEmail: string = '';
  editingIndex: number = -1;

  // Original properties kept for backward compatibility
  shippingAddress: string = '';
  tempShippingAddress: string = '';
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
    private globalService: GlobalService
  ) {
    // Subscribe to cart products
    this.cartSubscription = this.globalService.cartProducts$.subscribe(products => {
      this.cartProducts = products;
      this.updateItems();
    });

    // Subscribe to cart totals
    this.totalsSubscription = this.globalService.cartTotals$.subscribe(totals => {
      this.cartTotals = totals;
      this.updateTotalDisplay();
    });

    // Subscribe to address information
    this.addressSubscription = this.globalService.addressInfo$.subscribe(addressInfo => {
      if (addressInfo) {
        this.shippingAddress = addressInfo.shippingAddress;
        this.contactInfo = addressInfo.contactInfo;
        // Update addresses array with new information
        this.addresses[0] = addressInfo.shippingAddress;
        if (addressInfo.contactInfo) {
          this.addresses[1] = `${addressInfo.contactInfo.phone}, Email: ${addressInfo.contactInfo.email}`;
          this.email = addressInfo.contactInfo.email;
        }
      }
    });
  }

  // Navigation method
  goToNextPage() {
    this.router.navigate(['/receive']);
  }

  // New address editing methods
  editAddress(index: number) {
    this.isEditingAddress = true;
    this.editingIndex = index;
    this.tempAddress = this.addresses[index];
    if (index === 1) {
      // For contact information, extract email
      const emailMatch = this.addresses[index].match(/Email: (.+)/);
      this.tempEmail = emailMatch ? emailMatch[1] : this.email;
    }
  }

  saveAddress(index: number) {
    if (this.tempAddress.trim()) {
      if (index === 0) {
        // Saving shipping address
        this.addresses[index] = this.tempAddress;
        this.shippingAddress = this.tempAddress; // Update original property
      } else if (index === 1) {
        // Saving contact information
        const phoneNumber = this.tempAddress.split(',')[0].trim();
        this.addresses[index] = `${phoneNumber}, Email: ${this.tempEmail}`;
        // Update original properties
        this.contactInfo.phone = phoneNumber;
        this.contactInfo.email = this.tempEmail;
        this.email = this.tempEmail;
      }
    }
    this.isEditingAddress = false;
    this.editingIndex = -1;
    this.tempAddress = '';
    this.tempEmail = '';
    this.updateGlobalAddressInfo();
  }

  // Original methods kept for backward compatibility
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

  // Update global service with new address info
  private updateGlobalAddressInfo() {
    const phoneNumber = this.addresses[1].split(',')[0].trim();
    this.globalService.updateAddressInfo({
      shippingAddress: this.addresses[0],
      contactInfo: {
        phone: phoneNumber,
        email: this.email
      }
    });
  }

  // Cart items update method
  private updateItems() {
    this.items = this.cartProducts.map(product => ({
      image: product.image,
      description: product.description,
      price: product.totalPrice.toFixed(2)
    }));
  }

  // Total display update method
  private updateTotalDisplay() {
    if (this.cartTotals) {
      const totalElement = document.querySelector('.total-title');
      if (totalElement) {
        totalElement.textContent = `Total $${this.cartTotals.total.toFixed(2)}`;
      }
    }
  }

  ngOnInit() {
    // Initialize data from GlobalService
    this.cartProducts = this.globalService.getCartProducts();
    this.cartTotals = this.globalService.getCartTotals();
    const addressInfo = this.globalService.getAddressInfo();
    if (addressInfo) {
      this.shippingAddress = addressInfo.shippingAddress;
      this.contactInfo = addressInfo.contactInfo;
      // Initialize addresses array
      this.addresses[0] = addressInfo.shippingAddress;
      if (addressInfo.contactInfo) {
        this.addresses[1] = `${addressInfo.contactInfo.phone}, Email: ${addressInfo.contactInfo.email}`;
        this.email = addressInfo.contactInfo.email;
      }
    }
    this.updateItems();
    this.updateTotalDisplay();
  }

  ngOnDestroy() {
    // Cleanup subscriptions
    this.cartSubscription?.unsubscribe();
    this.totalsSubscription?.unsubscribe();
    this.addressSubscription?.unsubscribe();
  }
}