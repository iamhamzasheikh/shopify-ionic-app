import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';  // Import DataService

register();

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {

  isFavorite: boolean = false;
  quantity: number = 1;
  minutes: number = 0;
  seconds: number = 0;
  private timerSubscription: Subscription | undefined;

  colorOptions: string[] = [];
  sizeOptions: string[] = [];
  selectedSlides: boolean[] = [];

  constructor(private router: Router, private dataService: DataService) { }  // Inject DataService

  ngOnInit() {
    this.startTimer();
    this.colorOptions = this.dataService.getColorOptions();  // Get color options from DataService
    this.sizeOptions = this.dataService.getSizeOptions();    // Get size options from DataService
    this.selectedSlides = new Array(this.colorOptions.length).fill(false);
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
