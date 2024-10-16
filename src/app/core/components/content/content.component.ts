import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDrawer, MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../../features/weather/components/section/menu/menu.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MenuComponent,
    MatToolbar,
    MatIcon,
    RouterOutlet,
    MatIconButton,
    MatSidenavModule,
  ],
  templateUrl: './content.component.html',
  styles: `
    :host {
      width: 100%;
      height: 100%;
      display: flex;
    }

    .example-container {
      width: 100%;
      display: block;
    }
  `,
})
export class ContentComponent {

}
