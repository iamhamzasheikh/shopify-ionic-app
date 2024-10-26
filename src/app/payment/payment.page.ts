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

  // Cart related properties
  cartProducts: any[] = [];
  cartTotals: any;
  items: any[] = [];
  total: number = 0;

  // Property for the estimated delivery date
  estimatedDeliveryDate: Date | null = null;

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

  // Selected shipping option
  selectedShipping: string | null = null;

  // Address editing properties
  isEditingAddress: boolean = false;
  tempAddress: string = '';
  tempEmail: string = '';
  editingIndex: number = -1;

  // Contact information properties
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
      this.calculateTotal();
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

  // Quantity management methods
  incrementQuantity(index: number): void {
    this.cartProducts[index].quantity += 1;
    this.calculateTotal();
  }

  decrementQuantity(index: number): void {
    if (this.cartProducts[index].quantity > 1) {
      this.cartProducts[index].quantity -= 1;
      this.calculateTotal();
    }
  }

  // Total calculation methods
  calculateTotal() {
    const subtotal = this.cartProducts.reduce((sum, product) => {
      return sum + (product.totalPrice || 0);
    }, 0);

    const shippingCost = this.cartProducts.length > 0 ? this.getShippingCost() : 0;
    this.total = subtotal + shippingCost;
    this.updateTotalDisplay();
  }

  getShippingCost(): number {
    const selectedOption = this.shippingOptions.find(option =>
      option.type === this.selectedShipping
    );
    return selectedOption ? parseFloat(selectedOption.price.replace('$', '')) : 0;
  }

  // Navigation method
  goToNextPage() {
    this.globalService.updateCartTotals({
      ...this.cartTotals,
      total: this.total,
      shipping: this.selectedShipping,
      shippingCost: this.getShippingCost()
    });
    this.router.navigate(['/receive']);
  }

  // Combined shipping option change handler
  onShippingOptionChange(option: string) {
    this.selectedShipping = option;

    // Set delivery days based on selected shipping option
    const today = new Date();
    let deliveryDays = 0;

    if (option === 'Express') {
      deliveryDays = 2;
    } else if (option === 'Standard') {
      deliveryDays = 5;
    }

    // Calculate estimated delivery date
    this.estimatedDeliveryDate = new Date(today);
    this.estimatedDeliveryDate.setDate(today.getDate() + deliveryDays);

    // Recalculate total with new shipping cost if items are in the cart
    if (this.cartProducts.length > 0) {
      this.calculateTotal();
    }
  }

  // Address editing methods
  editAddress(index: number) {
    this.isEditingAddress = true;
    this.editingIndex = index;
    this.tempAddress = this.addresses[index];
    if (index === 1) {
      const emailMatch = this.addresses[index].match(/Email: (.+)/);
      this.tempEmail = emailMatch ? emailMatch[1] : this.email;
    }
  }

  saveAddress(index: number) {
    if (this.tempAddress.trim()) {
      if (index === 0) {
        this.addresses[index] = this.tempAddress;
        this.shippingAddress = this.tempAddress;
      } else if (index === 1) {
        const phoneNumber = this.tempAddress.split(',')[0].trim();
        this.addresses[index] = `${phoneNumber}, Email: ${this.tempEmail}`;
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

  // Contact information methods
  editContactInfo() {
    this.isEditingContact = true;
    this.tempContactInfo = { ...this.contactInfo };
  }

  saveContactInfo() {
    if (this.tempContactInfo.phone.trim() && this.tempContactInfo.email.trim()) {
      this.contactInfo = { ...this.tempContactInfo };
      this.updateGlobalAddressInfo();
    }
    this.isEditingContact = false;
  }

  // Update global service
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

  // Cart items update
  private updateItems() {
    this.items = this.cartProducts.map(product => ({
      image: product.image,
      description: product.description,
      price: product.totalPrice.toFixed(2),
      quantity: product.quantity
    }));
    this.calculateTotal();
  }

  // Total display update
  private updateTotalDisplay() {
    const totalElement = document.querySelector('.total-title');
    if (totalElement) {
      totalElement.textContent = `Total $${this.total.toFixed(2)}`;
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
      this.addresses[0] = addressInfo.shippingAddress;
      if (addressInfo.contactInfo) {
        this.addresses[1] = `${addressInfo.contactInfo.phone}, Email: ${addressInfo.contactInfo.email}`;
        this.email = addressInfo.contactInfo.email;
      }
    }

    this.updateItems();
    this.calculateTotal();
  }

  ngOnDestroy() {
    // Cleanup subscriptions
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.totalsSubscription) {
      this.totalsSubscription.unsubscribe();
    }
    if (this.addressSubscription) {
      this.addressSubscription.unsubscribe();
    }
  }
}