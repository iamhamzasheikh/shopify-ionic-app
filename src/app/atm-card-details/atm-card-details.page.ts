// atm-card-details.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-atm-card-details',
  templateUrl: './atm-card-details.page.html',
  styleUrls: ['./atm-card-details.page.scss'],
})
export class AtmCardDetailsPage implements OnInit {
  cardForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.cardForm = this.formBuilder.group({
      cardholderName: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.minLength(4)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]]
    });
  }

  ngOnInit() {}

  isFormValid(): boolean {
    return this.cardForm.valid;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  saveCard() {
    console.log('Form Values:', this.cardForm.value);
    console.log('Form Valid:', this.cardForm.valid);
    console.log('Form Errors:', this.cardForm.errors);
    
    if (this.cardForm.valid) {
      this.modalCtrl.dismiss(this.cardForm.value);
    }
  }
}