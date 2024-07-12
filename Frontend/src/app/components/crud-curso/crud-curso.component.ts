import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from '../../models/curso';
import { Usuario } from '../../models/usuario';
import { CursoService } from '../../services/curso.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-crud-curso',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './crud-curso.component.html',
  styleUrl: './crud-curso.component.css'
})
export class CrudCursoComponent {
  cursos: Curso[] = [];
  nuevoCurso: Curso = new Curso();
  usuarios: Usuario[] = [];
  editando: boolean = false;
  mensaje: string = '';

  constructor(
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const response = await this.cursoService.getCursos().toPromise();
      if (response) {
        this.cursos = await Promise.all(response.map(async curso => {
          if (typeof curso.instructor === 'string') {
            curso.instructor = await this.obtenerUsuario(curso.instructor);
          }
          curso.miembros = await Promise.all(
            curso.miembros.map(async miembroId => typeof miembroId === 'string' ? await this.obtenerUsuario(miembroId) : miembroId)
          );
          return curso;
        }));
      } else {
        this.cursos = [];
      }
    } catch (error) {
      this.mensaje = 'Error al obtener los cursos';
      console.error('Error al obtener los cursos:', error);
      this.cursos = [];
    }

    // Cargar la lista de usuarios (instructores) con perfil "profesional"
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios.filter(usuario => this.usuarioService.perfilProfecional(usuario)),
      error => {
        this.mensaje = 'Error al obtener los usuarios';
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  async obtenerUsuario(id: string): Promise<Usuario> {
    try {
      const response = await this.usuarioService.getUsuarioById(id).toPromise();
      if (response) {
        return response;
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      this.mensaje = 'Error al obtener el usuario';
      console.error('Error al obtener el usuario:', error);
      throw error;
    }
  }

  agregarCurso() {
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

  actualizarCurso() {
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
      async (response: Curso) => {
        if (typeof response.instructor === 'string') {
          response.instructor = await this.obtenerUsuario(response.instructor);
        }
        this.nuevoCurso = response;
        this.editando = true;

        // Establece el instructor del curso
        this.nuevoCurso.instructor = this.usuarios.find(user => user._id === (response.instructor as Usuario)._id) || null;
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
