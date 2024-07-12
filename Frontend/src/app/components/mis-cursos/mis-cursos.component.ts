import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Curso } from '../../models/curso';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.css']  // Asegúrate de que es styleUrls en plural
})
export class MisCursosComponent implements OnInit {
  cursos: Curso[] = [];
  usuarios: Usuario[] = [];
  userId: string | null = '';

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userId = this.loginService.idLogged();
    if (this.userId) {
      this.usuarioService.getCursosDeUsuario(this.userId).subscribe(
        (response) => {
          if (response.status === '1') {
            this.cursos = response.cursos;
          } else {
            console.error('Error fetching user courses:', response.msg);
          }
        },
        (error) => {
          console.error('Error fetching user courses:', error);
        }
      );
    }
  }
}
