import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-flash-sale',
  templateUrl: './flash-sale.page.html',
  styleUrls: ['./flash-sale.page.scss'],
})
export class FlashSalePage implements OnInit, OnDestroy {
  minutes: number = 0;
  seconds: number = 0;
  private timerSubscription: Subscription | undefined;
  selectedDiscount: string = 'all';
  products: any[] = [];

  slides = [
    { image: '../../assets/Live.png' },
    { image: '../../assets/Live.png' },
    { image: '../../assets/Live.png' },
    { image: '../../assets/Live.png' },
    { image: '../../assets/Live.png' },
    { image: '../../assets/Live.png' }
  ];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.startTimer();
    this.loadProducts();
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

  selectDiscount(discount: string) {
    this.selectedDiscount = discount;
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.dataService.getProductsByDiscount(this.selectedDiscount);
  }

  goToNextPage(product: any) {
    this.router.navigate(['product'], {
      queryParams: { 
        image: product.image,
        description: product.description,
        discount: product.discount,
        oldPrice: product.oldPrice,
        newPrice: product.newPrice
      } 
    });
  }

  
  goToHome() {
    this.router.navigate(['/home']);
  }

  goToCart() {
    this.router.navigate(['/cart'])
  }

  goToSetting() {
    this.router.navigate(['/setting']);
  }
}