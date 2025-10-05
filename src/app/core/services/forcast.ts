import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  baseUrl = 'http://localhost:5000'
  constructor(private http: HttpClient){}
  getForecastData(body: any) {
    const params ={
    hours: body.hours,
    start_time: body.start_time.toISOString()
    }
    return this.http.get<any>(`${this.baseUrl}/prediction`,{params});
  }
}
