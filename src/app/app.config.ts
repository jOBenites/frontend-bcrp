import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { getDutchPaginatorIntl } from './utils/lenguaje-paginator-intl'
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { JwtModule } from "@auth0/angular-jwt";
import { SessionService } from './services/session.service';
import { authInterceptor } from './services/auth.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';

const baseUrl = environment.apiRest;

export function tokenGetter() {
  return new SessionService().getToken();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline', floatLabel: 'always'} },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000} },
    importProvidersFrom(
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: [baseUrl],
                disallowedRoutes: [
                  `${baseUrl}/oauth/login`,
                  `${baseUrl}/oauth/refreshToken`,
                  `${baseUrl}/oauth/logout`,
                  `${baseUrl}/oauth/captcha`
                ],
            },
        }),
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor])
    ),
  ]
};
