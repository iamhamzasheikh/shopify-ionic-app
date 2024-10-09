import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';  // Import the data service

register();

@Component({
  selector: 'app-ready',
  templateUrl: './ready.page.html',
  styleUrls: ['./ready.page.scss'],
})
export class ReadyPage {
  slides: any[] = [];

  constructor(private router: Router, private dataService: DataService) {
    this.slides = this.dataService.getReady();  // Get the slides from the service
  }

  goToNextPage() {
    this.router.navigate(['/shop']);  // Replace with your desired route
  }
}
