import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtmCardDetailsPage } from './atm-card-details.page';

const routes: Routes = [
  {
    path: '',
    component: AtmCardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtmCardDetailsPageRoutingModule {}
