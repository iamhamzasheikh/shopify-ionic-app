import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface CartProduct {
  image: string;
  description: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // Initialize with empty cart product
  private cartProductSubject = new BehaviorSubject<CartProduct[]>([]);
  cartProducts$: Observable<CartProduct[]> = this.cartProductSubject.asObservable();

  constructor() { }

  // Method to add product to cart
  addToCart(product: CartProduct) {
    const currentProducts = this.cartProductSubject.getValue();
    currentProducts.push(product);
    this.cartProductSubject.next(currentProducts);
  }

  // Method to remove product from cart
  removeFromCart(index: number) {
    const currentProducts = this.cartProductSubject.getValue();
    currentProducts.splice(index, 1);
    this.cartProductSubject.next(currentProducts);
  }

  // Method to update quantity
  updateQuantity(index: number, quantity: number) {
    const currentProducts = this.cartProductSubject.getValue();
    currentProducts[index].quantity = quantity;
    currentProducts[index].totalPrice = currentProducts[index].price * quantity;
    this.cartProductSubject.next(currentProducts);
  }

  // Method to get current cart products
  getCartProducts(): CartProduct[] {
    return this.cartProductSubject.getValue();
  }

  // Method to clear cart
  clearCart() {
    this.cartProductSubject.next([]);
  }

  // Method to calculate totals
  calculateTotals() {
    const products = this.cartProductSubject.getValue();
    const subtotal = products.reduce((acc, product) => acc + product.totalPrice, 0);
    const deliveryCharges = subtotal > 0 ? 2.00 : 0.00;
    const total = subtotal + deliveryCharges;

    return { subtotal, deliveryCharges, total };
  }
}