import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePurchaseRedesisComponent } from './update-purchase-redesis.component';

describe('UpdatePurchaseRedesisComponent', () => {
  let component: UpdatePurchaseRedesisComponent;
  let fixture: ComponentFixture<UpdatePurchaseRedesisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePurchaseRedesisComponent]
    });
    fixture = TestBed.createComponent(UpdatePurchaseRedesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
