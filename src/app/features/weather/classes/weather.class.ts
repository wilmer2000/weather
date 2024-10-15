import {
  IWeatherClouds,
  IWeatherCoord,
  IWeatherMain,
  IWeatherState,
  IWeatherSys,
  IWeatherWind,
} from '../interfaces/weather.interface';

export class Weather {
  coord: IWeatherCoord;
  weather: IWeatherState[];
  base: string;
  main: IWeatherMain;
  visibility: number;
  wind: IWeatherWind;
  clouds: IWeatherClouds;
  dt: number;
  sys: IWeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;

  constructor(data: any) {
    this.coord = data.coord;
    this.weather = data.weather;
    this.base = data.base;
    this.main = {
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      seaLevel: data.main.sea_level,
      grndLevel: data.main.grnd_level,
    };
    this.visibility = data.visibility;
    this.wind = data.wind;
    this.clouds = data.clouds;
    this.dt = data.dt;
    this.sys = data.sys;
    this.timezone = data.timezone;
    this.id = data.id;
    this.name = data.name;
    this.cod = data.cod;
  }

  // Example method to return the temperature in Celsius
  getTemperatureInCelsius(): number {
    return ((this.main.temp - 32) * 5) / 9;
  }

  // Example method to get a summary of weather
  getWeatherSummary(): string {
    if (this.weather.length > 0) {
      return `${this.weather[0].main}: ${this.weather[0].description}`;
    }
    return '';
  }
}
