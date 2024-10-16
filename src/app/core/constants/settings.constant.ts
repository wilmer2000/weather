import { ISetting } from '../interfaces/setting.interface';

export const SETTINGS_KEY_LOCAL_STORAGE = 'settings_key';
export const SETTINGS_DEFAULT_VALUES: ISetting = {
  location: {
    country: 'UY',
    state: '',
    city: '',
  },
  language: 'EN',
};

