import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../env/enviroment';
import { ICountry } from '../interfaces/contry.interface';
import { COUNTRY_KEY_LOCAL_STORAGE } from '../constants/country.constant';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly apiUrl = environment.countryApi;
  private readonly localStorage: LocalStorageService = inject(LocalStorageService);
  private readonly http: HttpClient = inject(HttpClient);
  private countriesSubject: BehaviorSubject<ICountry[] | null> = new BehaviorSubject<ICountry[] | null>(null);

  countries$: Observable<ICountry[] | null> = this.countriesSubject.asObservable();

  getCountries(): void {
    this.http.get<ICountry[]>(`${this.apiUrl}/allcountries`)
      .pipe(catchError((err: HttpErrorResponse) => {
        throw err;
      }))
      .subscribe((countries: ICountry[]) => this.setCountriesToLocalStorage(countries));
  }

  getCurrentCountries(): Observable<ICountry[] | null> {
    return this.countries$;
  }

  private setCountriesToLocalStorage(countries: ICountry[]): void {
    this.localStorage.setItem(COUNTRY_KEY_LOCAL_STORAGE, countries);
    this.countriesSubject.next(this.localStorage.getItem(COUNTRY_KEY_LOCAL_STORAGE));
  }
}
