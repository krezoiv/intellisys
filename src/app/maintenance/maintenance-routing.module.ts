import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { DashboardMaintenanceComponent } from './dashboard-maintenance/dashboard-maintenance.component';
import { NewRoleComponent } from './roles/new-role/new-role.component';
import { NewRouteComponent } from './routes/new-route/new-route.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MaintenanceComponent,
    canActivate: [AuthGuard],
    children:[
      { path: 'mantenimiento', component: DashboardMaintenanceComponent},
      { path: 'nuevo-role', component: NewRoleComponent},
      { path: 'nueva-ruta', component: NewRouteComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
