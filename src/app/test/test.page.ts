import { Component } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss']
})
export class TestPage {
  constructor(public alertService: AlertService) {}

  // Action sheet handler
  setOpen(isOpen: boolean) {
    // Remove this line as isActionSheetOpen doesn't exist in AlertService
    // this.alertService.isActionSheetOpen = isOpen;
  }

  // For other actions like dismiss events, you can directly call methods
  setResult(event: any) {
    console.log('Alert dismissed with role:', event.detail.role);
  }
}