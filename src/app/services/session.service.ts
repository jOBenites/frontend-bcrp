import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Autenticacion } from '../models/autenticacion.interface';

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor() {}

    isAuthenticated(): boolean {
        return !helper.isTokenExpired();
    }

    setToken(value: any) {
        sessionStorage.setItem('JWT', value);
    }
    setRefreshToken(value: any) {
        sessionStorage.setItem('refresh_token', value);
    }


    getToken(): string | null {
        return sessionStorage.getItem('JWT');
    }

    getUser(): Autenticacion | null {
        let dataSession = this.getToken();
        if(dataSession){
            let auth: Autenticacion | null = helper.decodeToken(dataSession);
            return auth;
        }
        return null;
    }

    clearToken() {
        return sessionStorage.removeItem('JWT');
    }
}
