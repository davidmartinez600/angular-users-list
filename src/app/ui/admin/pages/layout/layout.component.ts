import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay, take } from 'rxjs';
import { UIServiceService } from '@services/ui/uiservice.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { IUserAuth } from '@app/core/models/auth/user.model';
import { IUserRegister } from '@app/core/models/auth/user-register.model';

const MATERIAL_MODULES = [MatSidenavModule, MatListModule, MatIconModule, MatDividerModule];
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, AsyncPipe, ...MATERIAL_MODULES],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _router = inject(Router);

  private _auth = inject(AuthService);

  private breakpointObserver = inject(BreakpointObserver);

  private uiService = inject(UIServiceService);

  /**
 * Obtiene el usuario autenticado
 * @type {IUserAuth | null}
 * @memberof PerfilComponent
 */
  profileAuthUser: IUserRegister | null = null;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor() {
    this._auth.getAuthState$.subscribe({
      next: (user) => {
        this.profileAuthUser = user;
      },
      error: (err) => {
        console.error(err.error.message);
        this.logout();
      }
    });
  }

  ngOnInit(): void {
    this.uiService.drawerState$.subscribe((state) => {
      this.drawer.toggle(state);
    });
  }

  logout() {
    this._auth.logout();
    this._router.navigate(['/auth/login']);
  }
}
