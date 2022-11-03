import {Injectable} from '@angular/core';
import {RutasRegla} from '../models/RutasRegla';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RutasReglaService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(rutasRegla: RutasRegla): Observable<RutasRegla[]> {
    return this.http.post<RutasRegla[]>(this.cs.base + 'rutasRegla/list', rutasRegla, this.cs.httpOptions);
  }

  get(id: any): Observable<RutasRegla> {
    return this.http.get<RutasRegla>(this.cs.base + 'rutasRegla/' + id, this.cs.httpOptions);
  }

  save(rutasRegla: RutasRegla): Observable<RutasRegla> {
    return this.http.put<RutasRegla>(this.cs.base + 'rutasRegla', rutasRegla, this.cs.httpOptions);
  }

  insert(rutasRegla: RutasRegla): Observable<RutasRegla> {
    return this.http.post<RutasRegla>(this.cs.base + 'rutasRegla', rutasRegla, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'rutasRegla/' + id, this.cs.httpOptions);
  }
}