import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlashSalePage } from './flash-sale.page';

const routes: Routes = [
  {
    path: '',
    component: FlashSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlashSalePageRoutingModule {}
