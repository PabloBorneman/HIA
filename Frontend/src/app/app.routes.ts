import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginModalComponent } from './components/modal/login-modal/login-modal.component';
import { CrudCursoComponent } from './components/crud-curso/crud-curso.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { CursosDictadosComponent } from './components/cursos-dictados/cursos-dictados.component';
import { MisCursosComponent } from './components/mis-cursos/mis-cursos.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'loginmodal',
    component: LoginModalComponent,
  },
  {
    path: 'cursos',
    component: CursosComponent,
  },
  {
    path: 'nosotros',
    component: NosotrosComponent,
  },
  {
    path: 'contacto',
    component: ContactoComponent,
  },
  {
    path: 'crud-curso',
    component: CrudCursoComponent,
  },
  {
    path: 'crud-usuario',
    component: CrudUsuarioComponent,
  },
  {
    path: 'inscripcion',
    component: InscripcionComponent,
  },
  {
    path: 'dictados',
    component: CursosDictadosComponent,
  },
  {
    path: 'mis-cursos',
    component: MisCursosComponent,
  }

];


