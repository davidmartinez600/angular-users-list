import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TokenService } from './core/services/auth/token.service';
import { DialogComponent } from './shared/components/molecules/dialog-delete/dialog.component';
import { AuthService } from './core/services/auth/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  imports: [RouterModule, MatDialogModule, MatSnackBarModule],
  standalone: true,
})
export class AppComponent implements OnInit {

  private _tokenService = inject(TokenService);
  private _authService = inject(AuthService);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  private _refreshToken: boolean = false;
  private _showDialog = false;

  dialogoRef: MatDialogRef<DialogComponent> | undefined;
  tile = 'Su sesión esta pronta a expirar';
  message = 'Desea renovar su sesión?';

  ngOnInit(): void {
    this._tokenService.refreshToken$.subscribe((refreshToken) => {
      this._refreshToken = refreshToken;
      if(this._refreshToken) {
        this.openDialog();
      }
    });
  }

  openDialog() {
    if(this._showDialog) return;
    this.dialogoRef = this._dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title:  this.tile,
        message: this.message,
      },
    });
    this.dialogoRef.afterClosed().subscribe((dialogResult: boolean) => {
      if (!dialogResult) {
        this._snackBar.open('⚠️ Su sesión terminará en menos de dos minutos', undefined, {
          duration: 50000,
          panelClass: ['alert-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        return;
      }
      this.refreshSesion();
    });
    this._showDialog = true;
  }

  refreshSesion() {
    this._authService.refreshSesion().subscribe({
      next: (response) => {
        if( response.userData ) {
          this._tokenService.setRefreshToken(false);
          this._showDialog = false;
          this._snackBar.open('✅ Su sesión fue renovada con exito!', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });

        }
      },
      error: (error) => {
        console.error(error.errors.message)
        this._tokenService.setRefreshToken(false);
      },
    });
  }
}
