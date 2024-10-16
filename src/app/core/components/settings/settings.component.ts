import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { SETTINGS_DEFAULT_VALUES } from '../../constants/languages.constant';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { SettingsService } from '../../services/settings.service';
import { ISetting } from '../../interfaces/setting.interface';
import { CountryService } from '../../services/country.service';
import { ICity, ICountry } from '../../interfaces/contry.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    KeyValuePipe,
    MatButton,
    AsyncPipe,
  ],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  readonly languages: Record<string, string> = SETTINGS_DEFAULT_VALUES;
  settingsForm: FormGroup = new FormGroup({
    location: new FormGroup({
      country: new FormControl('UY', Validators.required),
      city: new FormControl('', Validators.required),
    }),
    language: new FormControl('EN', Validators.required),
  });
  countryList$: Observable<ICountry[] | null>;
  citiesList$: Observable<ICity[] | null>;
  private readonly settingsService: SettingsService = inject(SettingsService);
  private readonly countryService: CountryService = inject(CountryService);

  ngOnInit(): void {
    const formValues = this.settingsService.getSettingsValue();
    this.settingsForm.patchValue(formValues);
    const countrySelected = this.settingsForm.get('location')?.get('country')?.value;

    this.countryList$ = this.countryService.getCurrentCountries();
    console.log(countrySelected);
    this.citiesList$ = this.countryService.getCurrentCities(countrySelected);
  }

  onCountryChange(event: MatSelectChange): void {
    this.countryService.changeCurrentCities(event.value);
  }

  save(): void {
    if (this.settingsForm.valid) {
      const settings: ISetting = this.settingsForm.value as ISetting;
      this.settingsService.save(settings);
    } else {
      this.settingsForm.markAllAsTouched();
    }
  }
}
