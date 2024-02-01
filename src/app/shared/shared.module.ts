import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MainHeaderComponent } from './main-header/main-header.component';
import { HeaderAdministrationComponent } from './header-administration/header-administration.component';
import { HeaderMaintenanceComponent } from './header-maintenance/header-maintenance.component';


@NgModule({
  declarations: [
    SidebarComponent,
    MainHeaderComponent,
    HeaderAdministrationComponent,
    HeaderMaintenanceComponent
  ],
  exports:[
    MainHeaderComponent,
    SidebarComponent,
    HeaderAdministrationComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule, 
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
    
  ]
})
export class SharedModule { }
