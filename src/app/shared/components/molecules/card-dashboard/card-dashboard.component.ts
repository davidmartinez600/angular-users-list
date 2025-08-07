import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconUsersComponent } from '../../atoms/icon-users/icon-users.component';

@Component({
  selector: 'app-card-dashboard',
  standalone: true,
  imports: [CommonModule, IconUsersComponent],
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss']
})
export class CardDashboardComponent {

  @Input() title: string = 'Usuarios';
  @Input() count: string | number = 0;
}
