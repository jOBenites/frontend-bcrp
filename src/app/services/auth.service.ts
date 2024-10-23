import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthResponse } from '../models/auth.interface';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { IS_PUBLIC } from './auth.interceptor';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.apiRest;
  private readonly jwtHelper = inject(JwtHelperService);
  private readonly CONTEXT = {context: new HttpContext().set(IS_PUBLIC, true)};
  constructor(readonly http: HttpClient,
    readonly sessionService: SessionService,
    readonly router: Router
  ) { }


  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  public signIn(data: Usuario): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.baseUrl + '/login', data, this.CONTEXT);
  }

  public logout(){
    const refresh_token = this.sessionService.getRefreshToken();
    if (!refresh_token) {
      return of();
    }

    return this.http.post<AuthResponse>(`${this.baseUrl}/oauth/logout?refreshToken=${refresh_token}`, {}, this.CONTEXT).pipe(
       catchError(() => of()),
       tap(data => this.sessionService.clearTokens())
    );
  }

  refreshToken(): Observable<AuthResponse | null> {
    const refresh_token = this.sessionService.getRefreshToken();
    if (!refresh_token) {
      return of();
    }
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/oauth/refreshToken`, {refresh_token}, this.CONTEXT)
      .pipe(
        catchError(() => {
          this.sessionService.clearTokens();
          this.router.navigateByUrl('/login');
          return of()
        }),
        tap(data => {
          const loginSuccessData = data as AuthResponse;
          this.storeTokens(loginSuccessData);
        })
      );
  }

  public storeTokens(data: AuthResponse) {
    this.sessionService.setToken(data.access_token);
    this.sessionService.setRefreshToken(data.refreshToken);
  }

}
