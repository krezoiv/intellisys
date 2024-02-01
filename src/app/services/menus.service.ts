import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenusService {


  sideBarMenu: any[]= [
    {
      title: 'Administracion',
      icon: 'fa fa-cogs fa-2x',
      url: 'administracion'
    },
    {
      title: 'Mantenimiento',
      icon: 'fa fas-satellite',
      url: 'mantenimiento'
    },
    {
      title: 'Redesis',
      icon: 'fa fa-cog',
      url: ''
    },

  ]
  constructor() { }
}

