import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {


  private cartSubscription: Subscription;
  private totalsSubscription: Subscription;
  cartProducts: any[] = [];
  cartTotals: any;

  // Array to hold multiple headings
  headings: string[] = [
    'Shipping Address',
    'Contact Information'
  ];
  // Array to hold multiple addresses
  addresses: string[] = [
    '26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city',
    '+923360639358,  Email: zafarhamza789@gmail.com',
  ];
 
  // Email for the second container
  email: string = 'billing@example.com';

  items: any[] = [];

  // items = [
  //   {
  //     image: '../../assets/card2.png',
  //     description: 'Lorem ipsum dolor sit amet consectetur.',
  //     price: '17.00',
  //   },
  //   {
  //     image: '../../assets/card3.png',
  //     description: 'Consectetur adipiscing elit.',
  //     price: '25.00',
  //   },
  // ];

  shippingOptions = [
    { type: 'Express', time: '1-2 days', price: '$12.00' },
    { type: 'Standard', time: '3-5 days', price: '$5.00' }
  ];

  constructor(private router: Router, private globalService: GlobalService) {
      // Subscribe to cart products
      this.cartSubscription = this.globalService.cartProducts$.subscribe(products => {
        this.cartProducts = products;
        this.updateItems(); // Update items when products change
      });
  
      // Subscribe to cart totals
      this.totalsSubscription = this.globalService.cartTotals$.subscribe(totals => {
        this.cartTotals = totals;
        this.updateTotalDisplay(); // Update total display when totals change
      });
   }

  goToNextPage() {
    this.router.navigate(['/receive']);
  }
  ngOnInit() {
        // Initialize data from GlobalService
        this.cartProducts = this.globalService.getCartProducts();
        this.cartTotals = this.globalService.getCartTotals();
        this.updateItems();
        this.updateTotalDisplay();
  }
    // Naya method - Convert cart products to items format
    updateItems() {
      this.items = this.cartProducts.map(product => ({
        image: product.image,
        description: product.description,
        price: product.totalPrice.toFixed(2)
      }));
    }

     // Naya method - Update total display in UI
  updateTotalDisplay() {
    if (this.cartTotals) {
      const totalElement = document.querySelector('.total-title');
      if (totalElement) {
        totalElement.textContent = `Total $${this.cartTotals.total.toFixed(2)}`;
      }
    }
  }
   // Cleanup subscriptions on destroy
  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.totalsSubscription) {
      this.totalsSubscription.unsubscribe();
    }
  }
}

