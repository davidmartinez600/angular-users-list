import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Column, TableDataComponent } from '@molecules/table-data/table-data.component';
import { CTA_CARDS_USERS } from '../../utils/cta-cards-users.constant';
import { NavbarCardsCtaComponent } from '@organims/navbar-cards-cta/navbar-cards-cta.component';

import { IUserListResponse, IUserRegister } from '@core/models/auth/user-register.model';
import { ICtaCards } from '@interfaces/cta-cards.interface';

import { UserService } from '@services/users/users.service';
import { take } from 'rxjs';
import { LoadderComponent } from '@molecules/loadder/loadder.component';
import { IActionEvent } from '@app/shared/interfaces/event-action.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, NavbarCardsCtaComponent, TableDataComponent, LoadderComponent],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  /**
   * Permite listar los isiarios de tipo 'user' registrados en el sistema
   * @memberof ListUsersComponent
   * @private
   */
  private _users = inject(UserService);

  /**
   * Inyecta el router para poder navegar entre las rutas
   * @memberof ListUsersComponent
   * @private
   */
  private _router = inject(Router);

  /**
   * Permite mostrar el loadder mientras se obtienen los datos de los usuarios
   * @memberof ListUsersComponent
   * @public
   */
  isLoadderShow: boolean = true;

  /**
   * Columnas de la tabla para mostrar los usuarios
   * @memberof ListUsersComponent
   */
  columnsUsers: Column[] = [
    {
      columnDef: 'id',
      header: '#',
    },
    {
      columnDef: 'tipoid',
      header: 'Tipo de identificación',
    },
    {
      columnDef: 'numid',
      header: 'Número de identificación',
    },
    {
      columnDef: 'name',
      header: 'Nombre',
    },
    {
      columnDef: 'lastname',
      header: 'Apellido',
    },
    {
      columnDef: 'email',
      header: 'Correo',
    },
    {
      columnDef: 'show',
      header: 'Mostrar',
      isLink: true,
      icon: 'visibility '
    },
  ];

  /**
   * Datos de los usuarios
   * @memberof ListUsersComponent
   */
  dataUsers: any[] = [];

  /**
   * Obtiene los shorcode para el navbar
   * @memberof ListUsersComponent
   */
  get ctaCards(): ICtaCards[] {
    return CTA_CARDS_USERS;
  }

  ngOnInit(): void {
    this._users.listUser().pipe(take(1)).subscribe({
      next: (response: IUserListResponse) => {
        this.dataUsers = this.mapUserResponse(response.user);
      },
      error: (error) => {
        console.error(error);
        this.isLoadderShow = false;
      },
      complete: () => {
        this.isLoadderShow = false;
      }
    });
  }

  mapUserResponse(users: IUserRegister[]) {
    return users.map((user) => {
      return {
        id: user.id,
        tipoid: user.tipoid,
        numid: user.numid,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        show: `/admin/usuarios/editar/${user.id}`,
      };
    });
  }

  /**
   * Permite realizar una acción cuando se selecciona una acción en la tabla
   * @param objectEmited
   * @memberof ListUsersComponent
   */
  eventActionSelect( objectEmited: IActionEvent ) {
    const { action, row, column } = objectEmited;
    if( action === 'show' && action === column.columnDef ) {
      this._router.navigate([row[action]]);
    }
  }
}
