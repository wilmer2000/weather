import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatGridList, MatGridTile, MatDrawerContent, MatDrawer, MatDrawerContainer, MatToolbar, MatIconButton, MatIcon, MatList, MatListItem, MatButton],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
})
export class AppComponent {
  title = 'weather';
}
