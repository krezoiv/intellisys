import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedesisRoutingModule } from './redesis-routing.module';
import { RedesisComponent } from './redesis.component';
import { DashboardRedesisComponent } from './dashboard-redesis/dashboard-redesis.component';

@NgModule({
  declarations: [
    RedesisComponent,
    DashboardRedesisComponent,
   
  ],
  imports: [
    CommonModule,
    RedesisRoutingModule
  ]
})
export class RedesisModule { }
