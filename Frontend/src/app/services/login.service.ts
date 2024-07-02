import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  hostBase: string;

  constructor(private http: HttpClient) {
    this.hostBase = 'http://localhost:3000/api/usuario/';
  }

  public login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const body = JSON.stringify({ username, password });
    console.log(body);

    return this.http.post(this.hostBase + 'login', body, httpOptions);
  }

  public logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('perfil');
    sessionStorage.removeItem('userid');
  }

  public userLoggedIn() {
    var resultado = false;
    var usuario = sessionStorage.getItem('user');
    if (usuario != null) {
      resultado = true;
    }
    return resultado;
  }

  public userLogged() {
    var usuario = sessionStorage.getItem('user');
    return usuario;
  }

  public idLogged() {
    var id = sessionStorage.getItem('userid');
    return id;
  }
}
