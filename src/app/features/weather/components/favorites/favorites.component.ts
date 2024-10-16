import { Component, inject } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { FavoritesService } from '../../services/favorites.service';
import { AsyncPipe } from '@angular/common';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  styles: ``,
  imports: [
    MatList,
    MatListItem,
    AsyncPipe,
    MatGridList,
    MatGridTile,
  ],
})
export class FavoritesComponent {
  private readonly favoritesService: FavoritesService = inject(FavoritesService);

  favorites$ = this.favoritesService.getFavorites();
}
