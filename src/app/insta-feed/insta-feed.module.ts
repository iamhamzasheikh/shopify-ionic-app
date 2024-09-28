import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InstaFeedPageRoutingModule } from './insta-feed-routing.module';
import { InstaFeedPage } from './insta-feed.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstaFeedPageRoutingModule
  ],
  declarations: [InstaFeedPage]
})
export class InstaFeedPageModule {}
