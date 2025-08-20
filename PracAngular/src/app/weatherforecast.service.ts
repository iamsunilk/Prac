import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define a model interface for strong typing
export interface WeatherForecast {
  id: string;
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherforecastService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7041/WeatherForecast'; // Capitalization fix

  // GET all forecasts
  public get(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(this.apiUrl);
  }

  // POST new forecast
  public create(forecast: WeatherForecast): Observable<WeatherForecast> {
    return this.http.post<WeatherForecast>(this.apiUrl, forecast);
  }

  // PUT update forecast
  public update(id: string, forecast: WeatherForecast): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, forecast);
  }

  // DELETE forecast
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // GET by ID (optional)
  public getById(id: string): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(`${this.apiUrl}/${id}`);
  }
}
