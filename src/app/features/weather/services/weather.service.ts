import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../env/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
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

  constructor() {
    if (this.localStorage.hasItem(WEATHER_KEY_LOCAL_STORAGE)) {
      const city = new Weather(this.localStorage.getItem(WEATHER_KEY_LOCAL_STORAGE));
      this.dataSubject.next(city);
    }
  }

  getCurrentWeather(): Observable<Weather | null> {
    if (!this.localStorage.hasItem(WEATHER_KEY_LOCAL_STORAGE)) {
      this.getWeatherByCity('montevideo');
    }
    return this.data$;
  }

  private getWeatherByCity(city: string): void {
    this.http.get(`${this.apiUrl}/city/${city}/EN`, { headers: this.headers })
      .pipe(catchError((err: HttpErrorResponse) => {
        throw err;
      }))
      .subscribe((data: any) => this.setWeatherToLocalStorage(data));
  }

  private setWeatherToLocalStorage(data: any): void {
    const city = new Weather(data);
    this.localStorage.setItem(WEATHER_KEY_LOCAL_STORAGE, city);
    this.dataSubject.next(this.localStorage.getItem(WEATHER_KEY_LOCAL_STORAGE));
  }
}
