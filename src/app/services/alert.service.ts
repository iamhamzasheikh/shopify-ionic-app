import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) {}

  // Generic Alert
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Generic Password Alert
  async presentPasswordAlert() {
    const alert = await this.alertController.create({
      header: 'Password Error',
      message: 'Password does not meet requirements.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Alerts specific to Create Account Page
  async presentCreateAccountEmailError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Please enter both email and password.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentInvalidEmailAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Invalid email.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentWrongPasswordAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Wrong password.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoginSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Login Successful!',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Alerts specific to Cart Page
  async showQuantityZeroAlert() {
    const alert = await this.alertController.create({
      header: 'Item Removed',
      message: 'The item has been removed from your cart as the quantity is zero.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showQuantityLimitExceededAlert() {
    const alert = await this.alertController.create({
      header: 'Quantity Limit Exceeded',
      message: 'You have exceeded the quantity limit for this item. A new product has been added to your cart.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel', // This will set the role to 'cancel' which closes the alert
          cssClass: 'custom-cancel-button' // Apply a CSS class to Cancel button
        },
        {
          text: 'OK',
          role: 'confirm' ,// Optional: You can give the OK button a confirm role if needed
          cssClass: 'custom-ok-button' // Apply a CSS class to OK button

        }
      ]
    });
    await alert.present();
  }
  
}