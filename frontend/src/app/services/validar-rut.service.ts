import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidarRutService {

  constructor(private http: HttpClient) { }

  validarRut(rut: string): Observable<{ valido: boolean }> {
    const url = `${environment.apiUrl}`;
    return this.http.post<{ valido: boolean }>(url, { rut });
  }
}
