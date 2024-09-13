import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashSalePage } from './flash-sale.page';

describe('FlashSalePage', () => {
  let component: FlashSalePage;
  let fixture: ComponentFixture<FlashSalePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
