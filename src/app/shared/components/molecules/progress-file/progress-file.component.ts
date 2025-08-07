import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-file',
  standalone: true,
  imports: [],
  templateUrl: './progress-file.component.html',
  styleUrls: ['./progress-file.component.scss']
})
export class ProgressFileComponent {
  @Input() progress = 0;
}
