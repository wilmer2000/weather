import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../env/enviroment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { WEATHER_KEY_LOCAL_STORAGE } from '../constants/weather.constant';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = environment.weatherApi;
  private readonly http: HttpClient = inject(HttpClient);
  private readonly localStorage: LocalStorageService = inject(LocalStorageService);
  private dataSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  data$: Observable<any> = this.dataSubject.asObservable();

  getWeatherByCity(city: string): void {
    this.http.get(`${this.apiUrl}/${city}`)
      .pipe(catchError((err: HttpErrorResponse) => {
        throw err;
      }))
      .subscribe((city: any) => this.setWeatherToLocalStorage(city));
  }

  private setWeatherToLocalStorage(city: any): void {
    this.localStorage.setItem(WEATHER_KEY_LOCAL_STORAGE, city);
    this.dispatchUpdate(this.localStorage.getItem(WEATHER_KEY_LOCAL_STORAGE));
  }

  private dispatchUpdate(data: any): void {
    this.dataSubject.next(data);
  }

}
