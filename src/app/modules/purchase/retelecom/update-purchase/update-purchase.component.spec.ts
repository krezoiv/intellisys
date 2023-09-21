import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePurchaseComponent } from './update-purchase.component';

describe('UpdatePurchaseComponent', () => {
  let component: UpdatePurchaseComponent;
  let fixture: ComponentFixture<UpdatePurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePurchaseComponent]
    });
    fixture = TestBed.createComponent(UpdatePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
