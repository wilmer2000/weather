import { Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatButton,
    MatList,
    MatListItem,
    RouterLink,
    MatIcon,
  ],
  template: `
    <mat-list role="list">
      <mat-list-item role="listitem">
        <button mat-button [routerLink]="'home'" (click)="onClick()">
          <mat-icon fontIcon="home"></mat-icon>
          Home
        </button>
      </mat-list-item>
      <mat-list-item role="listitem">
        <button mat-button [routerLink]="'favorites'" (click)="onClick()">
          <mat-icon fontIcon="favorite"></mat-icon>
          Favorites
        </button>
      </mat-list-item>
      <mat-list-item role="listitem">
        <button mat-button [routerLink]="'settings'" (click)="onClick()">
          <mat-icon fontIcon="settings"></mat-icon>
          Settings
        </button>
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
