import {Injectable} from '@angular/core';
import {CabReportesParam} from '../models/CabReportesParam';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CabReportesParamService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(cabReportesParam: CabReportesParam): Observable<CabReportesParam[]> {
    return this.http.post<CabReportesParam[]>(this.cs.base + 'cabReportesParam/list', cabReportesParam, this.cs.httpOptions);
  }

  get(id: any): Observable<CabReportesParam> {
    return this.http.get<CabReportesParam>(this.cs.base + 'cabReportesParam/' + id, this.cs.httpOptions);
  }

  save(cabReportesParam: CabReportesParam): Observable<CabReportesParam> {
    return this.http.put<CabReportesParam>(this.cs.base + 'cabReportesParam', cabReportesParam, this.cs.httpOptions);
  }

  insert(cabReportesParam: CabReportesParam): Observable<CabReportesParam> {
    return this.http.post<CabReportesParam>(this.cs.base + 'cabReportesParam', cabReportesParam, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'cabReportesParam/' + id, this.cs.httpOptions);
  }
}