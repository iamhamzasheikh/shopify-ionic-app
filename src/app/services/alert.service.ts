import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentPasswordAlert() {
    await this.presentAlert('Weak Password', 'Your password must be at least 8 characters long, contain letters, numbers, and special characters. Try including a word like "strong_password123_!".');
  }

  async showQuantityZeroAlert() {
    await this.presentAlert('Quantity Zero', 'The product quantity cannot be less than 0.');
  }

  async showQuantityLimitExceededAlert() {
    await this.presentAlert('Quantity Limit Exceeded', 'The maximum allowed quantity per product is 5.');
  }
}