import { Component, Input, inject } from '@angular/core';
/* Material Modules */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
/* Services */
import { UIServiceService } from '@services/ui/uiservice.service';
import { NgIf } from '@angular/common';


const MATERIAL_MODULES = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressBarModule,
]

@Component({
  selector: 'app-tolbar-top',
  standalone: true,
  imports: [NgIf, ...MATERIAL_MODULES],
  templateUrl: './tolbar-top.component.html',
  styleUrls: ['./tolbar-top.component.scss'],
})
export class TolbarTopComponent {

  @Input() titleToolbar: string = 'LABCHSL';

  private _uiService = inject(UIServiceService);

  /**
   * Determina si se muestra el progress bar
   * @default true
   * @type {boolean}
   * @memberof TolbarTopComponent
  */
  showProgress = true;

  /**
   * Muestra el nav bar según el estado de la variable
   * @memberof TolbarTopComponent
   * @returns {void}
   */
  toggleDrawer() {
    this._uiService.toggleDrawer();
  }
}
