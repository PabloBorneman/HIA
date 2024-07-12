import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from '../../models/curso';
import { Usuario } from '../../models/usuario';
import { CursoService } from '../../services/curso.service';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
  cursos: Curso[] = [];
  usuarios: Usuario[] = [];
  selectedCursoId: string = '';
  selectedUsuarioId: string = '';
  mensaje: string = '';

  constructor(
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerCursosDictados();
    this.obtenerUsuarios();
  }

  obtenerCursosDictados() {
    const userId = this.loginService.idLogged();
    if (userId) {
      this.usuarioService.getCursosImpartidosPorUsuario(userId).subscribe(
        (response) => {
          if (response.status === '1') {
            this.cursos = response.cursosImpartidos;
          } else {
            this.mensaje = 'Error al obtener los cursos del usuario: ' + response.msg;
          }
        },
        error => {
          this.mensaje = 'Error al obtener los cursos del usuario';
          console.error('Error al obtener los cursos del usuario:', error);
        }
      );
    }
  }

  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (response: Usuario[]) => {
        this.usuarios = response;
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  inscribirUsuario() {
    if (this.selectedCursoId && this.selectedUsuarioId) {
      this.cursoService.inscribirUsuarioEnCurso(this.selectedCursoId, this.selectedUsuarioId).subscribe(
        (response) => {
          if (response.status === '1') {
            this.mensaje = 'Usuario inscrito correctamente en el curso';
          } else {
            this.mensaje = 'Error: ' + response.msg;
          }
        },
        error => {
          if (error.status === 400 && error.error.msg) {
            this.mensaje = error.error.msg;
          } else {
            this.mensaje = 'Error al inscribir usuario en el curso';
            console.error('Error al inscribir usuario en el curso:', error);
          }
        }
      );
    } else {
      this.mensaje = 'Selecciona un curso y un usuario antes de inscribir.';
    }
  }
}
