import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  isActionSheetOpen = false;
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  public toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
    },
  ]

  setResult(ev: CustomEvent) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
  

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  constructor() { }

  ngOnInit() {
    // Initialize any default data or settings here
    console.log('TestPage component initialized');
    this.isActionSheetOpen = false; // Ensure default state of action sheet
  }
}
