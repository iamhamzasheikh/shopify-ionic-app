import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { register } from 'swiper/element';
register();

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
  
  // Products data array
  products = [
    {
      image: '../../assets/sc2.png',
      discount: 20,
      description: 'Lorem ipsum dolor sit amet consectetur',
      oldPrice: 500,
      newPrice: 400
    },
    {
      image: '../../assets/sc1.png', // Replace with other image URLs
      discount: 30,
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing',
      oldPrice: 700,
      newPrice: 550
    },
    {
      image: '../../assets/sc3.png', // Replace with other image URLs
      discount: 15,
      description: 'Consectetur adipiscing elit sed do eiusmod',
      oldPrice: 200,
      newPrice: 170
    },
    {
      image: '../../assets/sc2.png', // Replace with other image URLs
      discount: 50,
      description: 'Tempor incididunt ut labore et dolore magna aliqua',
      oldPrice: 1000,
      newPrice: 500
    },
    {
      image: '../../assets/sc3.png', // Replace with other image URLs
      discount: 10,
      description: 'Ut enim ad minim veniam quis nostrud',
      oldPrice: 300,
      newPrice: 270
    },
    {
      image: '../../assets/sc1.png', // Replace with other image URLs
      discount: 25,
      description: 'Exercitation ullamco laboris nisi ut aliquip',
      oldPrice: 400,
      newPrice: 300
    }
  ];

  constructor() { }

  ngOnInit() {
    this.startTimer();
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
    // Your logic to navigate to the product detail page or another action
  }
}
