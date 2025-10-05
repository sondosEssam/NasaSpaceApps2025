import { Component, inject } from '@angular/core';
import { PollutionData, WeatherData } from '../../models/interfaces';
import { PollutionService } from '../../core/services/pollution';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { KeyMetrices } from "./key-metrices/key-metrices";
@Component({
  selector: 'app-pollution',
  imports: [CommonModule, BaseChartDirective, FormsModule, KeyMetrices],
  templateUrl: './pollution.html',
  styleUrl: './pollution.css'
})
export class Pollution {
  //data arrays
  pollutionData: PollutionData[] = [];
  weatherData: WeatherData[] = [];
  //service
  pollutionDataService = inject(PollutionService);
  //chart congigration 


//line chart data ------
  pollutionChartData: ChartConfiguration<'line'>['data'] = {datasets:[]};
  weatherChartData: ChartConfiguration<'line'>['data'] = {datasets:[]};
  //cahrt options 
  pollutionChartOptions: ChartOptions<'line'> ={};
  weatherChartOptions: ChartOptions<'line'> ={}
  //time scaling 
  selectedTimeRange = 'daily'
  filteredPollutionData: PollutionData[] = [];
  filteredWeatherData: WeatherData[] = [];



//key metrics data
keyMetrics: any[]=[];

