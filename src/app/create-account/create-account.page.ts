import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  private validAccounts = [
    { email: 'test@gmail.com', password: '!password123' },
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

  public passwordStrength: string = '';
  public passwordStrengthText: string = '';
  public hasMinLength: boolean = false;
  public hasLetter: boolean = false;
  public hasNumber: boolean = false;
  public hasSpecialChar: boolean = false;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {}

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
      this.alertService.presentAlert('Error', 'Please enter both email and password.');
      return;
    }

    if (!this.validatePassword()) {
      this.alertService.presentPasswordAlert();
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
        this.alertService.presentAlert('Error', !account ? 'Invalid email.' : 'Wrong password.');
      }

      return;
    }

    this.alertService.presentAlert('Success', 'Login Successful!');
    this.resetLoginAttempts();
  }

  validatePassword(): boolean {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(this.password);
  }

  resetLoginAttempts() {
    this.loginAttempts = 0;
    this.isButtonDisabled = false;
    this.buttonText = 'Sign Up';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  checkPasswordStrength() {
    const password = this.password;
    
    this.hasMinLength = password.length >= 8;
    this.hasLetter = /[A-Za-z]/.test(password);
    this.hasNumber = /\d/.test(password);
    this.hasSpecialChar = /[@$!%*?&]/.test(password);

    let strength = 0;
    if (this.hasMinLength) strength++;
    if (this.hasLetter) strength++;
    if (this.hasNumber) strength++;
    if (this.hasSpecialChar) strength++;

    switch (strength) {
      case 0:
      case 1:
        this.passwordStrength = 'weak';
        this.passwordStrengthText = 'Weak';
        break;
      case 2:
      case 3:
        this.passwordStrength = 'medium';
        this.passwordStrengthText = 'Medium';
        break;
      case 4:
        this.passwordStrength = 'strong';
        this.passwordStrengthText = 'Strong';
        break;
    }

    this.checkButtonState();
  }

  checkButtonState() {
    const emailPattern = /^[^\s@]+@gmail\.com$/;
    const isEmailValid = emailPattern.test(this.email.trim());
    const isPasswordValid = this.passwordStrength === 'strong';
    this.isButtonDisabled = !(isEmailValid && isPasswordValid);
  }

  ngOnInit() {
    this.resetLoginAttempts();
    this.checkButtonState();
    console.log('CreateAccountPage Initialized');
  }
}