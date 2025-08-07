import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuardFn } from '@app/core/guards/auth-fn.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuardFn],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./../dashboard/dashboard.routes').then(m => m.routes),
        title: 'App - Dashboard'
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./../usuarios/usuarios.routes').then(m => m.routes),
        title: 'App - Usuarios'
      },
      {
        path: 'perfil',
        loadChildren: () => import('./../perfil/perfil.routes').then(m => m.routes),
        title: 'App - Perfil'
      },
    ]
  }
];
