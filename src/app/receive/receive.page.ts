import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service'; // Import the DataService

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

  // Define leftOrders and rightOrders arrays
  leftOrders: Order[] = [];
  rightOrders: Order[] = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.getOrdersFromService(); // Fetch orders from DataService
  }

  // Function to fetch orders from DataService
  getOrdersFromService(): void {
    const orders = this.dataService.getReceiveOrders(); // Now calling the new method in DataService
    this.splitOrders(orders); // Split orders into left and right columns
  }

  // Function to split orders into left and right columns
  splitOrders(orders: Order[]): void {
    this.leftOrders = orders.slice(0, 2);  // First two orders for the left column
    this.rightOrders = orders.slice(2);     // Remaining orders for the right column
  }

  // Function to navigate to the new page
  goToNewPage(orderNumber: string) {
    console.log('Navigating to the new page with order:', orderNumber);
    this.router.navigate(['/setting']);
  }

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
