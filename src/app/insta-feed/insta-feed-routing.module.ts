import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstaFeedPage } from './insta-feed.page';

const routes: Routes = [
  {
    path: '',
    component: InstaFeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstaFeedPageRoutingModule {}
