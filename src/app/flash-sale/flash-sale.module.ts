import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlashSalePageRoutingModule } from './flash-sale-routing.module';

import { FlashSalePage } from './flash-sale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlashSalePageRoutingModule
  ],
  declarations: [FlashSalePage]
})
export class FlashSalePageModule {}
