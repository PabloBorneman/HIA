import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginModalComponent } from '../modal/login-modal/login-modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  userform: Usuario = new Usuario();
  returnUrl!: string;
  msglogin!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
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
