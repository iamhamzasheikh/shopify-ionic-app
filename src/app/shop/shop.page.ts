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
  // Array of 12 image paths

  // constructor() { } Create an array with 12 items
}
