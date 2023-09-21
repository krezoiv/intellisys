import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPurchaseRedesisComponent } from './new-purchase-redesis.component';

describe('NewPurchaseRedesisComponent', () => {
  let component: NewPurchaseRedesisComponent;
  let fixture: ComponentFixture<NewPurchaseRedesisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPurchaseRedesisComponent]
    });
    fixture = TestBed.createComponent(NewPurchaseRedesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
