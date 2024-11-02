import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
  profileImage: SafeResourceUrl | string = '../../assets/avatar12.png';
  uniqueId: number = 0;
  saveClickCount: number = 0;
  buttonText: string = 'Save Changes';
  isLoading: boolean = false;
  
  // User data properties
  userName: string = '';
  userEmail: string = '';

  constructor(
    private actionSheetController: ActionSheetController,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Change Profile Picture',
      buttons: [
        {
          text: 'Choose from Gallery',
          icon: 'image',
          handler: () => {
            this.getPicture(CameraSource.Photos);
          }
        },
        {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => {
            this.getPicture(CameraSource.Camera);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async getPicture(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: source
      });
      
      if (image && image.dataUrl) {
        this.ngZone.run(() => {
          const imageDataUrl: string = image.dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustResourceUrl(imageDataUrl);
          this.uniqueId++;
          this.changeDetectorRef.detectChanges();
          
          this.platform.ready().then(() => {
            setTimeout(() => {
              this.changeDetectorRef.detectChanges();
            }, 0);
          });
        });
      }
    } catch (error) {
      console.error('Error taking picture', error);
    }
  }

  getProfileImageSrc(): SafeResourceUrl {
    return typeof this.profileImage === 'string'
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.profileImage)
      : this.profileImage;
  }

  async onSaveChanges() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.saveClickCount++;
    
    try {
      if (this.saveClickCount === 1) {
        // First click: Save the profile changes
        await this.saveProfileChanges();
        this.buttonText = 'Continue';
      } else if (this.saveClickCount === 2) {
        // Second click: Navigate to payment method page
        await this.router.navigate(['/payment-method']);
      }
    } catch (error) {
      console.error('Error in save changes:', error);
    } finally {
      this.isLoading = false;
      this.changeDetectorRef.detectChanges();
    }
  }

  private async saveProfileChanges(): Promise<void> {
    try {
      // Get current user
      const user = await this.afAuth.currentUser;
      if (user) {
        // Update profile in Firebase
        await user.updateProfile({
          displayName: this.userName,
          photoURL: typeof this.profileImage === 'string' ? this.profileImage : ''
        });

        // Optionally update email if it has changed
        if (user.email !== this.userEmail) {
          await user.updateEmail(this.userEmail);
        }

        console.log('Profile changes saved successfully!');
      }
    } catch (error) {
      console.error('Error saving profile changes:', error);
      throw error;
    }
  }

  async loginWithGoogle() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      
      if (result.user) {
        // Update profile image
        if (result.user.photoURL) {
          this.profileImage = this.sanitizer.bypassSecurityTrustResourceUrl(result.user.photoURL);
        }
        
        // Update name and email
        this.userName = result.user.displayName || '';
        this.userEmail = result.user.email || '';
        
        // Update the UI
        this.changeDetectorRef.detectChanges();
        
        console.log('Google login successful!');
      }
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      this.isLoading = false;
      this.changeDetectorRef.detectChanges();
    }
  }

  // Optional: Method to handle sign out
  async signOut() {
    try {
      await this.afAuth.signOut();
      // Reset user data
      this.profileImage = '../../assets/avatar12.png';
      this.userName = '';
      this.userEmail = '';
      this.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  // Optional: Method to check if user is logged in
  async checkAuthState() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // User is signed in
        this.profileImage = user.photoURL ? 
          this.sanitizer.bypassSecurityTrustResourceUrl(user.photoURL) : 
          '../../assets/avatar12.png';
        this.userName = user.displayName || '';
        this.userEmail = user.email || '';
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}