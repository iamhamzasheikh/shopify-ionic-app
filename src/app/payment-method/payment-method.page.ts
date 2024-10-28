// payment-method.page.ts
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AtmCardDetailsPage } from '../atm-card-details/atm-card-details.page';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {
  cardDetails = {
    cardholderName: 'AMANDA MORGAN',
    cardNumber: '**** **** **** 1579',
    expiryDate: '12/22'
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openCardModal() {
    const modal = await this.modalCtrl.create({
      component: AtmCardDetailsPage,
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5,
      cssClass: 'card-details-modal'
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.cardDetails = {
        cardholderName: data.cardholderName,
        cardNumber: this.formatCardNumber(data.cardNumber),
        expiryDate: data.expiryDate
      };
    }
    console.log(data);
  }

  private formatCardNumber(number: string): string {
    return '**** **** **** ' + number.slice(-4);
  }
}