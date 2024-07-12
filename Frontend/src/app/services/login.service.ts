import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  hostBase: string;

  constructor(private _http: HttpClient) {
    this.hostBase = "http://localhost:3000/api/usuario/";
  }

  public login(username: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify({ username: username, password: password });
    return this._http.post(this.hostBase + 'login', body, httpOption);
  }

  public logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("perfil");
    sessionStorage.removeItem("userid");
  }

  public userLoggedIn(): boolean {
    return sessionStorage.getItem("user") !== null;
  }

  public userLogged(): string | null {
    return sessionStorage.getItem("user");
  }

  public idLogged(): string | null {
    return sessionStorage.getItem("userid");
  }

  public isAdmin(): boolean {
    return this.perfilAdmin();
  }

  public isProfe(): boolean {
    return this.perfilProfesional();
  }

  public isUsu(): boolean {
    return this.perfilUsuario();
  }

  public getPerfil(): string | null {
    return sessionStorage.getItem("perfil");
  }

  public perfilAdmin(): boolean {
    const perfil = this.getPerfil();
    if (perfil) {
      return perfil.trim().toLowerCase() === 'admin';
    }
    return false;
  }

  public perfilProfesional(): boolean {
    const perfil = this.getPerfil();
    if (perfil) {
      return perfil.trim().toLowerCase() === 'profesional';
    }
    return false;
  }

  public perfilUsuario(): boolean {
    const perfil = this.getPerfil();
    if (perfil) {
      return perfil.trim().toLowerCase() === 'usuario';
    }
    return false;
  }


  public getToken(): string {
    return sessionStorage.getItem("token") || '';
  }
}
