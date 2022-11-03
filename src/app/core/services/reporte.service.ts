import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn:'root'
})

export class ReporteService{
    
    constructor(private http: HttpClient, private cs: ConfigService){
    }

    reporteOp(labelTabla, valorTabla, nombreTabla): Observable<any>{
        return this.http.post(this.cs.base + '/reporteOp',{labelTabla, valorTabla, nombreTabla}, this.cs.httpOptions);
    }

    reporte(strParam, spName): Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')
        return this.http.post(this.cs.base + '/reporte', {strParam , spName} ,{headers, responseType: 'blob' as 'json' });
    }
}
