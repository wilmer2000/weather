import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ISetting } from '../interfaces/setting.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { SETTINGS_DEFAULT_VALUES } from '../constants/settings.constant';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly localStorage: LocalStorageService = inject(LocalStorageService);
  private settingSubject: BehaviorSubject<ISetting> = new BehaviorSubject(SETTINGS_DEFAULT_VALUES);

  setting$: Observable<ISetting> = this.settingSubject.asObservable();

  save(settings: ISetting): void {
    this.settingSubject.next(settings);
  }
}
