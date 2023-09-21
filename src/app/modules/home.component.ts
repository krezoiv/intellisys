import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode'; // Asegúrate de importar jwt_decode


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  ngOnInit() {
    // Llama a userActivityDetected cuando el componente se inicializa
    this.authService.userActivityDetected();
    
    // Realiza otras acciones relacionadas con la inicialización del componente si es necesario
  }
  constructor(
    private authService : AuthService
){}



}


