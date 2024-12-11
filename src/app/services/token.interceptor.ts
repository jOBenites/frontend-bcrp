import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpinnerObserverService } from "./spinner-observer.service";
import { AuthService } from "./auth.service";
import { catchError, finalize, Observable, switchMap } from "rxjs";

@Injectable()
export class TokensInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService, private spinnerSvc: SpinnerObserverService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.spinnerSvc.showSpinner();
    if (this.authSvc.isAuthenticated()) {
        const authRequest = addAuthorizationHeader(request);
        return next.handle(authRequest).pipe(
            catchError((error) => {
              return this.handleResponseError(error, authRequest, next);
            }),
            finalize(() => {
                this.spinnerSvc.hideSpinner();
            })
        );
    } else {
        // const clonedRequest = request.clone( { withCredentials: true } );
        return next.handle(request).pipe(
            catchError((error) => {
                return this.handleResponseError(error, request, next);
            }),
            finalize(() => {
                this.spinnerSvc.hideSpinner();
            })
        );
    }
  }

  handleResponseError(error: any, request?: any, next?: any): Observable<any> {
    if (error.status === 400) {
      //ErrorMessage
    } else if (error.status === 401) {
      return this.authSvc.refreshToken().pipe(
        switchMap(() => {
          const authRequest = addAuthorizationHeader(request);
          return next.handle(authRequest);
        }),
        catchError((e) => {
          if (e.status !== 401) {
            return this.handleResponseError(e, request, next);
          } else {
            return <any>this.authSvc.logout();
          }
        })
      );
    } else if (error.status === 403) {
      //ErrorMessage
    } else if (error.status === 500) {
      //ErrorMessage
    } else if (error.status === 503) {
      //ErrorMessage
    }
    return <any>this.authSvc.logout();
  }
}

const addAuthorizationHeader = (req: HttpRequest<any>) => {
    const token = localStorage.getItem('JWT');
    return req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
};