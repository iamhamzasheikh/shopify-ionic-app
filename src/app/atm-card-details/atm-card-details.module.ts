// atm-card-details.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AtmCardDetailsPageRoutingModule } from './atm-card-details-routing.module';
import { AtmCardDetailsPage } from './atm-card-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AtmCardDetailsPageRoutingModule
  ],
  declarations: [AtmCardDetailsPage]
})
export class AtmCardDetailsPageModule {}