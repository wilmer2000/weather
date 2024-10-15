import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
  ],
  templateUrl: 'home.component.html',
  styles: ``
})
export class HomeComponent {

}
