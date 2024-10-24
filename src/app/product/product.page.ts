import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { register } from 'swiper/element/bundle';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { GlobalService } from '../services/global.service';
import { ToastController } from '@ionic/angular';

register();

interface Product {
  image: string;
  description: string;
  discount?: string;
  oldPrice?: string;
  newPrice: number;
  price: number;
  color?: string;
  size?: string;
  quantity?: number;
}

interface CartProduct extends Product {
  color: string;
  size: string;
  quantity: number;
  totalPrice: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {
  selectedColorIndex: number | null = null;
  selectedSizeIndex: number | null = null;
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
    private route: ActivatedRoute,
    private toastController: ToastController,
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.initializeComponent();
  }

  ngOnDestroy() {
    this.cleanup();
  }

  private initializeComponent() {
    this.startTimer();
    this.initializeOptions();
    this.subscribeToQueryParams();
  }

  private initializeOptions() {
    this.colorOptions = this.dataService.getColorOptions();
    this.sizeOptions = this.dataService.getSizeOptions();
    this.selectedSlides = new Array(this.colorOptions.length).fill(false);
  }

  private subscribeToQueryParams() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      console.log('Received params:', params);
      this.updateProductData(params);
    });
  }

  private updateProductData(params: any) {
    this.img1 = params['image'];
    this.text1 = params['description'];
    this.discount = params['discount'] || null;
    this.oldPrice = params['oldPrice'] || null;
    this.newPrice = params['newPrice'];
    this.price = params['price'];

    if (!this.validateRequiredFields()) {
      console.error('Required parameters are missing');
    }
  }

  private validateRequiredFields(): boolean {
    return !!(this.img1 && this.text1 && (this.newPrice || this.price));
  }

  private cleanup() {
    this.stopTimer();
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  selectColor(index: number) {
    this.selectedColorIndex = index;
    console.log("Selected Color Index: ", index);
    console.log("Selected Color: ", this.colorOptions[index]);
  }

  selectSize(index: number) {
    this.selectedSizeIndex = index;
    console.log("Selected Size Index: ", index);
    console.log("Selected Size: ", this.sizeOptions[index]);
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  increment() {
    this.quantity++;
    console.log('Quantity increased to:', this.quantity);
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      console.log('Quantity decreased to:', this.quantity);
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  validateSelection(): boolean {
    if (this.selectedColorIndex === null || this.selectedSizeIndex === null) {
      this.presentToast('Please select both a color and size');
      console.error("Please select both a color and size before proceeding to cart.");
      return false;
    }
    return true;
  }

  validateProductData(): boolean {
    if (!this.validateRequiredFields()) {
      this.presentToast('Required product data is missing');
      console.error("Required product data is missing");
      return false;
    }
    return true;
  }

  goToCart() {
    if (!this.validateSelection() || !this.validateProductData()) {
      return;
    }

    const finalPrice = this.getFinalPrice();

    try {
      const cartProduct = this.createCartProduct(finalPrice);
      this.addProductToCart(cartProduct);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      this.presentToast('Error adding product to cart');
    }
  }

  private createCartProduct(finalPrice: number): CartProduct {
    return {
      image: this.img1!,
      description: this.text1!,
      color: this.colorOptions[this.selectedColorIndex!],
      size: this.sizeOptions[this.selectedSizeIndex!],
      price: finalPrice,  // Use finalPrice directly as a number
      newPrice: this.newPrice ? this.formatPrice(this.newPrice) : 0,  // Ensure newPrice is a number
      quantity: this.quantity,
      totalPrice: finalPrice * this.quantity,
      ...(this.discount && { discount: this.discount }),
      ...(this.oldPrice && { oldPrice: this.oldPrice })
    };
  }


  private addProductToCart(cartProduct: CartProduct) {
    this.globalService.addToCart(cartProduct);
    console.log('Product added to cart:', cartProduct);
    this.presentToast('Product added to cart successfully');
    this.router.navigate(['/cart']);
  }

  formatPrice(price: string | null): number {
    if (!price) return 0;
    const numericPrice = price.replace(/[^0-9.]/g, '');
    const parsedPrice = parseFloat(numericPrice);
    return isNaN(parsedPrice) ? 0 : parsedPrice;
  }

  hasDiscount(): boolean {
    return this.discount !== null && this.discount !== undefined && this.discount !== '';
  }

  getFinalPrice(): number {
    if (this.hasDiscount() && this.newPrice) {
      return this.formatPrice(this.newPrice);
    }
    return this.formatPrice(this.price);
  }

  navigateToProduct(product: Product) {
    this.router.navigate(['/product'], {
      queryParams: {
        image: product.image,
        description: product.description,
        discount: product.discount,
        oldPrice: product.oldPrice,
        newPrice: product.newPrice,
        price: product.price
      }
    });
  }
}