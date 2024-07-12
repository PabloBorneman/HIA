import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  mensaje: string = '';

  constructor(private emailService: EmailService) {}

  onSubmit(form: NgForm) {
    const formElement = document.querySelector('#form') as HTMLFormElement;
    this.emailService.sendEmail(formElement)
      .then(response => {
        this.mensaje = 'Correo enviado correctamente';
        form.resetForm();
      })
      .catch(error => {
        this.mensaje = 'Error al enviar el correo';
        console.error('Error al enviar el correo:', error);
      });
  }
}
