import { Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { authGuardFn } from '@app/core/guards/auth-fn.guard';

export const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent ,
    canActivate: [authGuardFn],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch : 'full'
      },
      {
        path: 'list',
        component: ListUsersComponent
      },
      {
        path: 'agregar',
        component: AdminUserComponent
      },
      {
        path: 'editar/:id',
        component: AdminUserComponent,
        pathMatch: 'full',
      },
      {
        path: 'editar',
        redirectTo: 'list',
      },
    ]
  },
];
