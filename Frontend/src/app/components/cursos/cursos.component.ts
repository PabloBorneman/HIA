import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  mensaje: string = '';

  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.cursoService.getCursos().subscribe(
      (data: Curso[]) => {
        this.cursos = Array.isArray(data) ? data : [];
      },
      (error) => {
        this.mensaje = 'Error al obtener los cursos';
        console.error('Error al obtener los cursos:', error);
        this.cursos = [];  // Asegurarse de que cursos sea un array vacío en caso de error
      }
    );
  }

  verMas(id: string) {
    this.router.navigate(['/curso-especifico', id]);
  }
}
