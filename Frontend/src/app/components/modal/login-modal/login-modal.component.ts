import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css',
})
export class LoginModalComponent implements OnInit {
  userform: Usuario = new Usuario();
  returnUrl!: string;
  msglogin!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loginService
      .login(this.userform.username, this.userform.password)
      .subscribe(
        (result: any) => {
          const user = result;
          if (user.status == 1) {
            //Guardamos el user en cookies en el cliente
            sessionStorage.setItem('user', user.username);
            sessionStorage.setItem('userid', user.userid);
            sessionStorage.setItem('perfil', user.perfil);

            //Cerrar el modal
            const btnCerrarModal = document.getElementById('btn-close-modal');
            if (btnCerrarModal) {
              btnCerrarModal.click();
            }

            //Redirigimos a Home
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.msglogin = 'Credenciales incorrectas';
          }
        },
        (error) => {
          alert('Error de conexión');
          console.log('Error en conexión', error);
        }
      );
  }
}
