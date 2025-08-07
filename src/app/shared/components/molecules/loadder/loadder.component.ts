import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loadder',
  standalone: true,
  imports: [ MatProgressSpinnerModule],
  templateUrl: './loadder.component.html',
  styleUrls: ['./loadder.component.scss']
})
export class LoadderComponent {

}
