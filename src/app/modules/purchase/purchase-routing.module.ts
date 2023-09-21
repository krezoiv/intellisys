import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseDasboardComponent } from './purchase-dasboard.component';
import { NewPurchaseRedesisComponent } from './redesis/new-purchase-redesis/new-purchase-redesis.component';
import { UpdatePurchaseRedesisComponent } from './redesis/update-purchase-redesis/update-purchase-redesis.component';


// Definición de las rutas para el módulo de compras
const routes: Routes = [
  {
    path: '',
    children: [
      // Ruta para el panel de control de compras
      { path: 'dashboard-compras', component: PurchaseDasboardComponent },

      // Ruta para crear una nueva compra de redesis
      { path: 'dashboard-compra-nueva-redesis', component: NewPurchaseRedesisComponent },

      // Ruta para modificar una compra de redesis existente
      { path: 'dashboard-compra-modificar-redesis', component: UpdatePurchaseRedesisComponent },

      // Ruta por defecto, se redirige al panel de control de compras
      { path: '**', component: PurchaseDasboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }