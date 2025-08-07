import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  private _cookieService = inject(CookieService);

  // beharioSunject para controlar el estado del refresh token
  private _refreshToken$ = new BehaviorSubject<boolean>(false);
  get refreshToken$() { return this._refreshToken$.asObservable(); }
  setRefreshToken(value: boolean) { this._refreshToken$.next(value); }

  /**
   * Permite guardar el token en el local storage.
   *
   * @param {string} token
   * @memberof TokenService
   * @public
   * @returns {void}
   */
  saveToken(token: string, expires_in: number) {
    const encodedToken = btoa(token);
    const expire = new Date();
    expire.setTime(expire.getTime() + expires_in * 1000);
    this._cookieService.set('labchsl_log', encodedToken, expire, '/');
    this._cookieService.set('labchsl_expired_in', expire.toString(), expire, '/');
  }

  /**
   * Permite obtener el token del local storage.
   *
   * @returns {string}
   * @memberof TokenService
   * @public
   * @returns {string} token
   */
  getToken(): string | null {
    const encodedToken = this._cookieService.get('labchsl_log');
    if (!encodedToken) return null;
    try {
      const decodedToken = atob(encodedToken);
      return decodedToken;
    } catch (error) {
      return null;
    }
  }

  /**
   * Permite eliminar el token del local storage.
   *
   * @memberof TokenService
   * @public
   * @returns {void}
   */
  clearToken() {
    this._cookieService.delete('labchsl_log', '/');
    this._cookieService.delete('labchsl_expired_in', '/');
  }


  sesionUserIsRefresh(){
    this.setRefreshToken(true);
  }
}
