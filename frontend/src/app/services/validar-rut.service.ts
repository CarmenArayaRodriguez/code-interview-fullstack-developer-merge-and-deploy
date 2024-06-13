import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidarRutService {
  constructor(private http: HttpClient) { }

  validarRut(rut: string): Observable<{ valido: boolean, mensaje: string }> {
    const url = `${environment.apiUrl}`;
    return this.http.post<{ valido: boolean, mensaje: string }>(url, { rut }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud HTTP:', error.message);
        if (error.error && error.error.mensaje) {
          return throwError(() => new Error(error.error.mensaje));
        }
        return throwError(() => new Error('Error al validar RUT. Intente nuevamente.'));
      })
    );
  }
}

