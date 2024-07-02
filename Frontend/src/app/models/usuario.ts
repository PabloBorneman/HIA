export class Usuario {
  _id!: string;
  username!: string;
  password!: string;
  nombre!: string;
  apellido!: string;
  perfil!: string;

  constructor(
    id: string = '',
    username: string = '',
    password: string = '',
    nombre: string = '',
    apellido: string = '',
    perfil: string = ''
  ) {
    this._id = id;
    this.username = username;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.perfil = perfil;
  }
}
