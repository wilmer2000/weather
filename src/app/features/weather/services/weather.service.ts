import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../env/enviroment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { WEATHER_KEY_LOCAL_STORAGE, WEATHER_MOCK_DATA } from '../constants/weather.constant';
import { Weather } from '../classes/weather.class';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = environment.weatherApi;
  private readonly http: HttpClient = inject(HttpClient);
  private readonly localStorage: LocalStorageService = inject(LocalStorageService);
  private dataSubject: BehaviorSubject<Weather | null> = new BehaviorSubject<Weather | null>(null);

  data$: Observable<Weather | null> = this.dataSubject.asObservable();

  getWeatherByCity(city: string): void {
    this.http.get(`${this.apiUrl}/${city}`)
      .pipe(catchError((err: HttpErrorResponse) => {
        throw err;
      }))
      .subscribe((data: any) => this.setWeatherToLocalStorage(data));
  }

  getCurrentWeather(): Observable<Weather | null> {
    if (!this.localStorage.hasItem(WEATHER_KEY_LOCAL_STORAGE)) {
      this.getWeatherByCity('montevideo');
    }
    return this.data$;
  }

  private setWeatherToLocalStorage(data: any): void {
    const city = new Weather(WEATHER_MOCK_DATA);
    this.localStorage.setItem(WEATHER_KEY_LOCAL_STORAGE, city);
    this.dataSubject.next(this.localStorage.getItem(WEATHER_KEY_LOCAL_STORAGE));
  }
}
