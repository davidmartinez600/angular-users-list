import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyUsersComponent } from '@atoms/empty-users/empty-users.component';

@Component({
  selector: 'app-empty-data-table',
  standalone: true,
  imports: [CommonModule, EmptyUsersComponent],
  templateUrl: './empty-data-table.component.html',
  styleUrls: ['./empty-data-table.component.scss']
})
export class EmptyDataTableComponent {

  @Input() title: string = 'No hay datos por mostrar';
}
