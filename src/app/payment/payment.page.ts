import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

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

  items = [
    {
      image: '../../assets/card2.png',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      price: '17.00',
    },
    {
      image: '../../assets/card3.png',
      description: 'Consectetur adipiscing elit.',
      price: '25.00',
    },
  ];

  shippingOptions = [
    { type: 'Express', time: '1-2 days', price: '$12.00' },
    { type: 'Standard', time: '3-5 days', price: '$5.00' }
  ];

  constructor(private router: Router) { }

  goToNextPage() {
    this.router.navigate(['/receive']);
  }
  ngOnInit() {
  }

}
