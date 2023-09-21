import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';


// Definición de las rutas para el módulo de inicio (home)
const routes: Routes = [
  {
    path: '', // Ruta raíz
    component: HomeComponent, // Componente asociado a la ruta raíz
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa las rutas definidas
  exports: [RouterModule] // Exporta el módulo de enrutamiento para su uso en otros módulos
})
export class HomeRoutingModule { }