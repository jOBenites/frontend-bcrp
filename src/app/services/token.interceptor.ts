import { HttpHandler, HttpInterceptor, HttpRequest, HttpContextToken } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpinnerObserverService } from "./spinner-observer.service";
import { AuthService } from "./auth.service";
import { catchError, finalize, Observable, switchMap, throwError } from "rxjs";

@Injectable()
export class TokensInterceptor implements HttpInterceptor {
  private reqLimit: number;
  constructor(private authSvc: AuthService, private spinnerSvc: SpinnerObserverService) {
    this.reqLimit = 0;
    console.log('reqLimit', this.reqLimit);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.spinnerSvc.showSpinner();
    if (request.context.get(IS_PUBLIC)) {
      // const clonedRequest = request.clone( { withCredentials: true } );
      return next.handle(request).pipe(
          finalize(() => {
              this.spinnerSvc.hideSpinner();
          })
      );
    } else {
      if(this.authSvc.isAuthenticated()) {
        const authRequest = addAuthorizationHeader(request);
        return next.handle(authRequest).pipe(
            finalize(() => {
                this.spinnerSvc.hideSpinner();
            })
        );
      } else {
        return next.handle(request).pipe(
          catchError((error) => {
            if(this.reqLimit <= 2) {
              return this.handleResponseError(error, request, next);
            }
            return throwError(error)
          }),
          finalize(() => {
              this.spinnerSvc.hideSpinner();
          })
      );
      }
    }
  }

  handleResponseError(error: any, request?: any, next?: any): Observable<any> {
    if (error.status === 400) {
      //ErrorMessage
    } else if (error.status === 401) {
      this.reqLimit++;
      return this.authSvc.refreshToken().pipe(
        switchMap(() => {
          const authRequest = addAuthorizationHeader(request);
          return next.handle(authRequest);
        }),
        catchError((e) => {
          console.log(e);
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
    // return throwError(error);
    return <any>this.authSvc.logout();
  }
}

const addAuthorizationHeader = (req: HttpRequest<any>) => {
    const token = localStorage.getItem('JWT');
    return req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
};
export const IS_PUBLIC = new HttpContextToken(() => false);