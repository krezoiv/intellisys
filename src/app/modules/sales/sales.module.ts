import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { NewSaleComponent } from './retelecom/new-sale/new-sale.component';
import { UpdateSaleComponent } from './retelecom/update-sale/update-sale.component';


@NgModule({
  declarations: [
    NewSaleComponent,
    UpdateSaleComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
