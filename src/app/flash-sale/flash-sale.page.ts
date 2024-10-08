import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service'; // Import DataService

@Component({
  selector: 'app-flash-sale',
  templateUrl: './flash-sale.page.html',
  styleUrls: ['./flash-sale.page.scss'],
})
export class FlashSalePage implements OnInit, OnDestroy {
  minutes: number = 0;
  seconds: number = 0;
  private timerSubscription: Subscription | undefined;
  selectedDiscount: string = 'all';  // Default value
  products: any[] = [];  // Initialize products array

  // Inject Router and DataService via constructor
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.startTimer();
    this.products = this.dataService.getProducts(); // Fetch product data from DataService
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  // Method to select the discount category (e.g., 'all', '50%', '30%')
  selectDiscount(discount: string) {
    this.selectedDiscount = discount;
  }

  // Method to navigate to the next page when clicking on a product
  goToNextPage() {
    this.router.navigate(['/product']); // Ensure the route exists
  }
}
