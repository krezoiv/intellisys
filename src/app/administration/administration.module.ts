import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';

import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';

import { DashboardAdministrationComponent } from './dashboard-administration/dashboard-administration.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NewUserComponent } from './users/new-user/new-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DialogAddUserComponent } from './users/new-user/dialog-add-user/dialog-add-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { DialogEditEmployeeComponent } from './employees/dialog-edit-employee/dialog-edit-employee.component';
import { DialogDeleteEmployeeComponent } from './employees/dialog-delete-employee/dialog-delete-employee.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DlpAssignmentComponent } from './employees/dlp-assignment/dlp-assignment.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { NewDataComponent } from './dataCommission/new-data/new-data.component';
import { AddNewConceptCommissionDialogComponent } from './dataCommission/add-new-concept-commission-dialog/add-new-concept-commission-dialog.component';
import { IonicModule } from '@ionic/angular';
import { UpdateCommissionDetailDialogComponent } from './dataCommission/update-commission-detail-dialog/update-commission-detail-dialog.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    NewEmployeeComponent,
    DashboardAdministrationComponent,
    NewUserComponent,
    EditUserComponent,
    DialogAddUserComponent,
    ListEmployeesComponent,
    DialogEditEmployeeComponent,
    DialogDeleteEmployeeComponent,
    DlpAssignmentComponent,
    ListUsersComponent,
    NewDataComponent,
    AddNewConceptCommissionDialogComponent,
    UpdateCommissionDetailDialogComponent,

  ],
  exports:[
    AdministrationComponent,
    NewEmployeeComponent,
    DashboardAdministrationComponent,
    NewUserComponent,
    EditUserComponent,
    DialogAddUserComponent,
    ListEmployeesComponent,
    DialogEditEmployeeComponent,
    DialogDeleteEmployeeComponent,
    DlpAssignmentComponent,
    ListUsersComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    AdministrationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,  
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatGridListModule,
    ToastrModule.forRoot(), // Agrega ToastrModule a la lista de imports
    
  ]
})
export class AdministrationModule { }
