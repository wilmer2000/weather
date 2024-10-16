export interface ICountry {
  name: string;
  isoCode: string;
  flag: string;
  phonecode: string;
  currency: string;
  latitude: string;
  longitude: string;
  timezones: ICountryTZ[];
}

export interface ICountryTZ {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface ICity {
  name: string
  countryCode: string
  stateCode: string
  latitude: string
  longitude: string
}
