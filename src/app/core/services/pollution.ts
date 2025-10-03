import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PollutionData, WeatherData } from '../../models/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  baseUrl = 'http://localhost:5000'
  constructor(private http: HttpClient){}

  getPollutionData():Observable<PollutionData[]> {
    return this.http.get<PollutionData[]>(`${this.baseUrl}/pollution`);
  }
  getWeatherData():Observable<WeatherData[]>{
    return this.http.get<WeatherData[]>(`${this.baseUrl}/weather`);
  }

}
