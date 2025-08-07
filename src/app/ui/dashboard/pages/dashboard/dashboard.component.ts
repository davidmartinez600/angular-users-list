import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TolbarTopComponent } from '@organims/tolbar-top/tolbar-top.component';
import { ISystemState } from '@app/core/models/users/system.model';
import { UIServiceService } from '@app/core/services/ui/uiservice.service';

import { CTA_CARDS } from '../../utils/cta-cards.constant';
import { ICtaCards } from '@interfaces/cta-cards.interface';
import { NavbarCardsCtaComponent } from '@organims/navbar-cards-cta/navbar-cards-cta.component';
import { IconUsersComponent } from '@atoms/icon-users/icon-users.component';
import { IconFilesComponent } from '@app/shared/components/atoms/icon-files/icon-files.component';
import { IconAdminsComponent } from '@app/shared/components/atoms/icon-admins/icon-admins.component';
import { IconUploadsComponent } from '@app/shared/components/atoms/icon-uploads/icon-uploads.component';
import { CardDashboardComponent } from '@app/shared/components/molecules/card-dashboard/card-dashboard.component';

/** ANGULAR MODULES */

const MATERIAL_MODULES = [];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TolbarTopComponent,
    NavbarCardsCtaComponent,
    IconUsersComponent,
    IconFilesComponent,
    IconAdminsComponent,
    IconUploadsComponent,
    CardDashboardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private _uiService = inject(UIServiceService);
  /**
   * Muestra el titulo de la página en navbar Top
   * @default 'Dashboard'
   * @type {string}
   * @memberof DashboardComponent
   */
  titleToolbar: string = 'Dashboard';

  /**
   * Permite mostrar datsos del sistema
   * @type {ISystemState}
   * @memberof DashboardComponent
   */
  systemData: ISystemState = {
    userCount: '0',
    adminCount: '0',
    fileCount: 0,
    totalSize: '0 MB',
  };

  /**
   * Obtiene las cards de CTA para el dashboard
   * @readonly
   * @type {ICtaCards[]}
   * @memberof DashboardComponent
   */
  get ctaCards(): ICtaCards[] {
    return CTA_CARDS;
  }

  ngOnInit(): void {
    this._uiService.dataSystem().subscribe({
      next: (response) => {
        this.systemData = response;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
