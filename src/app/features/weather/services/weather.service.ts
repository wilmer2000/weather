import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../env/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WEATHER_KEY_LOCAL_STORAGE } from '../constants/weather.constant';
import { Weather } from '../classes/weather.class';
import { API_KEYS } from '../../../../../api-keys';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = environment.weatherApi;
  private readonly http: HttpClient = inject(HttpClient);
  private readonly localStorage: LocalStorageService = inject(LocalStorageService);
  private readonly headers: HttpHeaders = new HttpHeaders()
    .set('x-rapidapi-host', 'open-weather13.p.rapidapi.com')
    .set('x-rapidapi-key', API_KEYS.prod);
  private dataSubject: BehaviorSubject<Weather | null> = new BehaviorSubject<Weather | null>(null);

  data$: Observable<Weather | null> = this.dataSubject.asObservable();

  getWeatherByCity(city: string): void {
    this.http.get(`${this.apiUrl}/city/${city}/EN`, { headers: this.headers })
      .subscribe((data: any) => this.setWeatherToLocalStorage(data));
  }

  getCurrentWeather(): Observable<Weather | null> {
    if (!this.localStorage.hasItem(WEATHER_KEY_LOCAL_STORAGE)) {
      this.getWeatherByCity('landon');
    }
    return this.data$;
  }

  private setWeatherToLocalStorage(data: any): void {
    const city = new Weather(data);
    this.localStorage.setItem(WEATHER_KEY_LOCAL_STORAGE, city);
    this.dataSubject.next(this.localStorage.getItem(WEATHER_KEY_LOCAL_STORAGE));
  }
}
