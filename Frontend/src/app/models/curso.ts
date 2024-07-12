import { Usuario } from './usuario';

export class Curso {
  _id!: string;
  titulo!: string;
  descripcion!: string;
  linkvideo!: string;
  linkvideoresumen?: string;  // Nuevo atributo opcional
  precio?: number;  // Nuevo atributo opcional
  instructor!: Usuario | null;  // Cambiado a Usuario o null
  miembros!: Usuario[];  // Array de objetos Usuario

  constructor(
    titulo: string = "",
    descripcion: string = "",
    linkvideo: string = "",
    linkvideoresumen: string = "",  // Inicializar como cadena vacía
    precio: number = 0,  // Inicializar como 0
    instructor: Usuario | null = null,
    miembros: Usuario[] = []
  ) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.linkvideo = linkvideo;
    this.linkvideoresumen = linkvideoresumen;
    this.precio = precio;
    this.instructor = instructor;
    this.miembros = miembros;
  }
}
