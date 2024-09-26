import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

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

  constructor(
    private actionSheetController: ActionSheetController,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private router: Router
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
          // Explicitly cast dataUrl to string and then sanitize
          const imageDataUrl: string = image.dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustResourceUrl(imageDataUrl);
          this.uniqueId++;
          this.changeDetectorRef.detectChanges();
          
          // Force a layout update
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

  onSaveChanges() {
    this.saveClickCount++;
    
    if (this.saveClickCount === 1) {
      // First click: Save the image
      console.log('Image saved successfully!');
      // Here you would typically send the image to a server or save it locally
      this.buttonText = 'Continue';
      this.changeDetectorRef.detectChanges(); // Force update of button text
    } else if (this.saveClickCount === 2) {
      // Second click: Navigate to the next page
      this.router.navigate(['/payment-method']); // Replace '/next-page' with your actual next page route
    }
  }
}