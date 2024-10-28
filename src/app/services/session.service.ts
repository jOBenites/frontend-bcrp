import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Autenticacion } from '../interfaces/autenticacion.interface';

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor() {}

    isAuthenticated(): boolean {
        return !helper.isTokenExpired();
    }

    setUser(value: string) {
        localStorage.setItem('user', value);
    }
    getUser(): string | null {
        return localStorage.getItem('user');
    }
    setToken(value: any) {
        localStorage.setItem('JWT', value);
    }
    setRefreshToken(value: any) {
        localStorage.setItem('refresh_token', value);
    }

    getToken(): string | null {
        return localStorage.getItem('JWT');
    }
    getRefreshToken(): string | null {
        return localStorage.getItem('refresh_token');
    }

    getTokenDecoder(): Autenticacion | null {
        let dataSession = this.getToken();
        if(dataSession){
            let auth: Autenticacion | null = helper.decodeToken(dataSession);
            return auth;
        }
        return null;
    }

    clearTokens() {
        localStorage.removeItem('JWT');
        localStorage.removeItem('refresh_token');
    }
}
