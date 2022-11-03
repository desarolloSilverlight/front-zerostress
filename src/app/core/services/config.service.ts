import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  token: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `JWT ${localStorage.getItem('token')}`
    }),
    params: undefined
  };

  constructor() {
    this.readToken();
  }

  base = environment.apiEndpoint;

  readToken() {
    const token = localStorage.getItem('token');
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `JWT ${localStorage.getItem('token')}`
    });
    console.log(this.httpOptions, this.httpOptions.headers.keys());
  }

}
