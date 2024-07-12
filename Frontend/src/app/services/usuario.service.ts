import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl: string = 'http://localhost:3000/api/usuario';
  private perfil: Perfil[] = [];

  constructor(private _http: HttpClient) { }

  private getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public createUsuario(usuario: Usuario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    let body = JSON.stringify(usuario);
    return this._http.post(this.baseUrl, body, httpOptions);
  }

  public getUsuarios(): Observable<Usuario[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    return this._http.get<Usuario[]>(this.baseUrl, httpOptions).pipe(
      map(response => response || [])
    );
  }

  public getUsuarioById(id: string): Observable<Usuario> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    return this._http.get<Usuario>(`${this.baseUrl}/${id}`, httpOptions);
  }

  public updateUsuario(usuario: Usuario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    let body = JSON.stringify(usuario);
    return this._http.put(`${this.baseUrl}/${usuario._id}`, body, httpOptions);
  }

  public deleteUsuario(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    return this._http.delete(`${this.baseUrl}/${id}`, httpOptions);
  }

  public getPerfils(): Observable<Perfil[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    return this._http.get<Perfil[]>('http://localhost:3000/api/perfil', httpOptions).pipe(
      map(response => response || [])
    );
  }

  public getCursosDeUsuario(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    return this._http.get(`${this.baseUrl}/${id}/cursos`, httpOptions);
  }

  public perfilProfecional(usuario: Usuario): boolean {
    return usuario.perfil !== null && usuario.perfil.nombre === 'profesional';
  }

  public getCursosImpartidosPorUsuario(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    return this._http.get(`${this.baseUrl}/${id}/cursosImpartidos`, httpOptions);
  }



}
