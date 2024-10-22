import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { register } from 'swiper/element/bundle';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

register();

interface Product {
  image: string;
  description: string;
  discount: string;
  oldPrice: string;
  newPrice: string;
  price: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {

  selectedColorIndex: number | null = null;
  selectedSizeIndex: number | null = null;

  // Method for selecting a color// Method for selecting a color
  selectColor(index: number) {
    this.selectedColorIndex = index; // Set selected color index
    console.log("Selected Color Index: ", index); // Show color index in console
    console.log("Selected Color: ", this.colorOptions[index]); // Show selected color name in console
  }

  // Method for selecting a size
  // Method for selecting a size
  selectSize(index: number) {
    this.selectedSizeIndex = index; // Set selected size index
    console.log("Selected Size Index: ", index); // Show size index in console
    console.log("Selected Size: ", this.sizeOptions[index]); // Show selected size in console
  }


  isFavorite: boolean = false;
  quantity: number = 1;
  minutes: number = 0;
  seconds: number = 0;
  private timerSubscription: Subscription | undefined;
  private queryParamsSubscription: Subscription | undefined;

  colorOptions: string[] = [];
  sizeOptions: string[] = [];
  selectedSlides: boolean[] = [];

  img1: string | null = null;
  text1: string | null = null;
  discount: string | null = null;
  oldPrice: string | null = null;
  newPrice: string | null = null;
  price: string | null = null;

  constructor(
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.startTimer();
    this.colorOptions = this.dataService.getColorOptions();
    this.sizeOptions = this.dataService.getSizeOptions();
    this.selectedSlides = new Array(this.colorOptions.length).fill(false);

    // Retrieve product data from query parameters
    // Retrieve product data from query parameters
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      console.log(params); // Log incoming parameters to debug
      this.img1 = params['image'];
      this.text1 = params['description'];
      this.discount = params['discount'];
      this.oldPrice = params['oldPrice'];
      this.newPrice = params['newPrice'];
      this.price = params['price'];

      // Check if the parameters are null or undefined
      if (!this.img1 || !this.text1 || !this.discount || !this.oldPrice || !this.newPrice || !this.price) {
        console.error('Some query parameters are missing');
      }
    });


  }

  ngOnDestroy() {
    this.stopTimer();
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
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

  // Method to navigate to the next page with query parameters
  // Assuming you call goToNextPage somewhere in your code like this:
  goToNextPage(product: Product) {
    this.router.navigate(['/cart'], {
      queryParams: {
        image: product.image,
        description: product.description,
        discount: product.discount,
        oldPrice: product.oldPrice,
        newPrice: product.newPrice
      }
    });
  }
}