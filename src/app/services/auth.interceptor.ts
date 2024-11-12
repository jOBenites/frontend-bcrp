import {HttpContextToken, HttpHeaders, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import { SpinnerObserverService } from './spinner-observer.service';
import { finalize, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authSvc = inject(AuthService);
  const spinnerSvc = inject(SpinnerObserverService);

  if (req.context.get(IS_PUBLIC)) {
    // let headers = new HttpHeaders();
    //    headers = headers.set("Access-Control-Allow-Origin", "http://localhost:4200");
    const clonedRequest = req.clone( { withCredentials: true } );
    return next(clonedRequest);
  }

  if (authSvc.isAuthenticated()) {
    spinnerSvc.showSpinner();
    const authRequest = addAuthorizationHeader(req);
    return next(authRequest).pipe(
        finalize(() => {
          spinnerSvc.hideSpinner();
        }) );
  } else {
    return authSvc.refreshToken().pipe(
      switchMap(() => {
        const authRequest = addAuthorizationHeader(req);
        return next(authRequest);
      })
    );
  }

};
const addAuthorizationHeader = (req: HttpRequest<any>) => {
  const token = localStorage.getItem('JWT');
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
};
export const IS_PUBLIC = new HttpContextToken(() => false);