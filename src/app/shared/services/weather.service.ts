import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherInfo } from '../models/weather-info';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com';

  constructor(private http: HttpClient) { }

  getWeatherByCoordinates(latitude: number, longitude: number): Observable<WeatherInfo> {
    let params = {
      latitude: latitude,
      longitude: longitude,
      current: 'temperature_2m,wind_speed_10m',
      hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m'
    };

    return this.http.get<WeatherInfo>(`${this.apiUrl}/v1/forecast`, {
      params: params
    });
  }
}