import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { FlashSalePageRoutingModule } from './flash-sale-routing.module';

import { FlashSalePage } from './flash-sale.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlashSalePageRoutingModule
  ],
  declarations: [FlashSalePage]
})
export class FlashSalePageModule {}
