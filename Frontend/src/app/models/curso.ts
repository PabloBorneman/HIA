import { Usuario } from './usuario';

export class Curso {
  _id!: string;
  titulo!: string;
  descripcion!: string;
  linkvideo!: string;
  instructor!: Usuario | null;  // Cambiado a Usuario o null
  miembros!: Usuario[];  // Array de objetos Usuario

  constructor(
    titulo: string = "",
    descripcion: string = "",
    linkvideo: string = "",
    instructor: Usuario | null = null,
    miembros: Usuario[] = []
  ) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.linkvideo = linkvideo;
    this.instructor = instructor;
    this.miembros = miembros;
  }
}
