import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '@services/auth/auth.service';

/* Material Modeules */
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

const MATERIAL_MODULES = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
];
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, ...MATERIAL_MODULES],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /**
   * Permite crear un formulario reactivo para el inicio de sesión.
   * @param {FormBuilder} fb
   * @memberof LoginComponent
   * @private
   */
  private _fb = inject(FormBuilder);

  /**
   * Permite redireccionar a la página de registro.
   * @param {Router} router
   * @memberof LoginComponent
   * @private
   */
  private _router = inject(Router);

  /**
   * Permite mostrar un mensaje de error tupo alera¿ta en caso de que el usuario o la contraseña sean incorrectos.
   * @memberof LoginComponent
   * @private
   * @readonly
   */
  private _snackBar = inject(MatSnackBar);

  /**
   * Permite cambiar el título de la página.
   * @memberof LoginComponent
   * @private
   * @readonly
   */
  private _titleService = inject(Title);

  /**
   * Permite controlar el inicio de sesión de un usuario.
   * @memberof LoginComponent
   * @private
   * @readonly
   */
  private _auth = inject(AuthService);

  /**
   * Permite mostrar u ocultar la contraseña del usuario.
   * @type {boolean}
   * @memberof LoginComponent
   * @public
   */
  showPassword = false;

  /**
   * Permite mostrar u ocultar el formulario de inicio de sesión.
   * @type {boolean}
   * @memberof LoginComponent
   * @public
   */
  showSpinner = false;

  /**
   * Permite crear un formulario reactivo para el inicio de sesión.
   * @type {FormGroup}
   * @memberof LoginComponent
   * @public
   */
  form!: FormGroup;

  constructor() {
    this.buildForm();
    this._titleService.setTitle('LABCHSL | Iniciar Sesión');
  }

  /**
   * Permite crear un formulario reactivo para el inicio de sesión.
   * @memberof LoginComponent
   * @private
   */
  private buildForm() {
    this.form = this._fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Permite controlar el inicio de sesión de un usuario.
   * @memberof LoginComponent
   * @public
   */
  onSubmit(): void {
    this.showSpinner = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.openSnackBar('Verifica tus datos', 'cerrar');
      this.showSpinner = false;
      return;
    }

    const { email, password } = this.form.getRawValue();
    this._auth.login(email, password).subscribe({
      next: (response) => {
        this._router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        this.showSpinner = false;
        this.openSnackBar('El usuario o contraseña son invalidos', 'cerrar');
      },
      complete: () => {
        this.showSpinner = false;
      },
    });
  }

  /**
   * Permite mostrar un mensaje de error tupo alera¿ta en caso de que el usuario o la contraseña sean incorrectos.
   * @param message
   * @param action
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