  ngOnInit(){
  this.loadPollutionData();
  this.loadWeatherData();
  this.setUpChartOptions();
}
//======================================================General Functions==================================================================== 
//load pollution data 
loadPollutionData(){
  this.pollutionDataService.getPollutionData().subscribe({
    next:(data)=>{
      this.pollutionData =data;
      this.filterDataByTimeRange();
      this.updatePollutionChart();
    },
    error:(error)=>{
      console.error('Error loading pollution data:', error);
    }
  })
}
//load weather data
loadWeatherData(){
  this.pollutionDataService.getWeatherData().subscribe({
    next:(data)=>{
      this.weatherData =data;
      this.filterDataByTimeRange();
      this.updateWeatherChart();
    },
    error:(error)=>{
      console.error('Error loading weather data:', error);
    }
  })
}
//handle time chnage 
onTimeChange(){
  this.filterDataByTimeRange();
  this.updatePollutionChart();
  this.updateWeatherChart();
}
//======================================================General Functions====================================================================

// =======================================Line Chart Functions====================================================================
//set chart options 
setUpChartOptions (){
this.pollutionChartOptions={
  responsive:true,
  maintainAspectRatio: false,
  plugins:{
    legend:{
      display:true,
      position:'top',
    },
    title:{
      display:true,
      text:"pollution data over time"
    }
  },
  scales:{
    x:{
      display:true,
      title:{
        display:true,
        text:"Time"
      }
    },
    y:{
      display:true,
      title:{
        display:true,
        text:"Aerosol Optical Depth"
    },//auto scale y axis
    beginAtZero:false,
    grace:'50%',

  }
}

}
this.weatherChartOptions={
  responsive:true,
  maintainAspectRatio: false,
  plugins:{
    legend:{
      display:true,
      position:'top',
    },  title: {
          display: true,
          text: 'Weather Data Over Time'
        }
      },
      scales:{
        x:{
          display:true,
          title:{
            display:true,
            text:'Time'
          }
        },
        y:{
          type:'linear',
          display:true,
          position:'left',
          title:{
            display:true,
            text:'Temperature (°C)'
          },
          beginAtZero:false,
          grace:'5%'
        },
        y1:{
          type:'linear',
          position:'right',
          display:true,
          title:{
            display:true,
            text:'Pressure (kPa)'
          },
          grid:{
            drawOnChartArea:false
          },
          beginAtZero:false,
          grace:'5%'
        },
      }
    }
  }
//set time range 
filterDataByTimeRange(){
 switch(this.selectedTimeRange){
  case'daily':
    this.filteredPollutionData = this.pollutionData.slice(-24);
    this.filteredWeatherData = this.weatherData.slice(-24);
    break;
  case'weekly':
    this.filteredPollutionData = this.pollutionData.filter((_,index)=>index%24===0).slice(-7);
    this.filteredWeatherData = this.weatherData.filter((_,index)=>index%24===0).slice(-7);
    break;
  case'monthly':
    this.filteredPollutionData = this.pollutionData.filter((_,index)=>index%24===0).slice(-30);
    this.filteredWeatherData = this.weatherData.filter((_,index)=>index%24===0).slice(-30);
    break;
  default:
    this.filteredPollutionData = this.pollutionData;
    this.filteredWeatherData = this.weatherData;
 }
}

//format time stamp
formatTimestamp(timestamp:string): string {
  const date = new Date(timestamp);
  switch(this.selectedTimeRange){
    case'daily':
      return date.toLocaleString('en-US', {hour:'2-digit', minute:'2-digit'});
    case'weekly':
      return date.toLocaleString('en-US', {month:'short', day:'numeric'});
    case'monthly':
      return date.toLocaleString('en-US', {month:'short', day:'numeric'});
      default:
  return date.toLocaleString('en-US', {month:'short',
    day:'numeric',
    hour:'2-digit',
    minute:'2-digit'
  
  }
  )
  }

}
  getTimeRangeDisplayName(): string {
    switch (this.selectedTimeRange) {
      case 'daily': return 'Daily (by Hours)';
      case 'weekly': return 'Weekly (by Days)';
      case 'monthly': return 'Monthly (by Days)';
      default: return 'All Data';
    }
  }
  //create pollution chart data
  updatePollutionChart(){
    //labels 
    const labels = this.filteredPollutionData.map(item=>this.formatTimestamp(item.timestamp));
  //tottal aresoal optical depth
  const totalAOD = this.filteredPollutionData.map(item=>item.TOTEXTTAU);
  //data points for black carbon
  const blackCarbon = this.filteredPollutionData.map(item=>item.BCEXTTAU);
  //data points for dust
  const dust = this.filteredPollutionData.map(item=>item.DUEXTTAU);
  //set up chart
  this.pollutionChartData = {
    labels,
    datasets:[
      {
        label:'Total Aerosol Optical Depth',
        data:totalAOD,
        borderColor:'rgba(255, 99, 132, 1)',
        backgroundColor:'rgba(255, 99, 132, 0.2)',
        fill:true,
        borderWidth:2,
        tension:0.4
      },
      {
        label:'Black Carbon',
        data:blackCarbon,
        borderColor:'rgba(54, 162, 235, 1)',
        backgroundColor:'rgba(54, 162, 235, 0.2)',
        fill:false,
        borderWidth:2,
        tension:0.4
      },
      {
        label:'Dust',
        data:dust,
        borderColor:'rgba(255, 206, 86, 1)',
        backgroundColor:'rgba(255, 206, 86, 0.2)',
        fill:false,
        borderWidth:2,
        tension:0.4
      }
    ]
  }
  }
  //create weather chart data
   updateWeatherChart() {
    
    // Create labels (timestamps)
    const labels = this.filteredWeatherData.map(item => this.formatTimestamp(item.timestamp));

    // Create data points for Temperature (convert from Kelvin to Celsius)
    const temperatureData = this.filteredWeatherData.map(item => item.T2M - 273.15);

    // Create data points for Pressure (convert from Pa to kPa)
    const pressureData = this.filteredWeatherData.map(item => item.PS / 1000);

    this.weatherChartData = {
      labels: labels,
      datasets: [
        {
          data: temperatureData,
          label: 'Temperature (°C)',
          borderColor: '#F59E0B', // Orange
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          data: pressureData,
          label: 'Pressure (kPa)',
          borderColor: '#8B5CF6', // Purple
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    };
  }
// =======================================Line Chart Functions====================================================================
//========================================Key Mertrices Card======================================================================
handleKeyMetricsChange(event?: any) {
  this.keyMetrics = event;
}
//========================================Key Mertrices Card======================================================================


}