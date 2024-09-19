import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {

  isFavorite: boolean = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }


  quantity: number = 1;
  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  sizeOptions: string[] = ['S', 'M', 'L', 'XL', 'XXL', 'XS'];

  // Timer variables
  minutes: number = 0;
  seconds: number = 0;
  private timerSubscription: Subscription | undefined;

  // Image and selection variables for Swiper
  images: string[] = [
    '../../assets/card1.png',
    '../../assets/card2.png',
    '../../assets/card3.png',
    '../../assets/card4.png',
    '../../assets/card5.png',
    '../../assets/card6.png',
    '../../assets/card3.png',
    '../../assets/card4.png',
    '../../assets/card5.png'
  ];

  selectedSlides: boolean[] = [];

  constructor() { }

  ngOnInit() {
    this.startTimer();

    // Initialize the selectedSlides array with 'false'
    this.selectedSlides = new Array(this.images.length).fill(false);
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    // Subscribe to an interval observable for the timer
    this.timerSubscription = interval(1000).subscribe(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
    });
  }

  stopTimer() {
    // Unsubscribe from the timer when component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  // Toggle the checkbox sign on slide click
  toggleSlideSelection(index: number) {
    this.selectedSlides[index] = !this.selectedSlides[index];
  }
}
