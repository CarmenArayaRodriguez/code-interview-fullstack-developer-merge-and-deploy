import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidarRutService {

  constructor(private http: HttpClient) { }

  validarRut(rut: string): Observable<{ valido: boolean }> {
    const url = `${environment.apiUrl}`;
    return this.http.post<{ valido: boolean }>(url, { rut }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError(() => new Error('Error al validar RUT. Intente nuevamente.'));
      })
    );
  }
}
