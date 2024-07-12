import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private baseUrl: string = 'http://localhost:3000/api/curso';

  constructor(private _http: HttpClient) { }

  private getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public createCurso(curso: Curso): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    let body = JSON.stringify(curso);
    return this._http.post(this.baseUrl, body, httpOptions);
  }

  public getCursos(): Observable<Curso[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    return this._http.get<Curso[]>(this.baseUrl, httpOptions).pipe(
      map(response => response || [])
    );
  }

  public getCursoById(id: string): Observable<Curso> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    return this._http.get<Curso>(`${this.baseUrl}/${id}`, httpOptions);
  }

  public updateCurso(curso: Curso): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    let body = JSON.stringify(curso);
    return this._http.put(`${this.baseUrl}/${curso._id}`, body, httpOptions);
  }

  public deleteCurso(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    return this._http.delete(`${this.baseUrl}/${id}`, httpOptions);
  }

  public inscribirUsuarioEnCurso(cursoId: string, usuarioId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    let body = JSON.stringify({ usuarioId: usuarioId });
    return this._http.post(`${this.baseUrl}/${cursoId}/inscribir`, body, httpOptions);
  }
}
