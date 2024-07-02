import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginModalComponent } from './components/modal/login-modal/login-modal.component';
import { RegistroModalComponent } from './components/modal/registro-modal/registro-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoginModalComponent, RegistroModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'Frontend';
}
