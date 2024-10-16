import { Component, inject, OnInit } from '@angular/core';
import { Weather } from '../../classes/weather.class';
import { Observable } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitleGroup } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { FavoritesService, IFavorites } from '../../services/favorites.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardModule,
    MatCardContent,
    NgOptimizedImage,
    MatFormField,
    MatIcon,
    MatIconButton,
    FormsModule,
    MatInput,
    MatFormFieldModule,
    MatFabButton,
  ],
  templateUrl: './home.component.html',
  styles: `
    .btn-favorite {
      bottom: 1.5rem;
      right: 1.5rem;
    }
  `,
})
export class HomeComponent implements OnInit {
  weather$: Observable<Weather | null>;
  newCity = '';
  private readonly weatherService: WeatherService = inject(WeatherService);
  private readonly favoriteService: FavoritesService = inject(FavoritesService);

  ngOnInit(): void {
    this.weather$ = this.weatherService.getCurrentWeather();
  }

  addCityToFav(weather: Weather): void {
    if (this.weather$) {
      const favorite: IFavorites = {
        cityId: weather.id,
        country: weather.sys.country,
        city: weather.name,
      };
      this.favoriteService.addFavorite(favorite);
    }
  }

  searchCity(event: any): void {
    if (event.key === 'Enter' && this.newCity.length) {
      this.weatherService.getNewCity(this.newCity)
    }
  }
}
