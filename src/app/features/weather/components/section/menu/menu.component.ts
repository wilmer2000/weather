import { Component, output } from '@angular/core';
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
        <button mat-button [routerLink]="'home'" (click)="onClick()">Inicio</button>
      </mat-list-item>
      <mat-list-item role="listitem">
        <button mat-button [routerLink]="'favorites'" (click)="onClick()">Favoritos</button>
      </mat-list-item>
      <mat-list-item role="listitem">
        <button mat-button [routerLink]="'settings'" (click)="onClick()">Ajustes</button>
      </mat-list-item>
    </mat-list>
  `,
})
export class MenuComponent {
  onClickEmitter = output<void>();

  onClick() {
    this.onClickEmitter.emit();
  }
}
