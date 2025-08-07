import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ICtaCards } from '@app/shared/interfaces/cta-cards.interface';

// ANGULAR MATERIAL MODULES
const MATERIAL_MODULES = [
  MatCardModule,
  MatIconModule
]

@Component({
  selector: 'app-card-small',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_MODULES],
  templateUrl: './card-small.component.html',
  styleUrls: ['./card-small.component.scss']
})
export class CardSmallComponent {

  /**
   * Recibe los datos de los CTA Cards
   * @type {ICtaCards}
   * @memberof CardSmallComponent
   */
  @Input() ctaCard!: ICtaCards;


  private _router = inject(Router);

  navigateTo( link: string , external: boolean = false) {
    if( external ) {
      window.open(link, '_blank');
      return;
    }
    this._router.navigate([link]);
  }
}
