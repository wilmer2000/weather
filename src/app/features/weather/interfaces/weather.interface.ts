export interface IWeatherCoord {
  lon: number;
  lat: number;
}

export interface IWeatherState {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherMain {
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
  seaLevel: number;
  grndLevel: number;
}

export interface IWeatherWind {
  speed: number;
  deg: number;
}

export interface IWeatherClouds {
  all: number;
}

export interface IWeatherSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
