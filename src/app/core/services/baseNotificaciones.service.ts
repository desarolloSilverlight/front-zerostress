import {Injectable} from '@angular/core';
import {BaseNotificaciones} from '../models/BaseNotificaciones';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseNotificacionesService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(baseNotificaciones: BaseNotificaciones): Observable<BaseNotificaciones[]> {
    return this.http.post<BaseNotificaciones[]>(this.cs.base + 'baseNotificaciones/list', baseNotificaciones, this.cs.httpOptions);
  }

  get(id: any): Observable<BaseNotificaciones> {
    return this.http.get<BaseNotificaciones>(this.cs.base + 'baseNotificaciones/' + id, this.cs.httpOptions);
  }

  save(baseNotificaciones: BaseNotificaciones): Observable<BaseNotificaciones> {
    return this.http.put<BaseNotificaciones>(this.cs.base + 'baseNotificaciones', baseNotificaciones, this.cs.httpOptions);
  }

  insert(baseNotificaciones: BaseNotificaciones): Observable<BaseNotificaciones> {
    return this.http.post<BaseNotificaciones>(this.cs.base + 'baseNotificaciones', baseNotificaciones, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'baseNotificaciones/' + id, this.cs.httpOptions);
  }
}