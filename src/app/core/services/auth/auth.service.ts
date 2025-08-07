import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { IUserAuth, IUserAuthResponse } from '@core/models/auth/user.model';
import { LoginResponse } from '@core/models/auth/login-response.model';
import { environment } from 'src/environments/environment';
import { IUser, IUserRegister } from '@core/models/auth/user-register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Permite realizar peticiones HTTP.
   * @memberof AuthService
   * @private
   * @readonly
   */
  private _http = inject(HttpClient);

  /**
   * Permite realizar operaciones con el token.
   * @memberof AuthService
   * @private
   * @readonly
   */
  private _tokenService = inject(TokenService);

  /**
   * Permite almacenar el estado de la autenticación de un usuario.
   * @memberof AuthService
   * @private
   * @readonly
   */
  private _authState$ = new BehaviorSubject<IUserRegister | null >(null);
  get getAuthState$(): Observable<IUserRegister | null> { return this._authState$; }
  setAuthState$(user: IUserRegister | null) { this._authState$.next(user); }


  constructor() {
    this.getProfile().subscribe({
      next: (response) => {
        if(!response.userData) return this.setAuthState$(null);
        this.setAuthState$(response.userData);
      },
      error: () => {
        this.setAuthState$(null);
        this.logout();
      }
    });
  }

  /**
   * Permite iniciar sesión de un usuario.
   * @param {string} email
   * @param {string} password
   * @returns
   */
  login(email: string, password: string) {
    const URL = `${environment.API_URL}/login`;
    return this._http.post<LoginResponse>(URL, {email, password})
    .pipe(
      tap(response => this._tokenService.saveToken(response.access_token, response.expires_in)),
      switchMap(_ => this.getProfile()),
      tap(response => this.setAuthState$(response.userData)),
      shareReplay()
    )
  }

  /**
  * El usuario finaliza su sesión y elimina el token.
  * @memberof AuthService
  * @public
  * @returns {void}
  */
  logout() {
    this._tokenService.clearToken();
  }

  refreshSesion() {
    const URL = `${environment.API_URL}/refresh`;
    return this._http.post<LoginResponse>(URL, null ).pipe(
      tap(response => this._tokenService.saveToken(response.access_token, response.expires_in)),
      switchMap(_ => this.getProfile()),
      tap(response => this.setAuthState$(response.userData)),
      shareReplay()
    )
  }

  /**
   * Obtiene el perfil del usuario autenticado.
   * @memberof AuthService
   * @returns {void}
   */
  getProfile() {
    const url = `${environment.API_URL}/user`;
    return this._http.get<IUserAuthResponse>(url);
  }

  /**
   * Registra un usuario.
   * @param user
   * @returns
   */
  registerUser(user:IUser){
    const url = `${environment.API_URL}/register`;
    return this._http.post<any>(url,user);
  }
}

