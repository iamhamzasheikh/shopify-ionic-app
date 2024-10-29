// payment-method.page.ts
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AtmCardDetailsPage } from '../atm-card-details/atm-card-details.page';
import { GlobalService } from '../services/global.service'; 
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {
  cardDetails = {
    cardholderName: '',
    cardNumber: '',
    expiryDate: ''
  };

  constructor(
    private modalCtrl: ModalController,
    private globalService: GlobalService, // Inject GlobalService
    private location: Location 
  ) {}

  ngOnInit() {
    // Fetch card details from GlobalService on component initialization
    this.cardDetails = this.globalService.getCardDetails();
  }

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
      // Update local cardDetails with data from the service
      this.globalService.updateCardDetails(data); // Save updated data to service
      this.cardDetails = {
        cardholderName: data.cardholderName,
        cardNumber: this.formatCardNumber(data.cardNumber),
        expiryDate: data.expiryDate
      };
    }
  }

  private formatCardNumber(number: string): string {
    return '**** **** **** ' + number.slice(-4);
  }

   // Method to navigate back
   goBack() {
    this.location.back();
  }
}
