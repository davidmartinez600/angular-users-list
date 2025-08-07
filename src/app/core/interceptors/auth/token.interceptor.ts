import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@services/auth/token.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private _tokenService: TokenService,
    private _cookieService: CookieService
  ) {}

  /**
   * Interceptor para agregar el token de acceso a las peticiones Auth
   * @param request
   * @param next
   * @returns
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    this._expiredToken(request);
    return next.handle(request);
  }

  /**
   * Agrega el token de acceso a las peticiones Auth
   * @param request
   * @returns
   * @memberof TokenInterceptor
   */
  private addToken(request: HttpRequest<unknown>) {
    const token = this._tokenService.getToken();
    if (token) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      return authReq;
    }
    return request;
  }

  private _expiredToken(request: HttpRequest<unknown>) {
    const token = this._tokenService.getToken();
    if (token) {
      const expiredCookie = this._cookieService.get('labchsl_expired_in');
      const expirationTime = new Date(expiredCookie).getTime();
      const nowTime = new Date().getTime();
      const expired_in_seg = (expirationTime - nowTime) / 1000;
      if (expired_in_seg > 10 && expired_in_seg <= 60) {
        console.log('Token pronto a ser expirado in', expired_in_seg);
        this._tokenService.sesionUserIsRefresh();
      }
    }
    return request;
  }
}
