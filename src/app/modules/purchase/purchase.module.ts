import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { UpdatePurchaseComponent } from './retelecom/update-purchase/update-purchase.component';
import { NewPurchaseComponent } from './retelecom/new-purchase/new-purchase.component';

import { PurchaseDasboardComponent } from './purchase-dasboard.component';
import { NewPurchaseRedesisComponent } from './redesis/new-purchase-redesis/new-purchase-redesis.component';
import { UpdatePurchaseRedesisComponent } from './redesis/update-purchase-redesis/update-purchase-redesis.component';



@NgModule({
  declarations: [
    PurchaseDasboardComponent,
    NewPurchaseRedesisComponent,
    UpdatePurchaseRedesisComponent,

  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule
  ]
})
export class PurchaseModule { }
