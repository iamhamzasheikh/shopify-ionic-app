// Payment.page.ts
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
  private cardSubscription: Subscription;

  cartProducts: any[] = [];
  cartTotals: any;
  items: any[] = [];
  total: number = 0;
  cardDetails: any;
  estimatedDeliveryDate: Date | null = null;
  headings: string[] = ['Shipping Address', 'Contact Information'];
  addresses: string[] = [
    '26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city',
    '+923360639358,  Email: zafarhamza789@gmail.com',
  ];
  email: string = 'zafarhamza789@gmail.com';
  shippingOptions = [
    { type: 'Express', time: '1 - 2 days', price: '$12.00' },
    { type: 'Standard', time: '3 - 5 days', price: '$5.00' },
    { type: 'Cash on Delivery', time: '9 - 10 days', price: 'Free' }
  ];
  selectedShipping: string | null = null;
  isEditingShipping: boolean = false;
  isEditingContact: boolean = false;
  tempShippingAddress: string = '';
  tempPhone: string = '';
  tempEmail: string = '';
  shippingAddress: string = '';
  contactInfo = {
    phone: '',
    email: ''
  };

  constructor(
    private router: Router,
    private globalService: GlobalService
  ) {
    this.cartSubscription = this.globalService.cartProducts$.subscribe(products => {
      this.cartProducts = products;
      this.updateItems();
    });
    this.totalsSubscription = this.globalService.cartTotals$.subscribe(totals => {
      this.cartTotals = totals;
      this.calculateTotal();
    });
    this.addressSubscription = this.globalService.addressInfo$.subscribe(addressInfo => {
      if (addressInfo) {
        this.shippingAddress = addressInfo.shippingAddress;
        this.contactInfo = addressInfo.contactInfo;
        this.addresses[0] = addressInfo.shippingAddress;
        if (addressInfo.contactInfo) {
          this.addresses[1] = `${addressInfo.contactInfo.phone}, Email: ${addressInfo.contactInfo.email}`;
          this.email = addressInfo.contactInfo.email;
        }
      }
    });
    this.cardSubscription = this.globalService.cardDetails$.subscribe(details => {
      this.cardDetails = details;
    });
  }

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
    return selectedOption ? (selectedOption.price === 'Free' ? 0 : parseFloat(selectedOption.price.replace('$', ''))) : 0;
  }

  goToNextPage() {
    if (!this.cartProducts.length) {
      alert("Your cart is empty. Please add products.");
      return;
    }
    if (!this.contactInfo.phone || !this.contactInfo.email) {
      alert("Contact information is missing. Please add your contact details.");
      return;
    }
    if (!this.shippingAddress) {
      alert("Shipping address is missing. Please add your address.");
      return;
    }
    if (!this.selectedShipping) {
      alert("Shipping method is not selected. Please choose a shipping option.");
      return;
    }

    this.globalService.updateCartTotals({
      ...this.cartTotals,
      total: this.total,
      shipping: this.selectedShipping,
      shippingCost: this.getShippingCost()
    });
    this.router.navigate(['/status']);
  }

  onShippingOptionChange(option: string) {
    this.selectedShipping = option;
    const selectedOption = this.shippingOptions.find(opt => opt.type === option);
    if (selectedOption && selectedOption.time) {
      const deliveryDaysRange = selectedOption.time.match(/\d+/g)?.map(Number);
      if (deliveryDaysRange && deliveryDaysRange.length > 0) {
        const today = new Date();
        const maxDeliveryDays = Math.max(...deliveryDaysRange);
        this.estimatedDeliveryDate = new Date(today);
        this.estimatedDeliveryDate.setDate(today.getDate() + maxDeliveryDays);
      }
    }
    if (this.cartProducts.length > 0) {
      this.calculateTotal();
    }
  }

  editShippingAddress() {
    this.isEditingShipping = true;
    this.tempShippingAddress = this.addresses[0];
  }

  saveShippingAddress() {
    if (this.tempShippingAddress.trim()) {
      this.addresses[0] = this.tempShippingAddress;
      this.shippingAddress = this.tempShippingAddress;
      this.updateGlobalAddressInfo();
    }
    this.isEditingShipping = false;
    this.tempShippingAddress = '';
  }

  editContactInfo() {
    this.isEditingContact = true;
    const phoneMatch = this.addresses[1].match(/^([^,]+)/);
    this.tempPhone = phoneMatch ? phoneMatch[1].trim() : '';
    this.tempEmail = this.email;
  }

  saveContactInfo() {
    if (this.tempPhone.trim() && this.tempEmail.trim()) {
      this.addresses[1] = `${this.tempPhone}, Email: ${this.tempEmail}`;
      this.email = this.tempEmail;
      this.contactInfo.phone = this.tempPhone;
      this.contactInfo.email = this.tempEmail;
      this.updateGlobalAddressInfo();
    }
    this.isEditingContact = false;
    this.tempPhone = '';
    this.tempEmail = '';
  }

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

  private updateItems() {
    this.items = this.cartProducts.map(product => ({
      image: product.image,
      description: product.description,
      price: product.totalPrice.toFixed(2),
      quantity: product.quantity
    }));
    this.calculateTotal();
  }

  private updateTotalDisplay() {
    const totalElement = document.querySelector('.total-title');
    if (totalElement) {
      totalElement.textContent = `Total $${this.total.toFixed(2)}`;
    }
  }

  ngOnInit() {
    this.cartProducts = this.globalService.getCartProducts();
    this.cartTotals = this.globalService.getCartTotals();
    this.cardDetails = this.globalService.getCardDetails();
    
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

    this.cardDetails = this.globalService.getCardDetails();
    this.updateItems();
    this.calculateTotal();
  }

  ngOnDestroy() {
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
    if (this.totalsSubscription) this.totalsSubscription.unsubscribe();
    if (this.addressSubscription) this.addressSubscription.unsubscribe();
    if (this.cardSubscription) this.cardSubscription.unsubscribe();
  }
    goToPaymentMethod() {
    this.router.navigate(['/payment-method']);
  }
}
