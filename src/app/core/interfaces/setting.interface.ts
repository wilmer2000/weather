export interface ISetting {
  location: ISettingLoc;
  language: string;
}

export interface ISettingLoc {
  country: string;
  state: string;
  city: string;
}
