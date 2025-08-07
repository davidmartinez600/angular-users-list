import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TolbarTopComponent } from '@organims/tolbar-top/tolbar-top.component';
import { AuthService } from '@app/core/services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { IUserRegister } from '@app/core/models/auth/user-register.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, TolbarTopComponent, MatIconModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {

  private _auth = inject(AuthService);

  /**
   * Muestra el titulo de la página
   * @default 'Usuarios'
   * @type {string}
   * @memberof UsuariosComponent
   */
  titleToolbar: string = 'Perfil';

  /**
   * Obtiene el usuario autenticado
   * @type {IUserAuth | null}
   * @memberof PerfilComponent
   */
  profileAuthUser: IUserRegister | null = null;


  constructor() {
    this._auth.getAuthState$.subscribe((user) => {
      this.profileAuthUser = user;
    });
  }
}
