import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../models/Usuario';
import {ConfigService} from './config.service';
import {map, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Menu} from '../models/Menu';
import {Claims} from '../models/Claims';

export interface TokenResp {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper;

  constructor(private http: HttpClient, private cs: ConfigService) {
    this.helper = new JwtHelperService();
  }

  login(user: Usuario): Observable<any> {
    return this.http.post(`${this.cs.base}auth`, user, this.cs.httpOptions).pipe(retry(4), map((resp: TokenResp) => {
      if (resp.access_token) {
        localStorage.setItem('token', resp.access_token);
        const tokenDecoded = this.decodedToken(resp.access_token);
        const exp = Number(tokenDecoded.exp) * 100000;
        localStorage.setItem('expiredToken', exp.toString());
        localStorage.setItem('refreshToken', resp.refresh_token);
        return resp;
      }
    }));
  }

  async saveToken(token: string, refreshToken: string) {
    const tokenDecoded = this.decodedToken(token);
    const exp = Number(tokenDecoded.exp) * 100000;
    localStorage.setItem('token', token);
    localStorage.setItem('expiredToken', exp.toString());
    localStorage.setItem('refreshToken', refreshToken);
  }

  refreshToken(): void {
    const refreshToken = localStorage.getItem('refreshTokenUser');
    if (refreshToken === undefined || refreshToken === null) {
      return;
    }
    this.http.post(`${this.cs.base}refresh`, {}, this.cs.httpOptions).subscribe((resp: any) => {
      this.saveToken(resp.access_token, refreshToken);
    });
  }

  menu(): Observable<Menu[]> {
    this.cs.readToken();
    return this.http.post<Menu[]>(`${this.cs.base}menu`, {}, this.cs.httpOptions).pipe(retry(3));
  }

  protected(): Observable<Claims> {
    this.cs.readToken();
    return this.http.post<Claims>(`${this.cs.base}protected`, {}, this.cs.httpOptions);
  }

  public decodedToken(token: string): any {
    return this.helper.decodeToken(token);
  }

  isAuthenticate(): boolean {
    const token = localStorage.getItem('token');
    if (token != null && token.length < 2) {
      return false;
    }
    const expiredToken = Number(localStorage.getItem('expiredToken'));
    return new Date(expiredToken).getTime() > new Date().getTime();
  }


}
