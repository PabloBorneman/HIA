import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {
  private baseUrl: string = 'http://localhost:3000/api/mercadopago';

  constructor(private http: HttpClient) { }

  createPreference(orderData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_preference`, orderData);
  }
}
