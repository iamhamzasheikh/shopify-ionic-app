import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';  // Import DataService

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  homePageData: any;  // Variable to hold the home page data

  constructor(
    private router: Router,
    private dataService: DataService  // Inject the DataService
  ) {}

  ngOnInit() {
    // Fetch home page data from DataService
    this.homePageData = this.dataService.getHomePageData();
  }

  goToNextPage() {
    // Navigate to the 'create-account' page
    this.router.navigate(['/create-account']);
  }
}
