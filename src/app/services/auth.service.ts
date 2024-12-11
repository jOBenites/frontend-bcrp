import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth.interface';
import { Auth } from '../models/auth.model';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { IS_PUBLIC } from './auth.interceptor';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ICaptcha } from '../interfaces/captcha.interface';
import { Mfa } from '../models/mfa.model';
import { MfaResponse } from '../interfaces/mfa-response.interface';

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


  public signIn(data: Auth): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.baseUrl + '/oauth/login', data, this.CONTEXT);
  }

  public logout(){
    const refresh_token = this.sessionService.getRefreshToken();
    if (!refresh_token) {
      return of();
    }

    return this.http.post<AuthResponse>(`${this.baseUrl}/oauth/logout?refreshToken=${refresh_token}`, {}).pipe(
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
      `${this.baseUrl}/oauth/refreshToken`, {refresh_token})
      .pipe(
        take(1),
        tap({next: (data: AuthResponse) => {
          const loginSuccessData = data;
          this.storeTokens(loginSuccessData);
        },
        error: (error) => {
           console.log(error);
          }
        }),
        catchError(() => {
          this.sessionService.clearTokens();
          this.router.navigateByUrl('/login');
          return of()
        })
      );
  }

  refreshTokenTwo(): Observable<AuthResponse> {
    const refresh_token = this.sessionService.getRefreshToken();
    return this.http.post<AuthResponse>(`${this.baseUrl}/oauth/refreshToken`, {refresh_token});
  }

  public getCaptcha(): Observable<ICaptcha> {
    return this.http.get<ICaptcha>(this.baseUrl + '/oauth/captcha', this.CONTEXT);
  }

  public verifyOtp(data: Mfa): Observable<MfaResponse> {
    return this.http.post<MfaResponse>(this.baseUrl + '/oauth/verify-otp', data, this.CONTEXT);
  }
  

  public storeTokens(data: AuthResponse) {
    this.sessionService.setToken(data.access_token);
    this.sessionService.setRefreshToken(data.refresh_token);
  }

}
