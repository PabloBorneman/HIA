import { Perfil } from "./perfil";

export class Usuario {
  _id!: string;
  username!: string;
  password!: string;
  nombres!: string;
  apellido!: string;
  perfil: Perfil | null;  // Perfil puede ser null
  cursos!: string[];  // Array de IDs de cursos
  cursosImpartidos!: string[];  // Array de IDs de cursos impartidos

  constructor(

    username: string = "",
    password: string = "",
    nombres: string = "",
    apellido: string = "",
    perfil: Perfil | null = null,
    cursos: string[] = [],
    cursosImpartidos: string[] = []
  ) {
    this.username = username;
    this.password = password;
    this.nombres = nombres;
    this.apellido = apellido;
    this.perfil = perfil;
    this.cursos = cursos;
    this.cursosImpartidos = cursosImpartidos;
  }
}
