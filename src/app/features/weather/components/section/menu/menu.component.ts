import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatButton,
    MatList,
    MatListItem,
    RouterLink,
  ],
  template: `
    <mat-list role="list">
      <mat-list-item role="listitem">
        <button mat-button [routerLink]="'home'">Inicio</button>
      </mat-list-item>
      <mat-list-item role="listitem">
        <button mat-button [routerLink]="'favorites'">Favoritos</button>
      </mat-list-item>
      <mat-list-item role="listitem">
        <button mat-button [routerLink]="'settings'">Ajustes</button>
      </mat-list-item>
    </mat-list>
  `,
  styles: ``,
})
export class MenuComponent {

}
