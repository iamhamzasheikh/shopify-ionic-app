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

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // Cart products management
  private cartProductSubject = new BehaviorSubject<CartProduct[]>([]);
  cartProducts$: Observable<CartProduct[]> = this.cartProductSubject.asObservable();

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

  constructor() {
    this.updateBadgeCount();
  }

  // Address and contact information methods
  updateAddressInfo(addressInfo: AddressInfo) {
    this.addressInfoSubject.next(addressInfo);
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
  }

  removeFromCart(index: number) {
    const currentProducts = this.cartProductSubject.getValue();
    currentProducts.splice(index, 1);
    this.cartProductSubject.next(currentProducts);
    this.updateBadgeCount();
  }

  updateQuantity(index: number, quantity: number) {
    const currentProducts = this.cartProductSubject.getValue();
    currentProducts[index].quantity = quantity;
    currentProducts[index].totalPrice = currentProducts[index].price * quantity;
    this.cartProductSubject.next(currentProducts);
  }

  // New method to update cart products
  updateCartProducts(products: CartProduct[]) {
    this.cartProductSubject.next(products);
    this.updateBadgeCount();
    // Recalculate totals when products are updated
    const totals = this.calculateTotals();
    this.updateCartTotals(totals);
  }

  getCartProducts(): CartProduct[] {
    return this.cartProductSubject.getValue();
  }

  clearCart() {
    this.cartProductSubject.next([]);
    this.updateBadgeCount();
  }

  calculateTotals() {
    const products = this.cartProductSubject.getValue();
    const subtotal = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    const deliveryCharges = subtotal > 0 ? 2.00 : 0.00;
    const total = subtotal + deliveryCharges;
    return { subtotal, deliveryCharges, total };
  }
}