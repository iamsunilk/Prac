import { Component, OnInit } from '@angular/core';
import { WeatherforecastService, WeatherForecast } from '../weatherforecast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  weatherForecasts: WeatherForecast[] = [];
  editingId: string | null = null;

  newForecast: Partial<WeatherForecast> = {
    date: '',
    temperatureC: 0,
     temperatureF: 0,
    summary: ''
  };

  editForecast: Partial<WeatherForecast> = {
    id: '',
    date: '',
    temperatureC: 0,
     temperatureF: 0,
    summary: ''
  };

  constructor(private weatherService: WeatherforecastService) {}

  ngOnInit(): void {
    this.getAllForecasts();
  }

  // Fetch all forecasts
  getAllForecasts(): void {
    this.weatherService.get().subscribe({
      next: (data) => {
        this.weatherForecasts = data;
      },
      error: (err) => {
        console.error('Error fetching forecasts', err);
      }
    });
  }

  // Start editing a forecast
  startEdit(forecast: WeatherForecast): void {
    this.editForecast = { ...forecast };
    this.editingId = forecast.id;
  }

  // Cancel editing
  cancelEdit(): void {
    this.editForecast = { id: '', date: '', temperatureC: 0, temperatureF: 0, summary: '' };
    this.editingId = null;
  }

  // Update forecast
  updateForecast(): void {
    if (!this.editForecast.id) return;
    this.weatherService.update(this.editForecast.id, this.editForecast as WeatherForecast).subscribe({
      next: () => {
        console.log('Forecast updated');
        this.cancelEdit();
        this.getAllForecasts();
      },
      error: (err) => {
        console.error('Error updating forecast', err);
      }
    });
  }

  // Delete forecast
  deleteForecast(id: string): void {
    this.weatherService.delete(id).subscribe({
      next: () => {
        console.log('Forecast deleted');
        this.getAllForecasts();
      },
      error: (err) => {
        console.error('Error deleting forecast', err);
      }
    });
  }

  // Confirm before deleting
  confirmDelete(id: string): void {
    if (confirm('Are you sure you want to delete this forecast?')) {
      this.deleteForecast(id);
    }
  }
}
