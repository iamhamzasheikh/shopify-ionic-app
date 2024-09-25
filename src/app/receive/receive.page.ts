import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {

  constructor(private router: Router) { }
  goToNewPage() {
    this.router.navigate(['/setting']);
  }
  

  ngOnInit() {
  }

}
