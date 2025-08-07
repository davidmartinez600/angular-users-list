import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSmallComponent } from '../card-small/card-small.component';
import { ICtaCards } from '@app/shared/interfaces/cta-cards.interface';

@Component({
  selector: 'app-navbar-cards-cta',
  standalone: true,
  imports: [CommonModule, CardSmallComponent],
  templateUrl: './navbar-cards-cta.component.html',
  styleUrls: ['./navbar-cards-cta.component.scss']
})
export class NavbarCardsCtaComponent {

  @Input() ctaCards: ICtaCards[] = [];
  @Input() title: string = '';
}
