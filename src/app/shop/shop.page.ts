import { Component, OnInit, OnDestroy } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { interval, Subscription } from 'rxjs';

register();

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit, OnDestroy {
  Count: number = 1780; // Count for likes
  slides = [
    '../../assets/ss1.png',
    '../../assets/ss2.png',
    '../../assets/ss3.png',
    '../../assets/ss4.png',
    '../../assets/ss5.png',
    '../../assets/ss6.png',
    '../../assets/ss7.png',
    '../../assets/ss8.png',
    '../../assets/ss9.png',
    '../../assets/ss6.png',
    '../../assets/ss1.png',
    '../../assets/ss2.png',
    '../../assets/ss3.png',
    '../../assets/ss4.png'
  ];

  item_slides = [
    '../../assets/item1.png',
    '../../assets/item2.png',
    '../../assets/item1.png',
    '../../assets/item2.png',
    '../../assets/item1.png',
    '../../assets/item2.png',
    '../../assets/item1.png',
    '../../assets/item2.png',
    '../../assets/item1.png',
    '../../assets/item2.png'
  ];

  popular_slides = [
    '../../assets/sc1.png',
    '../../assets/sc2.png',
    '../../assets/sc3.png',
    '../../assets/sc2.png',
    '../../assets/sc1.png',
    '../../assets/sc2.png',
    '../../assets/sc3.png',
    '../../assets/sc1.png',
    '../../assets/sc2.png',
    '../../assets/sc3.png'
  ];

  just_slides = [
    '../../assets/sc1.png',
    '../../assets/sc2.png',
    '../../assets/sc3.png',
    '../../assets/sc2.png',
    '../../assets/sc1.png',
    '../../assets/sc2.png',
    '../../assets/sc3.png',
    '../../assets/sc1.png',
    '../../assets/sc2.png',
    '../../assets/sc3.png'
  ];
  // Flash Sale Timer properties
  hours: number = 0;
  minutes: number = 36;
  seconds: number = 58;
  private timerSubscription: Subscription | undefined;

  // Product List for Grid with Discounts
  products = [
    { image: '../../assets/sc1.png', discount: 20 },
    { image: '../../assets/sc2.png', discount: 15 },
    { image: '../../assets/sc3.png', discount: 10 },
    { image: '../../assets/sc4.png', discount: 25 },
    { image: '../../assets/sc2.png', discount: 30 },
    { image: '../../assets/sc1.png', discount: 30 }
  ];

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
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
}
