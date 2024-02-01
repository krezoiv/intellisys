import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { DashboardAdministrationComponent } from './dashboard-administration/dashboard-administration.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { DlpAssignmentComponent } from './employees/dlp-assignment/dlp-assignment.component';
import { AuthGuard } from '../guards/auth.guard';
import { ListUsersComponent } from './users/list-users/list-users.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: AdministrationComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'administracion', component: DashboardAdministrationComponent },
      { path: 'administracion/empleados/nuevo-empleado', component: NewEmployeeComponent },
      { path: 'administracion/empleados/listado-de-empleados', component: ListEmployeesComponent},
      { path: 'administracion/usuarios/nuevo-usuario', component: NewUserComponent},
      { path: 'administracion/usuarios/listado-de-usuarios', component: ListUsersComponent},
      { path: 'administracion/asignacion-dlp', component: DlpAssignmentComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
