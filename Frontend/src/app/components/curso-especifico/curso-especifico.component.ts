import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-curso-especifico',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './curso-especifico.component.html',
  styleUrls: ['./curso-especifico.component.css']
})
export class CursoEspecificoComponent implements OnInit {
  curso: Curso | undefined;
  mensaje: string = '';

  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cursoService.getCursoById(id).subscribe(
        (data: Curso) => {
          this.curso = data;
        },
        (error) => {
          this.mensaje = 'Error al obtener el curso';
          console.error('Error al obtener el curso:', error);
        }
      );
    }
  }
}
