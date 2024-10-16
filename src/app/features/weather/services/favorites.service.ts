import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FAVORITES_KEY_LOCAL_STORAGE } from '../constants/favorites.constant';

export interface IFavorites {
  countryId: string;
  country: string;
  state: string;
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
    return this.data$;
  }

  addFavorite(favorite: IFavorites): void {
    let currentFavorites = this.dataSubject.getValue();
    if (currentFavorites) {
      currentFavorites = [...currentFavorites, favorite];
    } else {
      currentFavorites = [favorite];
    }
    this.localStorage.setItem(FAVORITES_KEY_LOCAL_STORAGE, currentFavorites);
    this.dataSubject.next(currentFavorites);
  }

  updateFavorite(updatedFavorite: IFavorites): void {
    const currentFavorites = this.dataSubject.getValue();
    if (currentFavorites) {
      const index = currentFavorites.findIndex(fav => fav.countryId === updatedFavorite.countryId);
      if (index !== -1) {
        currentFavorites[index] = updatedFavorite;
        this.localStorage.setItem(FAVORITES_KEY_LOCAL_STORAGE, currentFavorites);
        this.dataSubject.next(currentFavorites);
      }
    }
  }

  removeFavorite(countryId: string): void {
    const currentFavorites = this.dataSubject.getValue();
    if (currentFavorites) {
      const newFavorites = currentFavorites.filter((fav: IFavorites) => fav.countryId !== countryId);
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
}
