import { Routes } from '@angular/router';
import { authGuardFn } from './core/guards/auth-fn.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    canActivate: [authGuardFn],
    loadChildren: () => import('./ui/admin/admin.routes').then(admin => admin.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./ui/auth/auth.routes').then(auth => auth.routes),
  }
];
