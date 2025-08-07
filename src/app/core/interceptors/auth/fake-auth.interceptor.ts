import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { fakeUsers } from '@app/core/mocks/users.data';

@Injectable()
export class FakeAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = req;

    // Login
    if (url.endsWith('/login') && method === 'POST') {
      return of(null).pipe(
        delay(1000),
        mergeMap(() => {
          const user = fakeUsers.find((u) => u.email === body.email && u.password === body.password);
          if (!user) {
            return throwError(() => ({ status: 401, message: 'Credenciales inválidas' }));
          }

          return of(
            new HttpResponse({
              status: 200,
              body: {
                access_token: 'fake-jwt-token',
                expires_in: 3600,
                userData: {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                },
              },
            })
          );
        })
      );
    }

    // Datos del usuario actual
    if (url.endsWith('/user') && method === 'GET') {
      const user = fakeUsers[0]; // o simular token con ID
      return of(null).pipe(
        delay(500),
        mergeMap(() =>
          of(
            new HttpResponse({
              status: 200,
              body: {
                userData: {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                },
              },
            })
          )
        )
      );
    }

    // Lista de usuarios
    if (url.includes('/user/list') && method === 'GET') {
      return of(null).pipe(
        delay(500),
        mergeMap(() =>
          of(
            new HttpResponse({
              status: 200,
              body: {
                user: fakeUsers.map(({ password, ...user }) => user),
              },
            })
          )
        )
      );
    }

    // Datos para edición
    if (url.includes('/user/edit/') && method === 'GET') {
      const userId = parseInt(url.split('/').pop() || '0', 10);
      const user = fakeUsers.find((u) => u.id === userId);
      if (!user) {
        return throwError(() => ({ status: 404, message: 'Usuario no encontrado' }));
      }

      return of(null).pipe(
        delay(500),
        mergeMap(() =>
          of(
            new HttpResponse({
              status: 200,
              body: { user },
            })
          )
        )
      );
    }

    // Otros requests
    return next.handle(req);
  }
}
