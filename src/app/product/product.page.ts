import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';  // Import Router
register();

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {

  isFavorite: boolean = false;
  quantity: number = 1;
  sizeOptions: string[] = ['S', 'M', 'L', 'XL', 'XXL', 'XS'];
  minutes: number = 0;
  seconds: number = 0;
  private timerSubscription: Subscription | undefined;
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

  constructor(private router: Router) { }  // Inject Router

  ngOnInit() {
    this.startTimer();
    this.selectedSlides = new Array(this.images.length).fill(false);
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
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

  toggleSlideSelection(index: number) {
    this.selectedSlides[index] = !this.selectedSlides[index];
  }

  // Add this method to navigate to the next page
  goToNextPage() {
    this.router.navigate(['/cart']);
  }
}
