import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { Perfil } from '../../../models/perfil';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-registro-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './registro-modal.component.html',
  styleUrl: './registro-modal.component.css'
})
export class RegistroModalComponent {
  nuevoUsuario: Usuario = new Usuario();
  perfiles!: Array<Perfil>;
  mensaje: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  ngOnInit() {
    this.obtenerPerfiles();
  }

  obtenerPerfiles() {
    this.usuarioService.getPerfils().subscribe(
      (response: Perfil[]) => {
        // Filtrar para incluir solo el perfil con nombre 'usuario'
        this.perfiles = response.filter(perfil => perfil.nombre === 'usuario');
        console.log(this.perfiles);
      },
      error => {
        this.mensaje = 'Error al obtener perfiles';
        console.log(error);
      }
    );
  }

  agregarUsuario() {
    console.log('Datos de usuario:', this.nuevoUsuario);  // Añadir log para ver los datos del usuario antes de enviar

    this.usuarioService.createUsuario(this.nuevoUsuario).subscribe(
      (response) => {
        if (response) {
          this.mensaje = 'Usuario agregado correctamente';
          setTimeout(() => {
            this.router.navigate(['/']);  // Redirigir de vuelta al login después de registrar
          }, 2000);
        }
      },
      error => {
        this.mensaje = 'Error al agregar usuario';
        console.error('Error al agregar usuario:', error);
      }
    );
  }


}
