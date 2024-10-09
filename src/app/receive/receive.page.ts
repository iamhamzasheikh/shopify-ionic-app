import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Order {
  orderNumber: string;
  deliveryType: string;
  itemCount: number;
  status: 'Packed' | 'Shipped' | 'Delivered';
  images: string[];
}

@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {

  // Orders data
  orders: Order[] = [
    {
      orderNumber: 'Order # 922871',
      deliveryType: 'Standard Delivery',
      itemCount: 3,
      status: 'Packed',
      images: ['../../assets/card4.png', '../../assets/card6.png', '../../assets/card2.png', '../../assets/card1.png']
    },
    {
      orderNumber: 'Order # 922872',
      deliveryType: 'Standard Delivery',
      itemCount: 4,
      status: 'Shipped',
      images: ['../../assets/h1.png', '../../assets/h2.png', '../../assets/h3.png', '../../assets/h4.png']
    },
    {
      orderNumber: 'Order # 922873',
      deliveryType: 'Standard Delivery',
      itemCount: 4,
      status: 'Delivered',
      images: ['../../assets/sc1.png', '../../assets/sc2.png', '../../assets/sc3.png', '../../assets/sc4.png']
    },
    {
      orderNumber: 'Order # 922874',
      deliveryType: 'Standard Delivery',
      itemCount: 4,
      status: 'Delivered',
      images: ['../../assets/card4.png', '../../assets/card6.png', '../../assets/card2.png', '../../assets/card1.png']
    },
    {
      orderNumber: 'Order # 922874',
      deliveryType: 'Standard Delivery',
      itemCount: 4,
      status: 'Delivered',
      images: ['../../assets/card4.png', '../../assets/card6.png', '../../assets/card2.png', '../../assets/card1.png']
    }
  ];

  // Define leftOrders and rightOrders arrays
  leftOrders: Order[] = [];
  rightOrders: Order[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.splitOrders();
  }

  // Function to split orders into left and right columns
  splitOrders(): void {
    this.leftOrders = this.orders.slice(0, 2);  // First two orders for the left column
    this.rightOrders = this.orders.slice(2);     // Remaining orders for the right column
  }

  // Function to navigate to the new page
  goToNewPage(orderNumber: string) {
    console.log('Navigating to the new page with order:', orderNumber);
    this.router.navigate(['/setting']);
  }

  // Additional helper functions as previously defined...

  // Helper function to check if an order is trackable
  isTrackable(status: string): boolean {
    return status === 'Packed' || status === 'Shipped';
  }

  // Helper function to check if an order is delivered
  isDelivered(status: string): boolean {
    return status === 'Delivered';
  }

  // Function to handle review action for delivered orders
  reviewOrder(orderNumber: string) {
    console.log('Reviewing order:', orderNumber);
    this.router.navigate(['/review', { orderNumber: orderNumber }]);
  }

  // Dynamically retrieve the image path for better scalability
  getImagePath(imageName: string): string {
    return `../../assets/${imageName}`;
  }

}
