import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class CargaExcelService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }


  upload(formData: FormData) {
    const httpOptions = Object.assign({}, this.cs.httpOptions);
    httpOptions.headers = new HttpHeaders({
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    );
    console.log(httpOptions);
    return this.http.post(`${this.cs.base}carga`, formData, httpOptions);
  }
}