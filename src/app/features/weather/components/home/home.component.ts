import { Component, inject, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../classes/weather.class';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  templateUrl: 'home.component.html',
  styles: ``,
})
export class HomeComponent implements OnInit {
  weather$: Observable<Weather | null>;
  private readonly weatherService: WeatherService = inject(WeatherService);

  ngOnInit(): void {
    this.weather$ = this.weatherService.getCurrentWeather();
    this.weather$.subscribe((data: any) => console.log(data));
  }
}
