import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  subtotal: number = 0;
  total: number = 0;
  private cartSubscription: Subscription;

  address: string = '';
  tempAddress: string = '';
  isEditing: boolean = false;

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
    private alertController: AlertController,
    private alertService: AlertService,
    private globalService: GlobalService
  ) {
    this.cartSubscription = this.globalService.cartProducts$.subscribe(products => {
      this.products = products;
      this.calculateTotals();
    });

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

  calculateProductTotal(product: any): number {
    return product.price * product.quantity;
  }

  async increment(product: any, index: number) {
    if (product.quantity < 5) {
      product.quantity++;
      product.totalPrice = this.calculateProductTotal(product);
      await this.globalService.updateQuantity(index, product.quantity);
      this.calculateTotals();
    } else {
      const alert = await this.alertController.create({
        header: 'Quantity Limit Reached',
        message: 'You have reached the maximum quantity of 5. Do you want to add more?',
        buttons: [
          {
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Yes',
            handler: async () => {
              product.quantity++;
              product.totalPrice = this.calculateProductTotal(product);
              await this.globalService.updateQuantity(index, product.quantity);
              this.calculateTotals();
            }
          }
        ]
      });
      await alert.present();
    }
  }

  async decrement(product: any, index: number) {
    if (product.quantity > 1) {
      product.quantity--;
      product.totalPrice = this.calculateProductTotal(product);
      await this.globalService.updateQuantity(index, product.quantity);
      this.calculateTotals();
    } else {
      const alert = await this.alertController.create({
        header: 'Remove Product',
        message: 'Do you want to remove this product from the cart?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Remove',
            handler: async () => {
              this.removeProduct(product);
            }
          }
        ]
      });
      await alert.present();
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
      const productTotal = product.price * product.quantity;
      return total + productTotal;
    }, 0);
    this.total = this.subtotal;
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
    this.tempContactInfo = { ...this.contactInfo };
  }

  saveContactInfo() {
    if (this.tempContactInfo.phone.trim() && this.tempContactInfo.email.trim()) {
      this.contactInfo = { ...this.tempContactInfo };
      this.updateGlobalAddressInfo();
    }
    this.isEditingContact = false;
  }

  cancelContactEdit() {
    this.isEditingContact = false;
    this.tempContactInfo = { ...this.contactInfo };
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
