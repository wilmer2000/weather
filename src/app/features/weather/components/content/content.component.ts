import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../section/menu/menu.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    MatButton,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatIcon,
    MatIconButton,
    MatList,
    MatListItem,
    MatToolbar,
    RouterOutlet,
    RouterLink,
    MenuComponent,
  ],
  templateUrl: 'content.component.html',
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
