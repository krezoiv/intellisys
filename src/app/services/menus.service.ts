import { Injectable } from '@angular/core';
import { expand } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  sideBarMenu: any[] = [
    {
      title: 'Administración',
      icon: 'fa fa-cogs fa-2x',
      url: 'administracion',
      expanded: false,
      isActive: false,
      submenu: [
        {
          title: 'Usuarios',
          icon: 'fa fa-sticky-note',
          url: 'administracion/usuarios/listado-de-usuarios',
          expanded: false,
          isActive: false
        },
        {
          title: 'Data Oficial',
          icon: 'fa fa-sticky-note',
          url: 'administracion/data-oficial',
          expanded: false,
          isActive: false
        }

      ]
    },
    {
      title: 'Retelecom',
      icon: 'fa fa-cogs fa-2x',
      url: 'administracion',
      expended: false,
      isActive: false,
      submenu: [
        {
          title: 'Notas',
          icon: 'fa fa-sticky-note',
          url: 'administracion',
          expanded: false,
          isActive: false
        }
      ]
    },
    {
      title: 'Redesis',
      icon: 'fa fa-cogs fa-2x',
      url: 'administracion',
      expended: false,
      isActive: false,
      submenu: [
        {
          title: 'Empleados',
          icon: 'fa-regular fa-address-card',
          url: 'administracion/empleados/listado-de-empleados',
          expanded: false,
          isActive: false
        }
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'fa fa-cogs fa-2x',
      url: 'administracion',
      expended: false,
      isActive: false,
      submenu: [
        {
          title: 'Asignacion de DLP',
          icon: 'fa-regular fa-address-card',
          url: 'administracion/asignacion-dlp',
          expanded: false,
          isActive: false
        }
      ]
    },
    
  ];

  constructor() { }
}