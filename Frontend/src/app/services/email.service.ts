import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private userId: string = 'JOgFHtDLDmAbJdZ0o'; // Reemplaza con tu user_id de EmailJS
  private serviceId: string = 'service_p1eaa3f'; // Reemplaza con tu service_id de EmailJS
  private templateId: string = 'template_qa2n7m7'; // Reemplaza con tu template_id de EmailJS

  constructor() {}

  sendEmail(form: HTMLFormElement): Promise<EmailJSResponseStatus> {
    return emailjs.sendForm(this.serviceId, this.templateId, form, this.userId);
  }
}
