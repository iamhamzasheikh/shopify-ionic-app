import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-insta-feed',
  templateUrl: './insta-feed.page.html',
  styleUrls: ['./insta-feed.page.scss'],
})
export class InstaFeedPage implements OnInit {

  feeds = [
    {
      profilePicture: '../../assets/card2.png',
      username: 'hamzsheikhofficial',
      musicInfo: 'Beyoncé - ENERGY (feat. Beam)',
      slides: [
        { imageUrl: '../../assets/pg1.png', altText: 'Slide Image 1' },
        { imageUrl: '../../assets/sc2.png', altText: 'Slide Image 2' },
        { imageUrl: '../../assets/sc3.png', altText: 'Slide Image 3' },
      ]
    },
    {
      profilePicture: '../../assets/card3.png',
      username: 'another_user',
      musicInfo: 'Another Song - Artist',
      slides: [
        { imageUrl: '../../assets/pg2.png', altText: 'Slide Image 4' },
        { imageUrl: '../../assets/sc4.png', altText: 'Slide Image 5' },
        { imageUrl: '../../assets/sc5.png', altText: 'Slide Image 6' },
      ]
    },
    // Add more feeds as needed...
    {
      profilePicture: '../../assets/card2.png',
      username: 'hamzsheikhofficial',
      musicInfo: 'Beyoncé - ENERGY (feat. Beam)',
      slides: [
        { imageUrl: '../../assets/pg1.png', altText: 'Slide Image 1' },
        { imageUrl: '../../assets/sc2.png', altText: 'Slide Image 2' },
        { imageUrl: '../../assets/sc3.png', altText: 'Slide Image 3' },
      ]
    },
    {
      profilePicture: '../../assets/card2.png',
      username: 'hamzsheikhofficial',
      musicInfo: 'Beyoncé - ENERGY (feat. Beam)',
      slides: [
        { imageUrl: '../../assets/pg1.png', altText: 'Slide Image 1' },
        { imageUrl: '../../assets/sc2.png', altText: 'Slide Image 2' },
        { imageUrl: '../../assets/sc3.png', altText: 'Slide Image 3' },
      ]
    },
    {
      profilePicture: '../../assets/card2.png',
      username: 'hamzsheikhofficial',
      musicInfo: 'Beyoncé - ENERGY (feat. Beam)',
      slides: [
        { imageUrl: '../../assets/pg1.png', altText: 'Slide Image 1' },
        { imageUrl: '../../assets/sc2.png', altText: 'Slide Image 2' },
        { imageUrl: '../../assets/sc3.png', altText: 'Slide Image 3' },
      ]
    },
    {
      profilePicture: '../../assets/card2.png',
      username: 'hamzsheikhofficial',
      musicInfo: 'Beyoncé - ENERGY (feat. Beam)',
      slides: [
        { imageUrl: '../../assets/pg1.png', altText: 'Slide Image 1' },
        { imageUrl: '../../assets/sc2.png', altText: 'Slide Image 2' },
        { imageUrl: '../../assets/sc3.png', altText: 'Slide Image 3' },
      ]
    },
    {
      profilePicture: '../../assets/card2.png',
      username: 'hamzsheikhofficial',
      musicInfo: 'Beyoncé - ENERGY (feat. Beam)',
      slides: [
        { imageUrl: '../../assets/pg1.png', altText: 'Slide Image 1' },
        { imageUrl: '../../assets/sc2.png', altText: 'Slide Image 2' },
        { imageUrl: '../../assets/sc3.png', altText: 'Slide Image 3' },
      ]
    },
    {
      profilePicture: '../../assets/card2.png',
      username: 'hamzsheikhofficial',
      musicInfo: 'Beyoncé - ENERGY (feat. Beam)',
      slides: [
        { imageUrl: '../../assets/pg1.png', altText: 'Slide Image 1' },
        { imageUrl: '../../assets/sc2.png', altText: 'Slide Image 2' },
        { imageUrl: '../../assets/sc3.png', altText: 'Slide Image 3' },
      ]
    },
  ];

  currentSlide: number = 0;

  onSlideChange(event: any) {
    this.currentSlide = event.realIndex; // This should update correctly
  }
  
  constructor() { }

  ngOnInit() {
  }
}
