import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css',
})
export class LoginModalComponent implements OnInit {
  userform: Usuario = new Usuario(); // Usuario mapeado al formulario de login
  returnUrl!: string;
  msglogin!: string; // Mensaje que indica si no pasó el login
  msgSuccess: string = ''; // Variable para el mensaje de éxito

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';  // Redirigir a 'producto' después del login
  }

  login() {
    this.loginService.login(this.userform.username, this.userform.password)
      .subscribe(
        (result) => {
          var user = result;
          if (user.status == 1) {
            // Guardamos el token y otros detalles en sessionStorage en el cliente
            sessionStorage.setItem("token", user.token);
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("perfil", user.perfil.nombre);  // Guardar solo el nombre del perfil
            this.msgSuccess = "Inicio de sesión exitoso!";

            // Asegurarse de que el perfil está guardado correctamente
            setTimeout(() => {
              const storedPerfil = sessionStorage.getItem("perfil");

              // Redirigimos a home o a página que llamó
              this.router.navigateByUrl(this.returnUrl);  // Navegar a la URL de retorno
            }, 100);  // Pequeño retraso para asegurar que sessionStorage se actualiza correctamente

          } else {
            // Usuario no encontrado, muestro mensaje en la vista
            this.msglogin = "Credenciales incorrectas..";  // Mostrar mensaje de error de login
          }
        },
        error => {
          this.msglogin = "Error de conexión";
          console.error("Error en conexión", error);  // Registrar error en la consola
        }
      );
  }

  redirectToRegister() {
    this.router.navigate(['/register']);  // Redirigir al componente de registro
  }
}
