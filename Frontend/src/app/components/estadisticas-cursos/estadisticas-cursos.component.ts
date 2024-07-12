import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';
import { createChart, IChartApi, ISeriesApi, HistogramData, Time } from 'lightweight-charts';

@Component({
  selector: 'app-estadisticas-cursos',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './estadisticas-cursos.component.html',
  styleUrls: ['./estadisticas-cursos.component.css']
})
export class EstadisticasCursosComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chartContainer!: ElementRef;
  chart: IChartApi | undefined;
  histogramSeries: ISeriesApi<'Histogram'> | undefined;
  cursos: Curso[] = [];

  constructor(
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cursoService.getCursos().subscribe((cursos: Curso[]) => {
      console.log('Cursos recibidos:', cursos);  // Verificar los datos recibidos
      this.cursos = cursos;
      this.createChart();
    });
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    if (this.cursos.length > 0 && this.chartContainer) {
      console.log('Creando gráfico...');  // Verificar que se está creando el gráfico
      this.chart = createChart(this.chartContainer.nativeElement, {
        width: this.chartContainer.nativeElement.clientWidth,
        height: 400,
      });

      this.histogramSeries = this.chart.addHistogramSeries();

      const data: HistogramData[] = this.cursos.map((curso, index) => ({
        time: this.formatDate(index), // Usamos un formato de fecha válido
        value: curso.miembros.length,
        color: '#007bff',  // color de las barras
      }));

      console.log('Datos del gráfico:', data);  // Verificar los datos del gráfico
      this.histogramSeries.setData(data);
    } else {
      console.log('No hay cursos o el contenedor del gráfico no está disponible.');
    }
  }

  formatDate(index: number): string {
    // Genera una fecha válida basada en el índice
    const baseDate = new Date(2020, 0, 1); // Fecha base: 1 de enero de 2020
    baseDate.setDate(baseDate.getDate() + index); // Añade días según el índice
    return baseDate.toISOString().split('T')[0]; // Devuelve la fecha en formato yyyy-mm-dd
  }
}
