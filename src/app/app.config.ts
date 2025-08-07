import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { routes } from './app.routes';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './core/interceptors/auth/token.interceptor';
import { FakeAuthInterceptor } from './core/interceptors/auth/fake-auth.interceptor';
import { environment } from '../environments/environment';

registerLocaleData(es);

export const AppConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    // Solo agregar si estamos en desarrollo
    ...(environment.production
      ? []
      : [
          {
            provide: HTTP_INTERCEPTORS,
            useClass: FakeAuthInterceptor,
            multi: true,
          },
        ]),
    { provide: LOCALE_ID, useValue: 'es-CO' },
    [CookieService],
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
};
