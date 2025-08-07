import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from '@angular/router';
import { TokenService } from "../services/auth/token.service";

export const authGuardFn: CanActivateFn = () => {
  const _tokenService = inject(TokenService);
  const _routerService = inject(Router);

  const token = _tokenService.getToken();
  if (!token) {
    return _routerService.createUrlTree(['/auth/login']);
  }
  return true;
}
