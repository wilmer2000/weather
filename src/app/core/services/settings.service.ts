import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ISetting } from '../interfaces/setting.interface';
import { BehaviorSubject } from 'rxjs';
import { SETTINGS_DEFAULT_VALUES, SETTINGS_KEY_LOCAL_STORAGE } from '../constants/settings.constant';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly localStorage: LocalStorageService = inject(LocalStorageService);
  private settingSubject: BehaviorSubject<ISetting> = new BehaviorSubject(SETTINGS_DEFAULT_VALUES);

  constructor() {
    if (this.localStorage.hasItem(SETTINGS_KEY_LOCAL_STORAGE)) {
      const settings = this.localStorage.getItem(SETTINGS_KEY_LOCAL_STORAGE) as ISetting;
      this.settingSubject.next(settings);
    }
  }

  getSettingsValue(): ISetting {
    if (!this.localStorage.hasItem(SETTINGS_KEY_LOCAL_STORAGE)) {
      return SETTINGS_DEFAULT_VALUES;
    }
    return this.settingSubject.getValue();
  }

  save(settings: ISetting): void {
    this.localStorage.setItem(SETTINGS_KEY_LOCAL_STORAGE, settings);
    this.settingSubject.next(settings);
  }
}
