import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth.interface';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { IS_PUBLIC } from './auth.interceptor';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.apiRest;
  private readonly jwtHelper = inject(JwtHelperService);
  private readonly CONTEXT = {context: new HttpContext().set(IS_PUBLIC, true)};
  constructor(readonly http: HttpClient,
    readonly sessionService: SessionService
  ) { }

  // public isAuthenticated(): boolean{
  //   return this.sessionService.isAuthenticated();
  // }
  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  public signIn(data: Usuario): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.baseUrl + '/login', data, this.CONTEXT);
  }

  
  // refreshToken(): Observable<AuthResponse | null> {
  //     const refresh_token = sessionStorage.getItem('refresh_token');
  //     if (!refresh_token) {
  //       return of();
  //     }
  //     return this.http.post<AuthResponse>(
  //       `${this.baseUrl}/token/refresh`, {refresh_token}, this.CONTEXT)
  //       .pipe(
  //         catchError(() => of()),
  //         tap(data => {
  //           const loginSuccessData = data as LoginSuccess;
  //           this.storeTokens(loginSuccessData);
  //           this.scheduleTokenRefresh(loginSuccessData.token);
  //         })
  //       );
  //   }

}
