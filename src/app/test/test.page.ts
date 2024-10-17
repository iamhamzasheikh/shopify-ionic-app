import { Component } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss']
})
export class TestPage {
  // Set default active segment
  activeSegment: string = 'segment1'; // 'segment1' is set as the default active segment

  constructor(public alertService: AlertService) {}

  // Method to set whether the action sheet is open or not (modify as per your AlertService logic)
  setOpen(isOpen: boolean) {
    // Customize this logic as per your AlertService if necessary
    // this.alertService.isActionSheetOpen = isOpen;
  }

  // Logic to switch between segments when user clicks on a button
  selectSegment(segment: string) {
    this.activeSegment = segment;
  }

  // Logs the result when an alert is dismissed
  setResult(event: any) {
    console.log('Alert dismissed with role:', event.detail.role);
  }
}
