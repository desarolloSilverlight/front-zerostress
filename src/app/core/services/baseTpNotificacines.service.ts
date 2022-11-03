import {Injectable} from '@angular/core';
import {BaseTpNotificacines} from '../models/BaseTpNotificacines';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseTpNotificacinesService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(baseTpNotificacines: BaseTpNotificacines): Observable<BaseTpNotificacines[]> {
    return this.http.post<BaseTpNotificacines[]>(this.cs.base + 'baseTpNotificacines/list', baseTpNotificacines, this.cs.httpOptions);
  }

  get(id: any): Observable<BaseTpNotificacines> {
    return this.http.get<BaseTpNotificacines>(this.cs.base + 'baseTpNotificacines/' + id, this.cs.httpOptions);
  }

  save(baseTpNotificacines: BaseTpNotificacines): Observable<BaseTpNotificacines> {
    return this.http.put<BaseTpNotificacines>(this.cs.base + 'baseTpNotificacines', baseTpNotificacines, this.cs.httpOptions);
  }

  insert(baseTpNotificacines: BaseTpNotificacines): Observable<BaseTpNotificacines> {
    return this.http.post<BaseTpNotificacines>(this.cs.base + 'baseTpNotificacines', baseTpNotificacines, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'baseTpNotificacines/' + id, this.cs.httpOptions);
  }
}