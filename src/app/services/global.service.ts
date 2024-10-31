// // // global.Service.ts
// // import { Injectable } from '@angular/core';
// // import { BehaviorSubject, Observable } from 'rxjs';

// // // Interface for cart products
// // interface CartProduct {
// //   image: string;
// //   description: string;
// //   color: string;
// //   size: string;
// //   price: number;
// //   quantity: number;
// //   totalPrice: number;
// // }

// // // Interface for cart totals
// // interface CartTotals {
// //   subtotal: number;
// //   deliveryCharges: number;
// //   total: number;
// //   shipping?: string;
// //   shippingCost?: number;
// // }

// // // Interface for address and contact information
// // interface AddressInfo {
// //   shippingAddress: string;
// //   contactInfo: {
// //     phone: string;
// //     email: string;
// //   }
// // }

// // // Interface for card details
// // interface CardDetails {
// //   cardholderName: string;
// //   cardNumber: string;
// //   expiryDate: string;
// // }

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class GlobalService {
// //   // Cart products management
// //   private cartProductSubject = new BehaviorSubject<CartProduct[]>([]);
// //   cartProducts$: Observable<CartProduct[]> = this.cartProductSubject.asObservable();

// //   // Cart badge management
// //   private cartBadgeSubject = new BehaviorSubject<number>(0);
// //   cartBadge$: Observable<number> = this.cartBadgeSubject.asObservable();

// //   // Cart totals management
// //   private cartTotalsSubject = new BehaviorSubject<CartTotals>({
// //     subtotal: 0,
// //     deliveryCharges: 0,
// //     total: 0
// //   });
// //   cartTotals$ = this.cartTotalsSubject.asObservable();

// //   // Address information management
// //   private addressInfoSubject = new BehaviorSubject<AddressInfo>({
// //     shippingAddress: '',
// //     contactInfo: {
// //       phone: '',
// //       email: ''
// //     }
// //   });
// //   addressInfo$ = this.addressInfoSubject.asObservable();

// //   constructor() {
// //     this.updateBadgeCount();
// //   }

// //   // Address and contact information methods
// //   updateAddressInfo(addressInfo: AddressInfo) {
// //     this.addressInfoSubject.next(addressInfo);
// //   }

// //   getAddressInfo(): AddressInfo {
// //     return this.addressInfoSubject.getValue();
// //   }

// //   // Cart badge methods
// //   private updateBadgeCount() {
// //     const currentProducts = this.cartProductSubject.getValue();
// //     this.cartBadgeSubject.next(currentProducts.length);
// //   }

// //   // Cart totals methods
// //   updateCartTotals(totals: CartTotals) {
// //     this.cartTotalsSubject.next(totals);
// //   }

// //   getCartTotals(): CartTotals {
// //     return this.cartTotalsSubject.getValue();
// //   }

// //   // Cart product methods
// //   addToCart(product: CartProduct) {
// //     const currentProducts = this.cartProductSubject.getValue();
// //     const existingProductIndex = currentProducts.findIndex(item =>
// //       item.description === product.description &&
// //       item.color === product.color &&
// //       item.size === product.size
// //     );

// //     if (existingProductIndex !== -1) {
// //       const updatedProducts = [...currentProducts];
// //       const existingProduct = updatedProducts[existingProductIndex];
// //       existingProduct.quantity += product.quantity;
// //       existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
// //       this.cartProductSubject.next(updatedProducts);
// //     } else {
// //       currentProducts.push(product);
// //       this.cartProductSubject.next(currentProducts);
// //     }
// //     this.updateBadgeCount();
// //   }

// //   removeFromCart(index: number) {
// //     const currentProducts = this.cartProductSubject.getValue();
// //     currentProducts.splice(index, 1);
// //     this.cartProductSubject.next(currentProducts);
// //     this.updateBadgeCount();
// //   }

// //   updateQuantity(index: number, quantity: number) {
// //     const currentProducts = this.cartProductSubject.getValue();
// //     currentProducts[index].quantity = quantity;
// //     currentProducts[index].totalPrice = currentProducts[index].price * quantity;
// //     this.cartProductSubject.next(currentProducts);
// //   }

// //   // New method to update cart products
// //   updateCartProducts(products: CartProduct[]) {
// //     this.cartProductSubject.next(products);
// //     this.updateBadgeCount();
// //     // Recalculate totals when products are updated
// //     const totals = this.calculateTotals();
// //     this.updateCartTotals(totals);
// //   }

// //   getCartProducts(): CartProduct[] {
// //     return this.cartProductSubject.getValue();
// //   }

// //   clearCart() {
// //     this.cartProductSubject.next([]);
// //     this.updateBadgeCount();
// //   }

// //   calculateTotals() {
// //     const products = this.cartProductSubject.getValue();
// //     const subtotal = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
// //     const deliveryCharges = subtotal > 0 ? 2.00 : 0.00;
// //     const total = subtotal + deliveryCharges;
// //     return { subtotal, deliveryCharges, total };
// //   }

// //     // Card details management
// //  // Default sample data
// //  private cardDetailsSubject = new BehaviorSubject<CardDetails>({
// //   cardholderName: 'AMANDA MORGAN',
// //   cardNumber: '**** **** **** 1579',
// //   expiryDate: '12/22'
// // });

// // cardDetails$ = this.cardDetailsSubject.asObservable();

// // updateCardDetails(cardDetails: CardDetails) {
// //   this.cardDetailsSubject.next(cardDetails);
// // }

// // getCardDetails(): CardDetails {
// //   return this.cardDetailsSubject.getValue() || [];
  
// // }
// // }

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// // Interface for cart products
// interface CartProduct {
//   image: string;
//   description: string;
//   color: string;
//   size: string;
//   price: number;
//   quantity: number;
//   totalPrice: number;
// }

// // Interface for cart totals
// interface CartTotals {
//   subtotal: number;
//   deliveryCharges: number;
//   total: number;
//   shipping?: string;
//   shippingCost?: number;
// }

// // Interface for address and contact information
// interface AddressInfo {
//   shippingAddress: string;
//   contactInfo: {
//     phone: string;
//     email: string;
//   }
// }

// // Interface for card details
// interface CardDetails {
//   cardholderName: string;
//   cardNumber: string;
//   expiryDate: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class GlobalService {
//   // Storage keys
//   private readonly CART_STORAGE_KEY = 'cartProducts';
//   private readonly DELIVERED_STORAGE_KEY = 'deliveredProducts';
//   private readonly ADDRESS_STORAGE_KEY = 'addressInfo';
//   private readonly CARD_STORAGE_KEY = 'cardDetails';
//   private readonly TOTALS_STORAGE_KEY = 'cartTotals';

//   // Cart products management
//   private cartProductSubject = new BehaviorSubject<CartProduct[]>([]);
//   cartProducts$: Observable<CartProduct[]> = this.cartProductSubject.asObservable();

//   // Delivered products management
//   private deliveredProductsSubject = new BehaviorSubject<CartProduct[]>([]);
//   deliveredProducts$: Observable<CartProduct[]> = this.deliveredProductsSubject.asObservable();

//   // Cart badge management
//   private cartBadgeSubject = new BehaviorSubject<number>(0);
//   cartBadge$: Observable<number> = this.cartBadgeSubject.asObservable();

//   // Cart totals management
//   private cartTotalsSubject = new BehaviorSubject<CartTotals>({
//     subtotal: 0,
//     deliveryCharges: 0,
//     total: 0
//   });
//   cartTotals$ = this.cartTotalsSubject.asObservable();

//   // Address information management
//   private addressInfoSubject = new BehaviorSubject<AddressInfo>({
//     shippingAddress: '',
//     contactInfo: {
//       phone: '',
//       email: ''
//     }
//   });
//   addressInfo$ = this.addressInfoSubject.asObservable();

//   // Card details management
//   private cardDetailsSubject = new BehaviorSubject<CardDetails>({
//     cardholderName: 'AMANDA MORGAN',
//     cardNumber: '**** **** **** 1579',
//     expiryDate: '12/22'
//   });
//   cardDetails$ = this.cardDetailsSubject.asObservable();

//   constructor() {
//     this.loadFromStorage();
//     this.updateBadgeCount();
//   }

//   // Storage methods
//   private loadFromStorage() {
//     // Load cart products
//     const savedCart = localStorage.getItem(this.CART_STORAGE_KEY);
//     if (savedCart) {
//       this.cartProductSubject.next(JSON.parse(savedCart));
//     }

//     // Load delivered products
//     const savedDelivered = localStorage.getItem(this.DELIVERED_STORAGE_KEY);
//     if (savedDelivered) {
//       this.deliveredProductsSubject.next(JSON.parse(savedDelivered));
//     }

//     // Load address info
//     const savedAddress = localStorage.getItem(this.ADDRESS_STORAGE_KEY);
//     if (savedAddress) {
//       this.addressInfoSubject.next(JSON.parse(savedAddress));
//     }

//     // Load card details
//     const savedCard = localStorage.getItem(this.CARD_STORAGE_KEY);
//     if (savedCard) {
//       this.cardDetailsSubject.next(JSON.parse(savedCard));
//     }

//     // Load cart totals
//     const savedTotals = localStorage.getItem(this.TOTALS_STORAGE_KEY);
//     if (savedTotals) {
//       this.cartTotalsSubject.next(JSON.parse(savedTotals));
//     }
//   }

//   private saveToStorage() {
//     localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartProductSubject.getValue()));
//     localStorage.setItem(this.DELIVERED_STORAGE_KEY, JSON.stringify(this.deliveredProductsSubject.getValue()));
//     localStorage.setItem(this.ADDRESS_STORAGE_KEY, JSON.stringify(this.addressInfoSubject.getValue()));
//     localStorage.setItem(this.CARD_STORAGE_KEY, JSON.stringify(this.cardDetailsSubject.getValue()));
//     localStorage.setItem(this.TOTALS_STORAGE_KEY, JSON.stringify(this.cartTotalsSubject.getValue()));
//   }

//   // Address and contact information methods
//   updateAddressInfo(addressInfo: AddressInfo) {
//     this.addressInfoSubject.next(addressInfo);
//     this.saveToStorage();
//   }

//   getAddressInfo(): AddressInfo {
//     return this.addressInfoSubject.getValue();
//   }

//   // Cart badge methods
//   private updateBadgeCount() {
//     const currentProducts = this.cartProductSubject.getValue();
//     this.cartBadgeSubject.next(currentProducts.length);
//   }

//   // Cart totals methods
//   updateCartTotals(totals: CartTotals) {
//     this.cartTotalsSubject.next(totals);
//     this.saveToStorage();
//   }

//   getCartTotals(): CartTotals {
//     return this.cartTotalsSubject.getValue();
//   }

//   // Cart product methods
//   addToCart(product: CartProduct) {
//     const currentProducts = this.cartProductSubject.getValue();
//     const existingProductIndex = currentProducts.findIndex(item =>
//       item.description === product.description &&
//       item.color === product.color &&
//       item.size === product.size
//     );

//     if (existingProductIndex !== -1) {
//       const updatedProducts = [...currentProducts];
//       const existingProduct = updatedProducts[existingProductIndex];
//       existingProduct.quantity += product.quantity;
//       existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
//       this.cartProductSubject.next(updatedProducts);
//     } else {
//       currentProducts.push(product);
//       this.cartProductSubject.next(currentProducts);
//     }
//     this.updateBadgeCount();
//     this.saveToStorage();
//   }

//   removeFromCart(index: number) {
//     const currentProducts = this.cartProductSubject.getValue();
//     currentProducts.splice(index, 1);
//     this.cartProductSubject.next(currentProducts);
//     this.updateBadgeCount();
//     this.saveToStorage();
//   }

//   updateQuantity(index: number, quantity: number) {
//     const currentProducts = this.cartProductSubject.getValue();
//     currentProducts[index].quantity = quantity;
//     currentProducts[index].totalPrice = currentProducts[index].price * quantity;
//     this.cartProductSubject.next(currentProducts);
//     this.saveToStorage();
//   }

//   // Status change methods
//   moveToDelivered(product: CartProduct) {
//     // Remove from cart
//     const currentCart = this.cartProductSubject.getValue();
//     const updatedCart = currentCart.filter(item => 
//       !(item.description === product.description && 
//         item.color === product.color && 
//         item.size === product.size));
    
//     // Add to delivered
//     const currentDelivered = this.deliveredProductsSubject.getValue();
//     currentDelivered.push(product);
    
//     // Update both subjects
//     this.cartProductSubject.next(updatedCart);
//     this.deliveredProductsSubject.next(currentDelivered);
    
//     // Update badge and storage
//     this.updateBadgeCount();
//     this.saveToStorage();
//   }

//   getDeliveredProducts(): CartProduct[] {
//     return this.deliveredProductsSubject.getValue();
//   }

//   updateCartProducts(products: CartProduct[]) {
//     this.cartProductSubject.next(products);
//     this.updateBadgeCount();
//     const totals = this.calculateTotals();
//     this.updateCartTotals(totals);
//     this.saveToStorage();
//   }

//   getCartProducts(): CartProduct[] {
//     return this.cartProductSubject.getValue();
//   }

//   clearCart() {
//     this.cartProductSubject.next([]);
//     this.updateBadgeCount();
//     this.saveToStorage();
//   }

//   calculateTotals() {
//     const products = this.cartProductSubject.getValue();
//     const subtotal = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
//     const deliveryCharges = subtotal > 0 ? 2.00 : 0.00;
//     const total = subtotal + deliveryCharges;
//     return { subtotal, deliveryCharges, total };
//   }

//   // Card details methods
//   updateCardDetails(cardDetails: CardDetails) {
//     this.cardDetailsSubject.next(cardDetails);
//     this.saveToStorage();
//   }

//   getCardDetails(): CardDetails {
//     return this.cardDetailsSubject.getValue();
//   }
// }


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Interface for cart products
interface CartProduct {
  image: string;
  description: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

// Interface for cart totals
interface CartTotals {
  subtotal: number;
  deliveryCharges: number;
  total: number;
  shipping?: string;
  shippingCost?: number;
}

// Interface for address and contact information
interface AddressInfo {
  shippingAddress: string;
  contactInfo: {
    phone: string;
    email: string;
  }
}

// Interface for card details
interface CardDetails {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // Storage keys
  private readonly CART_STORAGE_KEY = 'cartProducts';
  private readonly DELIVERED_STORAGE_KEY = 'deliveredProducts';
  private readonly ADDRESS_STORAGE_KEY = 'addressInfo';
  private readonly CARD_STORAGE_KEY = 'cardDetails';
  private readonly TOTALS_STORAGE_KEY = 'cartTotals';

  // Cart products management
  private cartProductSubject = new BehaviorSubject<CartProduct[]>([]);
  cartProducts$: Observable<CartProduct[]> = this.cartProductSubject.asObservable();

  // Delivered products management
  private deliveredProductsSubject = new BehaviorSubject<CartProduct[]>([]);
  deliveredProducts$: Observable<CartProduct[]> = this.deliveredProductsSubject.asObservable();

  // Cart badge management
  private cartBadgeSubject = new BehaviorSubject<number>(0);
  cartBadge$: Observable<number> = this.cartBadgeSubject.asObservable();

  // Cart totals management
  private cartTotalsSubject = new BehaviorSubject<CartTotals>({
    subtotal: 0,
    deliveryCharges: 0,
    total: 0
  });
  cartTotals$ = this.cartTotalsSubject.asObservable();

  // Address information management
  private addressInfoSubject = new BehaviorSubject<AddressInfo>({
    shippingAddress: '',
    contactInfo: {
      phone: '',
      email: ''
    }
  });
  addressInfo$ = this.addressInfoSubject.asObservable();

  // Card details management
  private cardDetailsSubject = new BehaviorSubject<CardDetails>({
    cardholderName: 'AMANDA MORGAN',
    cardNumber: '**** **** **** 1579',
    expiryDate: '12/22'
  });
  cardDetails$ = this.cardDetailsSubject.asObservable();

  constructor() {
    this.loadFromStorage();
    this.updateBadgeCount();
  }

  // Storage methods
  private loadFromStorage() {
    // Load cart products
    const savedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (savedCart) {
      this.cartProductSubject.next(JSON.parse(savedCart));
    }

    // Load delivered products
    const savedDelivered = localStorage.getItem(this.DELIVERED_STORAGE_KEY);
    if (savedDelivered) {
      this.deliveredProductsSubject.next(JSON.parse(savedDelivered));
    }

    // Load address info
    const savedAddress = localStorage.getItem(this.ADDRESS_STORAGE_KEY);
    if (savedAddress) {
      this.addressInfoSubject.next(JSON.parse(savedAddress));
    }

    // Load card details
    const savedCard = localStorage.getItem(this.CARD_STORAGE_KEY);
    if (savedCard) {
      this.cardDetailsSubject.next(JSON.parse(savedCard));
    }

    // Load cart totals
    const savedTotals = localStorage.getItem(this.TOTALS_STORAGE_KEY);
    if (savedTotals) {
      this.cartTotalsSubject.next(JSON.parse(savedTotals));
    }
  }

  private saveToStorage() {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartProductSubject.getValue()));
    localStorage.setItem(this.DELIVERED_STORAGE_KEY, JSON.stringify(this.deliveredProductsSubject.getValue()));
    localStorage.setItem(this.ADDRESS_STORAGE_KEY, JSON.stringify(this.addressInfoSubject.getValue()));
    localStorage.setItem(this.CARD_STORAGE_KEY, JSON.stringify(this.cardDetailsSubject.getValue()));
    localStorage.setItem(this.TOTALS_STORAGE_KEY, JSON.stringify(this.cartTotalsSubject.getValue()));
  }

  // Address and contact information methods
  updateAddressInfo(addressInfo: AddressInfo) {
    this.addressInfoSubject.next(addressInfo);
    this.saveToStorage();
  }

  getAddressInfo(): AddressInfo {
    return this.addressInfoSubject.getValue();
  }

  // Cart badge methods
  private updateBadgeCount() {
    const currentProducts = this.cartProductSubject.getValue();
    this.cartBadgeSubject.next(currentProducts.length);
  }

  // Cart totals methods
  updateCartTotals(totals: CartTotals) {
    this.cartTotalsSubject.next(totals);
    this.saveToStorage();
  }

  getCartTotals(): CartTotals {
    return this.cartTotalsSubject.getValue();
  }

  // Cart product methods
  addToCart(product: CartProduct) {
    const currentProducts = this.cartProductSubject.getValue();
    const existingProductIndex = currentProducts.findIndex(item =>
      item.description === product.description &&
      item.color === product.color &&
      item.size === product.size
    );

    if (existingProductIndex !== -1) {
      const updatedProducts = [...currentProducts];
      const existingProduct = updatedProducts[existingProductIndex];
      existingProduct.quantity += product.quantity;
      existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
      this.cartProductSubject.next(updatedProducts);
    } else {
      currentProducts.push(product);
      this.cartProductSubject.next(currentProducts);
    }
    this.updateBadgeCount();
    this.saveToStorage();
  }

  removeFromCart(index: number) {
    const currentProducts = this.cartProductSubject.getValue();
    currentProducts.splice(index, 1);
    this.cartProductSubject.next(currentProducts);
    this.updateBadgeCount();
    this.saveToStorage();
  }

  updateQuantity(index: number, quantity: number) {
    const currentProducts = this.cartProductSubject.getValue();
    currentProducts[index].quantity = quantity;
    currentProducts[index].totalPrice = currentProducts[index].price * quantity;
    this.cartProductSubject.next(currentProducts);
    this.saveToStorage();
  }

  // Status change methods
  moveToDelivered(product: CartProduct) {
    // Remove from cart
    const currentCart = this.cartProductSubject.getValue();
    const updatedCart = currentCart.filter(item => 
      !(item.description === product.description && 
        item.color === product.color && 
        item.size === product.size));
    
    // Add to delivered
    const currentDelivered = this.deliveredProductsSubject.getValue();
    currentDelivered.push(product);
    
    // Update both subjects
    this.cartProductSubject.next(updatedCart);
    this.deliveredProductsSubject.next(currentDelivered);
    
    // Update badge and storage
    this.updateBadgeCount();
    this.saveToStorage();
  }

  // Remove a specific item from delivered products
  removeDeliveredItem(product: CartProduct) {
    const currentDelivered = this.deliveredProductsSubject.getValue();
    const updatedDelivered = currentDelivered.filter(item => 
      !(item.description === product.description && 
        item.color === product.color && 
        item.size === product.size));
    
    // Update delivered products subject
    this.deliveredProductsSubject.next(updatedDelivered);
    
    // Save to storage
    this.saveToStorage();
  }

  getDeliveredProducts(): CartProduct[] {
    return this.deliveredProductsSubject.getValue();
  }

  updateCartProducts(products: CartProduct[]) {
    this.cartProductSubject.next(products);
    this.updateBadgeCount();
    const totals = this.calculateTotals();
    this.updateCartTotals(totals);
    this.saveToStorage();
  }

  getCartProducts(): CartProduct[] {
    return this.cartProductSubject.getValue();
  }

  clearCart() {
    this.cartProductSubject.next([]);
    this.updateBadgeCount();
    this.saveToStorage();
  }

  calculateTotals() {
    const products = this.cartProductSubject.getValue();
    const subtotal = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    const deliveryCharges = subtotal > 0 ? 2.00 : 0.00;
    const total = subtotal + deliveryCharges;
    return { subtotal, deliveryCharges, total };
  }

  // Card details methods
  updateCardDetails(cardDetails: CardDetails) {
    this.cardDetailsSubject.next(cardDetails);
    this.saveToStorage();
  }

  getCardDetails(): CardDetails {
    return this.cardDetailsSubject.getValue();
  }
}