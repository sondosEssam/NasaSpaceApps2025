import { Component } from '@angular/core';
import { ForecastService } from '../../core/services/forcast';
import { IForecast } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ForecastChart } from "./forecast-chart/forecast-chart";

@Component({
  selector: 'app-forecast',
  imports: [CommonModule, ForecastChart],
  templateUrl: './forecast.html',
  styleUrl: './forecast.css'
})
export class Forecast {
  //inject service
  constructor(private forCastService: ForecastService) {}
  selectedTimeRange: string = 'Hours';
  forecastData: IForecast[] = [];
  hours!: number;
  body: any;
  resultClicked:boolean = false;
  //loading 
    isLoading: boolean = false; // Add loading state

  start_time: Date = new Date();



  onTimeRangeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTimeRange = selectElement.value;
    this.hoursHandler();

  }
  hoursHandler(){
    switch(this.selectedTimeRange){
      case 'Hours':
        this.hours = 24;
        break;
      case 'Days':
        this.hours = 24 * 7;
        break;
      case 'Weeks':
        this.hours = 7 * 24 * 4;
        break;
  }
    this.body = {
      hours: this.hours,
      start_time: this.start_time
    }

  }
  getForecast(){
    this.hoursHandler();
    console.log(this.body);
    //set loading to true 
    this.isLoading = true;
    this.resultClicked = true;
    this.forCastService.getForecastData(this.body).subscribe({
      next: (data) => {
        console.log(data);
        
        // Only assign if the event is an HttpResponse
        if (data) {
          this.forecastData = data.predictions;

          console.log(this.forecastData);
        }
        this.isLoading = false; // Set loading to false when data is received
      },
      error:(error)=>{
        console.log(error);
        console.log(this.body);
        this.isLoading = false; // Set loading to false on error
      }
    }
      )
    };

}

