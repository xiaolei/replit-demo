import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './shared/services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WeatherInfo } from './shared/models/weather-info';
import { FormsModule } from '@angular/forms';
import { formatInTimeZone } from 'date-fns-tz';
import { parse } from "date-fns";
import { enGB } from 'date-fns/locale/zh-CN';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule],
  providers: [WeatherService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-angular-project';
  isLoading: boolean = true;
  weatherInfo: WeatherInfo | null = null;
  longitude: number = 39.77291162535372;
  latitude: number = 116.46982986913483;
  localDateTime: string = '';

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    if (!this.longitude || !this.latitude) {
      return;
    }

    this.isLoading = true;
    this.weatherService.getWeatherByCoordinates(this.longitude, this.latitude).subscribe({
      next: (weatherInfo) => {
        this.isLoading = false;
        this.weatherInfo = weatherInfo;

        if (!this.weatherInfo) {
          this.localDateTime = this.toLocalDateTime(weatherInfo.current.time);
        }
      }, error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    })
  }

  toLocalDateTime(value: string): string {
    if (!value) {
      return '';
    }

    let date = parse(value, "yyyy-MM-dd'T'hh:mm", new Date());
    return formatInTimeZone(date, 'Asia/Shanghai', 'yyyy-MM-dd HH:mm');
  }
}
