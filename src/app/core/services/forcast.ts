import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  baseUrl = 'http://localhost:5000'
  constructor(private http: HttpClient){}
  getForecastData() {
    return this.http.get<any>(`${this.baseUrl}/forecast`);
  }
}
