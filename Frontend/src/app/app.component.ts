import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginModalComponent } from './components/modal/login-modal/login-modal.component';
import { RegistroModalComponent } from './components/modal/registro-modal/registro-modal.component';
import { HomeComponent } from './components/home/home.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CrudCursoComponent } from './components/crud-curso/crud-curso.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { CursosDictadosComponent } from './components/cursos-dictados/cursos-dictados.component';
import { MisCursosComponent } from './components/mis-cursos/mis-cursos.component';
import { InscripcionesComponent } from './components/inscripciones/inscripciones.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink,
    HeaderComponent,
    LoginModalComponent,
    RegistroModalComponent,
    HomeComponent,
    CursosComponent,
    NosotrosComponent,
    ContactoComponent,
    CrudCursoComponent,
    CrudUsuarioComponent,
    InscripcionComponent,
    CursosDictadosComponent,
    MisCursosComponent,
    InscripcionesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Frontend';
}
