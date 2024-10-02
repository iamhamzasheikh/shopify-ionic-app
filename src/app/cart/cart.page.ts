import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {

  products = [
    {
      name: 'Product 1', description: 'Lorem ipsum dolor sit amet consectetur.',
      color: 'Pink', size: 'M', quantity: 0,
      image: '../../assets/cart1.png', price: 19.00, totalPrice: 0.00
    },


    {
      name: 'Product 2', description: 'Adipisicing elit.',
      color: 'Blue', size: 'L', quantity: 0,
      image: '../../assets/cart2.png', price: 15.00, totalPrice: 0.00
    },
  ];

  newProductAdded: any = null;

  constructor(private router: Router, private alertController: AlertController) {
    this.calculateTotals(); // Initial calculation
  }

  goToNextPage() {
    this.router.navigate(['/payment']);
  }


  deliveryCharges: number = 0; // Static delivery charges
  subtotal: number = 0;
  total: number = 0;

  // Modify the decrement function to recalculate totals
  async decrement(product: any) {
    if (product.quantity > 0) {
      product.quantity--;
      this.calculateTotals();  // Recalculate totals after decrementing
    }

    if (product.quantity === 0) {
      await this.showAlert('Quantity Zero', 'The product quantity cannot be less than 0.');

      // Remove the product from the products array
      this.removeProduct(product);  // New addition to remove the product
    }

  }



  // Modify the increment function to recalculate totals  // Modify the increment function to recalculate totals
  async increment(product: any) {
    product.quantity++;
    this.calculateTotals();  // Recalculate totals after incrementing

    if (product.quantity > 5) {
      await this.showAlert('Quantity Limit Exceeded', 'The maximum allowed quantity per product is 5.');

      // Add a new product to the container (if not already added)
      if (!this.newProductAdded) {
        this.addNewProduct();  // Only add if it's not already added
      }
    }
  }
  // Function to remove a product from the products array
  removeProduct(product: any) {
    this.products = this.products.filter(p => p !== product); // Remove the product
    this.calculateTotals(); // Recalculate totals after removal
  }
  // Function to add a new product to the product list
  // Function to add a new product to the product list
  addNewProduct() {
    this.newProductAdded = {
      name: 'New Product', description: 'A newly added product after exceeding the limit.',
      color: 'Red', size: 'S', quantity: 1,
      image: '../../assets/cart1.png', price: 20.00, totalPrice: 0.00
    };

    // Add the new product to the list
    this.products.push(this.newProductAdded);

    // Recalculate totals after adding the new product
    this.calculateTotals();
  }

  // Function to remove the newly added product
  removeNewProduct() {
    if (this.newProductAdded) {
      this.products = this.products.filter(product => product !== this.newProductAdded); // Remove it from the array
      this.newProductAdded = null;  // Reset the new product tracker
      this.calculateTotals();  // Recalculate totals after removal
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Calculate subtotal and total
  // Method to calculate subtotal and total
  calculateTotals() {
    this.subtotal = this.products.reduce((acc, product) => {
      product.totalPrice = product.price * product.quantity; // Update totalPrice for each product
      return acc + product.totalPrice; // Accumulate subtotal
    }, 0);

    // Set delivery charges based on whether any product is selected
    this.deliveryCharges = this.subtotal > 0 ? 2.00 : 0.00;

    this.total = this.subtotal + this.deliveryCharges; // Total includes delivery charges
  }
}
