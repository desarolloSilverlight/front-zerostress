import {Injectable} from '@angular/core';
import {CabReportes} from '../models/CabReportes';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CabReportesService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(cabReportes: CabReportes): Observable<CabReportes[]> {
    return this.http.post<CabReportes[]>(this.cs.base + 'cabReportes/list', cabReportes, this.cs.httpOptions);
  }

  get(id: any): Observable<CabReportes> {
    return this.http.get<CabReportes>(this.cs.base + 'cabReportes/' + id, this.cs.httpOptions);
  }

  save(cabReportes: CabReportes): Observable<CabReportes> {
    return this.http.put<CabReportes>(this.cs.base + 'cabReportes', cabReportes, this.cs.httpOptions);
  }

  insert(cabReportes: CabReportes): Observable<CabReportes> {
    return this.http.post<CabReportes>(this.cs.base + 'cabReportes', cabReportes, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'cabReportes/' + id, this.cs.httpOptions);
  }
}