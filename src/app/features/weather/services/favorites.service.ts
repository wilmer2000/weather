import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FAVORITES_KEY_LOCAL_STORAGE } from '../constants/favorites.constant';

export interface IFavorites {
  cityId: number;
  country: string;
  city: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly localStorage: LocalStorageService = inject(LocalStorageService);
  private dataSubject: BehaviorSubject<IFavorites[] | null> = new BehaviorSubject<IFavorites[] | null>(null);
  data$: Observable<IFavorites[] | null> = this.dataSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  getFavorites(): Observable<IFavorites[] | null> {
    if (!this.localStorage.hasItem(FAVORITES_KEY_LOCAL_STORAGE)) {
      this.loadFavorites();
    }
    return this.data$;
  }

  addFavorite(favorite: IFavorites): void {
    let favorites = this.dataSubject.getValue() || [];

    if (!this.favoriteExists(favorites, favorite.cityId)) {
      favorites = [...favorites, favorite];
      const favoritesString = JSON.stringify(favorites);
      this.localStorage.setItem(FAVORITES_KEY_LOCAL_STORAGE, favoritesString);
      this.dataSubject.next(favorites);
    }
  }

  removeFavorite(cityId: number): void {
    const currentFavorites = this.dataSubject.getValue();
    if (currentFavorites) {
      const newFavorites = currentFavorites.filter((fav: IFavorites) => fav.cityId !== cityId);
      this.localStorage.setItem(FAVORITES_KEY_LOCAL_STORAGE, newFavorites);
      this.dataSubject.next(newFavorites);
    }
  }

  private loadFavorites(): void {
    const favorites = this.localStorage.getItem<IFavorites[]>(FAVORITES_KEY_LOCAL_STORAGE);
    if (favorites) {
      this.dataSubject.next(favorites);
    }
  }

  private favoriteExists(favorites: IFavorites[], cityId: number): boolean {
    return favorites.some(fav => fav.cityId === cityId);
  }
}
