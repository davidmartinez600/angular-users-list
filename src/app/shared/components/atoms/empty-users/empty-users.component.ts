import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-users.component.svg',
  styles: [`
    :host {
        cursor: default;
        text-align: center;
        justify-content: center;
        display: flex;
      }
  `]
})
export class EmptyUsersComponent {

}
