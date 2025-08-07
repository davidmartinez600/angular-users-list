import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuardFn } from '@app/core/guards/auth-fn.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
];
