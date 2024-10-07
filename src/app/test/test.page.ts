import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(public alertService: AlertService) { }  // Make sure AlertService is public

  ngOnInit() {
    console.log('TestPage component initialized');
    this.alertService.setActionSheetOpen(false); // Initialize action sheet state
  }

  // Use this method to set the result of the alert
  setResult(ev: CustomEvent) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  // Set action sheet state
  setOpen(isOpen: boolean) {
    this.alertService.setActionSheetOpen(isOpen);
  }
}