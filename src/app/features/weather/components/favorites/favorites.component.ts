import { Component, inject, OnInit } from '@angular/core';
import { MatList, MatListItem, MatListItemTitle, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { FavoritesService, IFavorites } from '../../services/favorites.service';
import { AsyncPipe } from '@angular/common';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatLine } from '@angular/material/core';

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
    MatCard,
    MatCardContent,
    MatMenu,
    MatMenuItem,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatListItemTitle,
    MatLine,
    MatListSubheaderCssMatStyler,
    MatButton,
  ],
})
export class FavoritesComponent implements OnInit {
  private readonly favoritesService: FavoritesService = inject(FavoritesService);
  favorites$: Observable<IFavorites[] | null>;

  ngOnInit(): void {
    this.favorites$ = this.favoritesService.getFavorites();
  }
  removeFav(cityId: number) {
    this.favoritesService.removeFavorite(cityId)
  }
}
