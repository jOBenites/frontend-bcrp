import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { showToastDuration } from "../utils/utils.constants";
import { SessionService } from "./session.service";
import { SpinnerObserverService } from "./spinner-observer.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private spinnerService: SpinnerObserverService,
      private session: SessionService,
      private snackBar: MatSnackBar,
      private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.showSpinner();
        return next.handle(req)
        .pipe(
          finalize(() => {
           this.spinnerService.hideSpinner();
          }),
          catchError(err => {
            console.log(err.status);
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                  // window.location.href = "/login";
                  this.router.navigateByUrl('login');
              } else if (err.status === 400 || err.status === 404 || err.status === 0) {
                this.snackBar.open('Error de conexión', '✗',
                { duration: showToastDuration, panelClass: ['error-snackbar']});
              }
            }
            return throwError(() => err);
          })
        );
    }
}
