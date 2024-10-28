// atm-card-details.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GlobalService } from '../services/global.service'; // import service

@Component({
  selector: 'app-atm-card-details',
  templateUrl: './atm-card-details.page.html',
  styleUrls: ['./atm-card-details.page.scss'],
})
export class AtmCardDetailsPage implements OnInit {
  cardForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private globalService: GlobalService // inject service
  ) {
    this.cardForm = this.formBuilder.group({
      cardholderName: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]],
    });
  }

  ngOnInit() {}

  saveCard() {
    if (this.cardForm.valid) {
      const cardData = this.cardForm.value;
      this.globalService.updateCardDetails(cardData); // Update the card details in the service
      this.modalCtrl.dismiss(cardData);
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
