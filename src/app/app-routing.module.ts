import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Definición de las rutas principales de la aplicación
const routes: Routes = [
  {
    path: 'authentication', // Ruta para la autenticación
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) // Carga el módulo AuthModule bajo demanda
  },
  {
    path: 'home', // Ruta para la página de inicio
    loadChildren: () => import('./modules/home.module').then(m => m.HomeModule) // Carga el módulo HomeModule bajo demanda
  },
  {
    path: 'compras', // Ruta para el módulo de compras
    loadChildren: () => import('./modules/purchase/purchase.module').then(m => m.PurchaseModule) // Carga el módulo PurchaseModule bajo demanda
  },
  {
    path: 'ventas', // Ruta para el módulo de ventas
    loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule) // Carga el módulo SalesModule bajo demanda
  },
  {
    path: '**', // Ruta por defecto para cualquier otra URL no especificada
    redirectTo: 'authentication' // Redirige a la página de autenticación por defecto
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura las rutas principales
  exports: [RouterModule] // Exporta el módulo de enrutamiento para su uso en la aplicación
})
export class AppRoutingModule { }