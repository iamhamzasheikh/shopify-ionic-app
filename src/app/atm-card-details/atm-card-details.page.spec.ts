import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtmCardDetailsPage } from './atm-card-details.page';

describe('AtmCardDetailsPage', () => {
  let component: AtmCardDetailsPage;
  let fixture: ComponentFixture<AtmCardDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmCardDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
