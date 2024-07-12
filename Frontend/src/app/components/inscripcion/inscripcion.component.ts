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
  selector: 'app-inscripcion',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  cursos: Curso[] = [];
  usuarios: Usuario[] = [];
  selectedCursoId: string = '';
  selectedUsuarioId: string = '';
  mensaje: string = '';

  constructor(
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerCursos();
    this.obtenerUsuarios();
  }

  obtenerCursos() {
    this.cursoService.getCursos().subscribe(
      (response: Curso[]) => {
        this.cursos = response;
      },
      error => {
        console.error('Error al obtener los cursos:', error);
      }
    );
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
