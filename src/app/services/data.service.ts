import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private homePageData = {
    logo: '/assets/image1.png',
    title: 'Shopify',
    description: 'Beautiful eCommerce UI Kit for your online store',
    buttonLabel: "Let's get started",
    alreadyAccountText: 'I already have an account',
    arrowIcon: 'arrow-forward-outline'
  };

  private products = [
    {
      image: '../../assets/sc2.png',
      discount: 20,
      description: 'Lorem ipsum dolor sit amet consectetur',
      oldPrice: 500,
      newPrice: 400
    },
    {
      image: '../../assets/sc1.png',
      discount: 30,
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing',
      oldPrice: 700,
      newPrice: 550
    },
    {
      image: '../../assets/sc3.png',
      discount: 15,
      description: 'Consectetur adipiscing elit sed do eiusmod',
      oldPrice: 200,
      newPrice: 170
    },
    {
      image: '../../assets/sc2.png',
      discount: 50,
      description: 'Tempor incididunt ut labore et dolore magna aliqua',
      oldPrice: 1000,
      newPrice: 500
    },
    {
      image: '../../assets/sc3.png',
      discount: 10,
      description: 'Ut enim ad minim veniam quis nostrud',
      oldPrice: 300,
      newPrice: 270
    },
    {
      image: '../../assets/sc1.png',
      discount: 25,
      description: 'Exercitation ullamco laboris nisi ut aliquip',
      oldPrice: 400,
      newPrice: 300
    }
  ];

  private colorOptions: string[] = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F6', '#33FFF3', '#3357FF'];
  private sizeOptions: string[] = ['S', 'M', 'L', 'XL', 'XXL', 'XS'];

  constructor() { }

  // Method to get home page data
  getHomePageData() {
    return this.homePageData;
  }

  // Method to get product data
  getProducts() {
    return this.products;
  }

  // Method to get color options
  getColorOptions() {
    return this.colorOptions;
  }

  // Method to get size options
  getSizeOptions() {
    return this.sizeOptions;
  }
}
