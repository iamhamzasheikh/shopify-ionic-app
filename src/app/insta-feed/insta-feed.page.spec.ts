import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstaFeedPage } from './insta-feed.page';

describe('InstaFeedPage', () => {
  let component: InstaFeedPage;
  let fixture: ComponentFixture<InstaFeedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
