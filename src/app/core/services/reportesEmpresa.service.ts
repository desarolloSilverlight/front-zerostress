import {Injectable} from '@angular/core';
import {ReportesEmpresa} from '../models/ReportesEmpresa';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesEmpresaService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(reportesEmpresa: ReportesEmpresa): Observable<ReportesEmpresa[]> {
    return this.http.post<ReportesEmpresa[]>(this.cs.base + 'reportesEmpresa/listVi', reportesEmpresa, this.cs.httpOptions);
  }

  get(id: any): Observable<ReportesEmpresa> {
    return this.http.get<ReportesEmpresa>(this.cs.base + 'reportesEmpresa/' + id, this.cs.httpOptions);
  }

  save(reportesEmpresa: ReportesEmpresa): Observable<ReportesEmpresa> {
    return this.http.put<ReportesEmpresa>(this.cs.base + 'reportesEmpresa', reportesEmpresa, this.cs.httpOptions);
  }

  insert(reportesEmpresa: ReportesEmpresa): Observable<ReportesEmpresa> {
    return this.http.post<ReportesEmpresa>(this.cs.base + 'reportesEmpresa', reportesEmpresa, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'reportesEmpresa/' + id, this.cs.httpOptions);
  }
}