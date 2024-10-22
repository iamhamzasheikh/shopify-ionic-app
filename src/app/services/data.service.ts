import { Injectable } from '@angular/core';

// Define Order interface here
interface Order {
  orderNumber: string;
  deliveryType: string;
  itemCount: number;
  status: 'Packed' | 'Shipped' | 'Delivered';
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // home-page-data
  private homePageData = {
    logo: '/assets/image1.png',
    title: 'Shopify',
    description: 'Beautiful eCommerce UI Kit for your online store',
    buttonLabel: "Let's get started",
    alreadyAccountText: 'I already have an account',
    arrowIcon: 'arrow-forward-outline'
  };

  // product-page-data
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

  // shop-page-data
  private shopPageData = {
    images: [
      '/assets/BigSaleBanner_Q.png',
      '/assets/BigSaleBanner_Q.png',
      '/assets/BigSaleBanner_Q.png',
      '/assets/BigSaleBanner_Q.png',
      '/assets/BigSaleBanner_Q.png',
      '/assets/BigSaleBanner_Q.png'
    ],
    categories: [
      {
        name: 'Clothing',
        count: 109,
        images: ['../../assets/card1.png', '../../assets/card2.png', '../../assets/card3.png', '../../assets/card4.png']
      },
      {
        name: 'Shoes',
        count: 530,
        images: ['../../assets/shoes1.png', '../../assets/shoes2.png', '../../assets/shoes3.png', '../../assets/shoes4.png']
      },
      {
        name: 'Bags',
        count: 87,
        images: ['../../assets/bag1.png', '../../assets/bag2.png', '../../assets/bag3.png', '../../assets/bag4.png']
      },
      {
        name: 'Lingerie',
        count: 218,
        images: ['../../assets/lingerie1.jpg', '../../assets/lingerie2.png', '../../assets/lingerie3.png', '../../assets/lingerie4.png']
      },
      {
        name: 'Watch',
        count: 289,
        images: ['../../assets/watch1.png', '../../assets/watch2.png', '../../assets/watch3.png', '../../assets/watch4.png']
      },
      {
        name: 'Hoodies',
        count: 310,
        images: ['../../assets/hoodies1.png', '../../assets/hoodies2.png', '../../assets/hoodies3.png', '../../assets/hoodies4.png']
      }
    ],
    slides: [
      '../../assets/ss1.png', '../../assets/ss2.png', '../../assets/ss3.png', '../../assets/ss4.png',
      '../../assets/ss5.png', '../../assets/ss6.png', '../../assets/ss7.png', '../../assets/ss8.png',
      '../../assets/ss9.png', '../../assets/ss6.png', '../../assets/ss1.png', '../../assets/ss2.png',
      '../../assets/ss3.png', '../../assets/ss4.png'
    ],
    item_slides: [
      { image: '../../assets/item1.png', price: '$17.00', description: 'Ut enim ad minim veniam quis nostrud', },
      { image: '../../assets/item2.png', price: '$19.00', description: 'Tempor incididunt ut labore et dolore magna aliqua', },
      { image: '../../assets/item1.png', price: '$15.00', description: 'Consectetur adipiscing elit sed do eiusmod', },
      { image: '../../assets/item2.png', price: '$18.50', description: 'Lorem ipsum dolor sit amet consectetur adipiscing', },
      { image: '../../assets/item1.png', price: '$22.00', description: 'Lorem ipsum dolor sit amet consectetur', },
      { image: '../../assets/item2.png', price: '$13.00', description: 'Lorem ipsum dolor sit amet consectetur', },
      { image: '../../assets/item1.png', price: '$16.75', description: 'Ut enim ad minim veniam quis nostrud', },
      { image: '../../assets/item2.png', price: '$20.00', description: 'Tempor incididunt ut labore et dolore magna aliqua', },
      { image: '../../assets/item1.png', price: '$21.00', description: 'Consectetur adipiscing elit sed do eiusmod', },
      { image: '../../assets/item2.png', price: '$14.50', description: 'Lorem ipsum dolor sit amet consectetur adipiscing', }
    ],
    popular_slides: [
      { image: '../../assets/sc1.png', likes: 1780 },
      { image: '../../assets/sc2.png', likes: 1023 },
      { image: '../../assets/sc3.png', likes: 1567 },
      { image: '../../assets/sc2.png', likes: 2301 },
      { image: '../../assets/sc2.png', likes: 984 },
      { image: '../../assets/sc3.png', likes: 1875 },
      { image: '../../assets/sc1.png', likes: 1867 },
      { image: '../../assets/sc3.png', likes: 1567 }
    ],
    just_slides: [
      { image: '../../assets/sc1.png', price: '$17.00', description: 'Ut enim ad minim veniam quis nostrud',},
      { image: '../../assets/sc2.png', price: '$22.50', description: 'Consectetur adipiscing elit sed do eiusmod',},
      { image: '../../assets/sc3.png', price: '$15.30', description: 'Lorem ipsum dolor sit amet consectetur adipiscing',},
      { image: '../../assets/sc2.png', price: '$25.00', description: 'Lorem ipsum dolor sit amet consectetur adipiscing',},
      { image: '../../assets/sc1.png', price: '$19.99', description: 'Consectetur adipiscing elit sed do eiusmod', },
      { image: '../../assets/sc2.png', price: '$30.00', description: 'Consectetur adipiscing elit sed do eiusmod',},
      { image: '../../assets/sc3.png', price: '$12.50', description: 'Tempor incididunt ut labore et dolore magna aliqua', },
      { image: '../../assets/sc1.png', price: '$29.99', description: 'Ut enim ad minim veniam quis nostrud',},
      { image: '../../assets/sc2.png', price: '$24.99', description: 'Consectetur adipiscing elit sed do eiusmod',},
      { image: '../../assets/sc3.png', price: '$18.75', description: 'Tempor incididunt ut labore et dolore magna aliqua',}
    ],
    products: [
      { image: '../../assets/sc1.png', discount: 20 },
      { image: '../../assets/sc2.png', discount: 15 },
      { image: '../../assets/sc3.png', discount: 10 },
      { image: '../../assets/sc4.png', discount: 25 },
      { image: '../../assets/sc2.png', discount: 30 },
      { image: '../../assets/sc1.png', discount: 30 }
    ],
  };

