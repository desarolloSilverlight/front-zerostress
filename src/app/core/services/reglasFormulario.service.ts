import {Injectable} from '@angular/core';
import {ReglasFormulario} from '../models/ReglasFormulario';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReglasFormularioService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(reglasFormulario: ReglasFormulario): Observable<ReglasFormulario[]> {
    return this.http.post<ReglasFormulario[]>(this.cs.base + 'reglasFormulario/list', reglasFormulario, this.cs.httpOptions);
  }

  get(id: any): Observable<ReglasFormulario> {
    return this.http.get<ReglasFormulario>(this.cs.base + 'reglasFormulario/' + id, this.cs.httpOptions);
  }

  save(reglasFormulario: ReglasFormulario): Observable<ReglasFormulario> {
    return this.http.put<ReglasFormulario>(this.cs.base + 'reglasFormulario', reglasFormulario, this.cs.httpOptions);
  }

  insert(reglasFormulario: ReglasFormulario): Observable<ReglasFormulario> {
    return this.http.post<ReglasFormulario>(this.cs.base + 'reglasFormulario', reglasFormulario, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'reglasFormulario/' + id, this.cs.httpOptions);
  }
}