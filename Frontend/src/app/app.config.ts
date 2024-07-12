import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Importar withInterceptorsFromDi

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // Asegurarse de usar withInterceptorsFromDi()
  ]
};
