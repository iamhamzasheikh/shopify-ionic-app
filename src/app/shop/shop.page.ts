import { Component, OnInit, OnDestroy } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

register();

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit, OnDestroy {
  images: string[] = [];
  categories: any[] = [];
  slides: string[] = [];
  item_slides: any[] = [];
  popular_slides: any[] = [];
  just_slides: any[] = [];
  products: any[] = [];

  // Flash Sale Timer properties
  hours: number = 0;
  minutes: number = 36;
  seconds: number = 58;
  private timerSubscription: Subscription | undefined;

  // Flash Sale State
  saleState: 'active' | 'ended' | 'upcoming' = 'active'; // Initialize to active

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.loadData();
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  private loadData() {
    this.images = this.dataService.getShopPageImages();
    this.categories = this.dataService.getCategories();
    this.slides = this.dataService.getSlides();
    this.item_slides = this.dataService.getItemSlides();
    this.popular_slides = this.dataService.getPopularSlides();
    this.just_slides = this.dataService.getJustSlides();
    this.products = this.dataService.getProducts();
  }

  private startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          if (this.hours > 0) {
            this.hours--;
            this.minutes = 59;
            this.seconds = 59;
          } else {
            this.saleState = 'ended'; // Set state to ended when time runs out
            this.stopTimer();
          }
        }
      }
    });
  }

  private stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  goToNextPage() {
    this.router.navigate(['/flash-sale']);
  }

  


}
