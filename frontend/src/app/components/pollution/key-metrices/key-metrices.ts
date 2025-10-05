import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-key-metrices',
  imports: [],
  templateUrl: './key-metrices.html',
  styleUrl: './key-metrices.css'
})
export class KeyMetrices {
keyMetrics!: any[];
@Input() timeRange!: string;
@Input() filteredPollutionData!: any[];
@Input() filteredWeatherData!: any[];

@Output() keyMetricsChange = new EventEmitter<any[]>();


//========================================Key Mertrices Card======================================================================
calculateTrend(current:number, prevouis:number): { direction: string, percentage: string, color: string }{
  const diffrance = current - prevouis;
  const percentage= Math.abs((diffrance/prevouis)*100).toFixed(2);
  let direction = 'neutral';
  let color = 'grey'
  if(diffrance > 0){
    direction = 'up';
    color ="red";
  }
  else if(diffrance<0){
    direction="down",
    color="green"
  }
  return{
    direction,
    percentage,
    color
  }
}

calculateKeyMetrics(){
  if(this.filteredPollutionData.length===0 || this.filteredWeatherData.length===0){
    this.keyMetrics=[];
    return;
  }
  //get latest record 
  const latestPollution = this.filteredPollutionData[this.filteredPollutionData.length -1];
  const latestWeather = this.filteredWeatherData[this.filteredWeatherData.length -1];
  //previous record
  const previousPollution = this.filteredPollutionData.length> 1?this.filteredPollutionData[this.filteredPollutionData.length -2]:latestPollution;
  const previousWeather = this.filteredWeatherData.length>1?this.filteredWeatherData[this.filteredWeatherData.length -2]:latestWeather;
  //calc trnds 
  const totalAodTrend = this.calculateTrend(latestPollution.TOTEXTTAU, previousPollution.TOTEXTTAU);
      const temperatureTrend = this.calculateTrend(latestWeather.T2M, previousWeather.T2M);
    const pressureTrend = this.calculateTrend(latestWeather.PS, previousWeather.PS);
    const humidityTrend = this.calculateTrend(latestWeather.QV2M, previousWeather.QV2M);
   this.keyMetrics = [
      {
        name: 'Total Aerosol Optical Depth',
        value: latestPollution.TOTEXTTAU.toFixed(4),
        unit: '',
        icon: '🌫️',
        trend: totalAodTrend,
        color: 'blue'
      },
      {
        name: 'Temperature',
        value: (latestWeather.T2M - 273.15).toFixed(1),
        unit: '°C',
        icon: '🌡️',
        trend: temperatureTrend,
        color: 'red'
      },
      {
        name: 'Pressure',
        value: (latestWeather.PS / 1000).toFixed(1),
        unit: 'kPa',
        icon: '🔽',
        trend: pressureTrend,
        color: 'purple'
      },
        {
        name: 'Humidity',
        value: (latestWeather.QV2M * 100).toFixed(1),
        unit: '%',
        icon: '💧',
        trend: humidityTrend,
        color: 'green'
      }
    ];
  }
//========================================Key Mertrices Card======================================================================
ngOnChanges() {
  this.calculateKeyMetrics();
  this.keyMetricsChange.emit(this.keyMetrics);
}
ngOnInit(){
  this.calculateKeyMetrics();
  console.log(this.keyMetrics);
  
  this.keyMetricsChange.emit(this.keyMetrics);
}
}
