import {HttpContextToken, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import { SpinnerObserverService } from './spinner-observer.service';
import { finalize } from 'rxjs';
// import {switchMap} from "rxjs/operators";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authSvc = inject(AuthService);
  const spinnerSvc = inject(SpinnerObserverService);
  // whenever this HttpContextToken is attached to a request 
  // as we did to login request earlier
  // it means the user does not need to be authenticated 
  // so we don't attach authorization header
  console.log('IS_PUBLIC', req.context.get(IS_PUBLIC));

  if (req.context.get(IS_PUBLIC)) {
    return next(req);
  }
  console.log('isAuthenticated', authSvc.isAuthenticated());
  if (authSvc.isAuthenticated()) {
    spinnerSvc.showSpinner();
    console.log('show Spinner');
    return next(req).pipe(
        finalize(() => {
        console.log('hide Spinner');
        spinnerSvc.hideSpinner();
      }) );
  } else {
    console.log('enviar refresh_token');
    const authRequest = addAuthorizationHeader(req);
    return next(authRequest);
  }

};
const addAuthorizationHeader = (req: HttpRequest<any>) => {
  const token = sessionStorage.getItem('refresh_token');
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
};
export const IS_PUBLIC = new HttpContextToken(() => false);