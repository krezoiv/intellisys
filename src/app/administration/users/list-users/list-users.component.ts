import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/data/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {

  displayColumns : string[] = [
    'position',
    'idUser',
    'userCode',
    'idEmployee',
    'names',
    'userName',
    'firstName',
    'secondName',
    'firstLastName',
    'secondLastName',
    'idRole',
    'roleName',
    'idStatus',
    'status',
    'actions'
  ]

  dataSource:MatTableDataSource<UserModel>=
  new MatTableDataSource<UserModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private _userService : UsersService
  ){}

  ngOnInit(): void {
    
    this.getUsersList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getUsersList(){
    this._userService.getUsersDetails().subscribe(
      (users) => {
        this.dataSource.data = users
        
      },
      (error) => {
        console.error('Error al obtener la lista de empleados:', error);
      }
    )
  }

  deActivateUser(idUser: number) {
    // Primero, obtén el nombre del empleado utilizando una llamada al servidor
    this._userService.getUsersDetails().subscribe(
      (users: UserModel[]) => {
        const userDB = users.find((e) => e.idUser === idUser);
        console.log(users)
        console.log('data : ', userDB)
        if (userDB) {
          
          const userName = `<strong>${userDB.userName}</strong>`; // Nombre en negrita
          // Ahora, muestra la alerta con el nombre del empleado en negrita
          Swal.fire({
            title: '¿Estás seguro?',
            html: `Esta acción dará de baja al usuario ${userName}. ¿Estás seguro que deseas continuar?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, dar de baja',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              // Llamada directa al servicio para desactivar al empleado
              this._userService.deActivateUser(idUser).subscribe(
                (data: any) => {
                  if (data.message) {
                    const successMessage = data.message;
                    // Maneja la respuesta exitosa aquí, por ejemplo, muestra un mensaje de éxito.
                    this.getUsersList(); // Actualiza la lista de empleados después de la desactivación
                    Swal.fire(
                      `Usuario ${userName} eliminado`,
                      successMessage,
                      'success'
                    );
                  } else {
                    // Si la respuesta no contiene un mensaje de éxito, muestra un mensaje genérico
                    Swal.fire('Error inesperado', 'Intente de nuevo', 'error');
                  }
                },
                (err) => {
                  // Maneja los errores, por ejemplo, muestra un mensaje de error.
                  console.error('Error al desactivar al usuario:', err);
                  Swal.fire(
                    'Error al desactivar al usuario',
                    err.error.error || 'Error inesperado',
                    'error'
                  );
                }
              );
            }
          });
        } else {
          // Maneja el caso en el que no se encontró el empleado
          Swal.fire('Error', 'No se encontró al usuario', 'error');
        }
      },
      (error) => {
        // Maneja errores en caso de que ocurran al obtener la lista de empleados.
        console.error('Error al obtener la lista de usuario:', error);
      }
    );
}
}
