import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  consoleOutput: string = ''; // Initialize the output variable
  // Array to store email and password pairs
  private validAccounts = [
    { email: 'test@example.com', password: 'password123' },
    { email: 'user@example.com', password: 'password' }
  ];

  constructor(private router: Router) { }

  displayInputValues(email: string, password: string) {
    // Check if email and password match any entry in the validAccounts array
    const account = this.validAccounts.find(acc => acc.email === email);

    if (account) {
      if (account.password === password) {
        alert('Login Success!'); // Show success alert
        this.consoleOutput = `Logged in with Email: ${email}`;
      } else {
        alert('Invalid Password!'); // Show alert for wrong password
        this.consoleOutput = `Invalid password for Email: ${email}`;
      }
    } else {
      alert('Invalid Email!'); // Show alert for wrong email
      this.consoleOutput = `No account found for Email: ${email}`;
    }

    console.log(this.consoleOutput); // Log it to the console (optional)
  }

  ngOnInit() {}
}
