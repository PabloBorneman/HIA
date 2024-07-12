import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Perfil } from '../../models/perfil';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-crud-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './crud-usuario.component.html',
  styleUrl: './crud-usuario.component.css'
})
export class CrudUsuarioComponent implements OnInit{
  nuevoUsuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  perfiles: Perfil[] = [];
  mensaje: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.obtenerPerfiles();
    this.obtenerUsuarios();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarUsuario(id);
    }
  }

  obtenerPerfiles() {
    this.usuarioService.getPerfils().subscribe(
      (response: Perfil[]) => {
        this.perfiles = Array.isArray(response) ? response : [];
      },
      error => {
        this.mensaje = 'Error al obtener perfiles';
        console.error(error);
      }
    );
  }

  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (response: Usuario[]) => {
        this.usuarios = Array.isArray(response) ? response : [];
      },
      error => {
        this.mensaje = 'Error al obtener usuarios';
        console.error(error);
      }
    );
  }

  cargarUsuario(id: string) {
    this.usuarioService.getUsuarioById(id).subscribe(
      (response: Usuario) => {
        this.nuevoUsuario = response;
        this.nuevoUsuario.perfil = this.perfiles.find(p => p._id === (response.perfil as Perfil)._id) || null;
      },
      error => {
        this.mensaje = 'Error al cargar usuario';
        console.error(error);
      }
    );
  }

  agregarUsuario() {
    this.usuarioService.createUsuario(this.nuevoUsuario).subscribe(
      (response) => {
        if (response) {
          this.mensaje = 'Usuario agregado correctamente';
          this.obtenerUsuarios();  // Actualizar la lista de usuarios
          this.nuevoUsuario = new Usuario();  // Resetear el formulario
        }
      },
      error => {
        this.mensaje = 'Error al agregar usuario';
        console.error(error);
      }
    );
  }

  actualizarUsuario() {
    this.usuarioService.updateUsuario(this.nuevoUsuario).subscribe(
      (response) => {
        if (response) {
          this.mensaje = 'Usuario actualizado correctamente';
          this.obtenerUsuarios();  // Actualizar la lista de usuarios
          this.nuevoUsuario = new Usuario();  // Resetear el formulario
        }
      },
      error => {
        this.mensaje = 'Error al actualizar usuario';
        console.error(error);
      }
    );
  }

  eliminarUsuario(id: string) {
    this.usuarioService.deleteUsuario(id).subscribe(
      (response) => {
        if (response) {
          this.mensaje = 'Usuario eliminado correctamente';
          this.obtenerUsuarios();  // Actualizar la lista de usuarios
        }
      },
      error => {
        this.mensaje = 'Error al eliminar usuario';
        console.error(error);
      }
    );
  }

}
