import { Routes } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { authGuardFn } from '@app/core/guards/auth-fn.guard';

export const routes: Routes = [
  {
    path: '',
    component: PerfilComponent ,
    canActivate: [authGuardFn],
  },
];
