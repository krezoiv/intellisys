import { Component } from '@angular/core';
import { MenusService } from 'src/app/services/menus.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  sideBarMenuItems: any[];

  constructor( private menuService: MenusService ) {

    this.sideBarMenuItems = menuService.sideBarMenu;
    console.log(this.sideBarMenuItems)
  }


  ngOnInit(): void {
    
  }

}
