import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, 
    private readonly session: SessionService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.session.getToken();
    const isValidOTPCode = this.session.isValidOTPCode();
    if (token) {
      if(!isValidOTPCode) {
        this.router.navigate(['/login/mfa']);
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