  // ready-page-data
  private ready = [
    {
      image: '/assets/image3.png',
      title: 'Ready?',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      image: '/assets/image3.png',
      title: 'Ready?',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      image: '/assets/image3.png',
      title: 'Ready?',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      image: '/assets/image3.png',
      title: 'Ready?',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      image: '/assets/image3.png',
      title: 'Ready?',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      image: '/assets/image3.png',
      title: 'Ready?',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    }
  ];

  // Orders data for receive page
  private orders: Order[] = [
    {
      orderNumber: 'Order # 922871',
      deliveryType: 'Standard Delivery',
      itemCount: 3,
      status: 'Packed',
      images: ['../../assets/card4.png', '../../assets/card6.png', '../../assets/card2.png', '../../assets/card1.png']
    },
    {
      orderNumber: 'Order # 922872',
      deliveryType: 'Standard Delivery',
      itemCount: 4,
      status: 'Shipped',
      images: ['../../assets/h1.png', '../../assets/h2.png', '../../assets/h3.png', '../../assets/h4.png']
    },
    {
      orderNumber: 'Order # 922873',
      deliveryType: 'Standard Delivery',
      itemCount: 4,
      status: 'Delivered',
      images: ['../../assets/sc1.png', '../../assets/sc2.png', '../../assets/sc3.png', '../../assets/sc4.png']
    },
    {
      orderNumber: 'Order # 922874',
      deliveryType: 'Standard Delivery',
      itemCount: 4,
      status: 'Delivered',
      images: ['../../assets/card4.png', '../../assets/card6.png', '../../assets/card2.png', '../../assets/card1.png']
    },
    {
      orderNumber: 'Order # 922875',
      deliveryType: 'Standard Delivery',
      itemCount: 4,
      status: 'Delivered',
      images: ['../../assets/card4.png', '../../assets/card6.png', '../../assets/card2.png', '../../assets/card1.png']
    }
  ];

  private cartProducts = [
    {
      name: 'Product 1',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      color: 'Pink',
      size: 'M',
      quantity: 0,
      image: '../../assets/cart1.png',
      price: 19.00,
      totalPrice: 0.00
    },
    {
      name: 'Product 2',
      description: 'Adipisicing elit.',
      color: 'Blue',
      size: 'L',
      quantity: 0,
      image: '../../assets/cart2.png',
      price: 15.00,
      totalPrice: 0.00
    }
  ];

  constructor() { }

  getCartProducts() {
    return this.cartProducts;
  }

  getOrders() {
    return this.orders;
  }

  getHomePageData() {
    return this.homePageData;
  }

  getProducts() {
    return this.products;
  }

  getProductsByDiscount(discount: string) {
    if (discount === 'all') {
      return this.products;
    } else {
      const discountPercentage = parseInt(discount);
      return this.products.filter(product => product.discount === discountPercentage);
    }
  }

  getColorOptions() {
    return this.colorOptions;
  }

  getSizeOptions() {
    return this.sizeOptions;
  }

  getShopPageImages() {
    return this.shopPageData.images;
  }

  getCategories() {
    return this.shopPageData.categories;
  }

  getSlides() {
    return this.shopPageData.slides;
  }

  getItemSlides() {
    return this.shopPageData.item_slides;
  }

  getPopularSlides() {
    return this.shopPageData.popular_slides;
  }

  getJustSlides() {
    return this.shopPageData.just_slides;
  }

  getReady() {
    return this.ready;
  }

  getReceiveOrders(): Order[] {
    return this.orders;
  }

  calculateCartTotals(products: any[]) {
    const subtotal = products.reduce((acc, product) => {
      product.totalPrice = product.price * product.quantity;
      return acc + product.totalPrice;
    }, 0);

    const deliveryCharges = subtotal > 0 ? 2.00 : 0.00;
    const total = subtotal + deliveryCharges;

    return { subtotal, deliveryCharges, total };
  }
}