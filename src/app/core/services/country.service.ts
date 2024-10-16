import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../env/enviroment';
import { ICity, ICountry } from '../interfaces/contry.interface';
import { CITIES_KEY_LOCAL_STORAGE, COUNTRY_KEY_LOCAL_STORAGE } from '../constants/country.constant';
import { API_KEYS } from '../../../../api-keys';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly apiUrl = environment.countryApi;
  private readonly localStorage: LocalStorageService = inject(LocalStorageService);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly headers: HttpHeaders = new HttpHeaders()
    .set('x-rapidapi-host', 'country-state-city-search-rest-api.p.rapidapi.com')
    .set('x-rapidapi-key', API_KEYS.prod);

  private countriesSubject: BehaviorSubject<ICountry[] | null> = new BehaviorSubject<ICountry[] | null>(null);
  countries$: Observable<ICountry[] | null> = this.countriesSubject.asObservable();
  private citiesSubject: BehaviorSubject<ICity[] | null> = new BehaviorSubject<ICity[] | null>(null);
  cities$: Observable<ICity[] | null> = this.citiesSubject.asObservable();

  constructor() {
    if (this.localStorage.hasItem(COUNTRY_KEY_LOCAL_STORAGE)) {
      const countries: ICountry[] | null = this.localStorage.getItem(COUNTRY_KEY_LOCAL_STORAGE);
      this.countriesSubject.next(countries);
    }
    if (this.localStorage.hasItem(`${CITIES_KEY_LOCAL_STORAGE}UY`)) {
      const cities: ICity[] | null = this.localStorage.getItem(`${CITIES_KEY_LOCAL_STORAGE}UY`);
      this.citiesSubject.next(cities);
    }
  }

  getCurrentCountries(): Observable<ICountry[] | null> {
    if (!this.localStorage.hasItem(COUNTRY_KEY_LOCAL_STORAGE)) {
      this.getCountries();
    }
    return this.countries$;
  }

  getCurrentCities(countryCode: string = 'UY'): Observable<ICity[] | null> {
    if (!this.localStorage.hasItem(`${CITIES_KEY_LOCAL_STORAGE}${countryCode}`)) {
      this.getCitiesByCountryCode(countryCode);
    }
    return this.cities$;
  }

  changeCurrentCities(countryCode: string = 'UY'): void {
    if (!this.localStorage.hasItem(`${CITIES_KEY_LOCAL_STORAGE}${countryCode}`)) {
      this.getCitiesByCountryCode(countryCode);
    } else {
      const cities: ICity[] | null = this.localStorage.getItem(`${CITIES_KEY_LOCAL_STORAGE}${countryCode}`);
      this.citiesSubject.next(cities);
    }
  }

  private setCountriesToLocalStorage(countries: ICountry[]): void {
    this.localStorage.setItem(COUNTRY_KEY_LOCAL_STORAGE, countries);
    this.countriesSubject.next(this.localStorage.getItem(COUNTRY_KEY_LOCAL_STORAGE));
  }
  private setCitiesToLocalStorage(cities: ICity[]): void {
    const countryCode = cities[0].countryCode;
    this.localStorage.setItem(`${CITIES_KEY_LOCAL_STORAGE}${countryCode}`, cities);
    this.citiesSubject.next(this.localStorage.getItem(`${CITIES_KEY_LOCAL_STORAGE}${countryCode}`));
  }

  private getCountries(): void {
    this.http.get<ICountry[]>(`${this.apiUrl}/allcountries`, { headers: this.headers })
      .pipe(catchError((err: HttpErrorResponse) => {
        throw err;
      }))
      .subscribe((countries: ICountry[]) => this.setCountriesToLocalStorage(countries));
  }

  private getCitiesByCountryCode(countryCode: string = 'UY'): void {
    this.http.get<ICity[]>(`${this.apiUrl}/cities-by-countrycode?countrycode=${countryCode}`, { headers: this.headers })
      .pipe(catchError((err: HttpErrorResponse) => {
        throw err;
      }))
      .subscribe((cities: ICity[]) => this.setCitiesToLocalStorage(cities));
  }
}
