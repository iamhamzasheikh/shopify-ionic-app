import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
register();

@Component({
  selector: 'app-ready',
  templateUrl: './ready.page.html',
  styleUrls: ['./ready.page.scss'],
})
export class ReadyPage {

  constructor(private router: Router) {}

  goToNextPage() {
    this.router.navigate(['/shop']);  // Replace with your desired route
  }

}
