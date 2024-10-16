import { Component, inject, OnInit } from '@angular/core';
import { Weather } from '../../classes/weather.class';
import { Observable } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitleGroup } from '@angular/material/card';

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
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  weather$: Observable<Weather | null>;
  private readonly weatherService: WeatherService = inject(WeatherService);

  ngOnInit(): void {
    this.weather$ = this.weatherService.getCurrentWeather();
  }
}
