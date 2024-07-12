import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Curso } from '../../models/curso';
import { Usuario } from '../../models/usuario';
import { CursoService } from '../../services/curso.service';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-cursos-dictados',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './cursos-dictados.component.html',
  styleUrls: ['./cursos-dictados.component.css']
})
export class CursosDictadosComponent implements OnInit {
  cursos: Curso[] = [];
  nuevoCurso: Curso = new Curso();
  userId: string | null = '';
  editando: boolean = false;
  mensaje: string = '';

  constructor(
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userId = this.loginService.idLogged();
    if (this.userId) {
      this.usuarioService.getCursosImpartidosPorUsuario(this.userId).subscribe(
        (response) => {
          if (response.status === '1') {
            this.cursos = response.cursosImpartidos;
          } else {
            this.mensaje = 'Error fetching user courses: ' + response.msg;
            console.error('Error fetching user courses:', response.msg);
          }
        },
        (error) => {
          this.mensaje = 'Error fetching user courses';
          console.error('Error fetching user courses:', error);
        }
      );
    }
  }

  agregarCurso() {
    if (this.userId) {
      this.nuevoCurso.instructor = this.userId as any; // Establece el instructor como el usuario actual
      this.cursoService.createCurso(this.nuevoCurso).subscribe(
        (response) => {
          if (response) {
            this.mensaje = 'Curso agregado correctamente';
            this.ngOnInit();  // Volver a cargar la lista de cursos
          }
        },
        error => {
          this.mensaje = 'Error al agregar curso';
          console.error('Error al agregar curso:', error);
        }
      );
    }
  }

  actualizarCurso() {
    if (this.userId) {
      this.nuevoCurso.instructor = this.userId as any; // Asegúrate de que el instructor no se modifique
      this.cursoService.updateCurso(this.nuevoCurso).subscribe(
        (response) => {
          if (response) {
            this.mensaje = 'Curso actualizado correctamente';
            this.ngOnInit();  // Volver a cargar la lista de cursos
          }
        },
        error => {
          this.mensaje = 'Error al actualizar curso';
          console.error('Error al actualizar curso:', error);
        }
      );
      this.nuevoCurso = new Curso();
      this.editando = false;
    }
  }

  eliminarCurso(id: string) {
    this.cursoService.deleteCurso(id).subscribe(
      (response) => {
        if (response) {
          this.mensaje = 'Curso eliminado correctamente';
          this.ngOnInit();  // Volver a cargar la lista de cursos
        }
      },
      error => {
        this.mensaje = 'Error al eliminar curso';
        console.error('Error al eliminar curso:', error);
      }
    );
  }

  cargarCurso(id: string) {
    this.cursoService.getCursoById(id).subscribe(
      (response: Curso) => {
        this.nuevoCurso = response;
        this.editando = true;
      },
      error => {
        this.mensaje = 'Error al cargar el curso';
        console.error('Error al cargar el curso:', error);
      }
    );
  }

  cancelarEdicion() {
    this.nuevoCurso = new Curso();
    this.editando = false;
  }
}
