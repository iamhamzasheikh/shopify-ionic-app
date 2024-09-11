import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage  {

  slides = [
    '/src/assets/images/ss1.png',
    'assets/images/ss2.png',
    'assets/images/ss3.png',
    'assets/images/ss4.png',
    'assets/images/ss5.png',
    'assets/images/ss6.png',
    'assets/images/ss7.png',
    'assets/images/ss8.png',
    'assets/images/ss9.png',
    'assets/images/ss10.png',
    'assets/images/ss11.png',
    'assets/images/ss12.png'
  ]; // Array of 12 image paths

  // constructor() { } Create an array with 12 items
}
