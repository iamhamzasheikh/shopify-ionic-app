import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  private validAccounts = [
    { email: 'test@example.com', password: 'password123' },
    { email: 'user@example.com', password: 'password' }
  ];

  private loginAttempts: number = 0;
  public isButtonDisabled: boolean = true;
  public buttonText: string = 'Sign Up';
  private countdown: number = 0;
  private countdownInterval: any;
  public isPermanentlyDisabled: boolean = false;
  public showPassword: boolean = false;
  public email: string = '';
  public password: string = '';

  constructor(private router: Router, private alertController: AlertController) { }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  disableButtonAndStartCountdown(seconds: number) {
    this.isButtonDisabled = true;
    this.countdown = seconds;
    this.updateButtonText();

    clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      this.updateButtonText();

      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        if (!this.isPermanentlyDisabled) {
          this.isButtonDisabled = false;
          this.buttonText = 'Sign Up';
        }
      }
    }, 1000);
  }

  updateButtonText() {
    if (this.isPermanentlyDisabled) {
      this.buttonText = 'Permanently Disabled';
    } else if (this.isButtonDisabled) {
      this.buttonText = `Wait ${this.countdown}s`;
    } else {
      this.buttonText = 'Sign Up';
    }
  }

  displayInputValues() {
    if (!this.email || !this.password) {
      this.presentAlert('Error', 'Please enter both email and password.');
      return;
    }

    const account = this.validAccounts.find(acc => acc.email === this.email);

    if (!account || account.password !== this.password) {
      this.loginAttempts++;

      if (this.loginAttempts === 3) {
        this.disableButtonAndStartCountdown(10);
      } else if (this.loginAttempts === 5) {
        this.disableButtonAndStartCountdown(30);
      } else if (this.loginAttempts === 6) {
        this.isPermanentlyDisabled = true;
        this.isButtonDisabled = true;
        this.buttonText = 'Permanently Disabled';
      }

      if (this.loginAttempts < 3 || this.loginAttempts === 4) {
        this.presentAlert('Error', !account ? 'Invalid email.' : 'Wrong password.');
      }

      return;
    }

    this.presentAlert('Success', 'Login Successful!');
    this.resetLoginAttempts();
  }

  resetLoginAttempts() {
    this.loginAttempts = 0;
    this.isButtonDisabled = false;
    this.buttonText = 'Sign Up';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  checkButtonState() {
    // Regex pattern for validating email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Enable button if the email is in valid format
    const emailIsValid = emailPattern.test(this.email.trim());
    this.isButtonDisabled = !emailIsValid;
  }

  ngOnInit() {
    this.resetLoginAttempts();
    this.checkButtonState();
    console.log('CreateAccountPage Initialized');
  }
}
