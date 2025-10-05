import { Component, Input, SimpleChanges } from '@angular/core';
import { IForecast } from '../../../models/interfaces';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-forecast-chart',
  imports: [BaseChartDirective],
  templateUrl: './forecast-chart.html',
  styleUrl: './forecast-chart.css'
})
export class ForecastChart {
 //data arrays
  @Input()foreCastData!: IForecast[];
  //service

//line chart data ------
  forecasrtChartData: ChartConfiguration<'line'>['data'] = {datasets:[]};
  //cahrt options 
  forecastChartOptions: ChartOptions<'line'> ={};
  //time scaling 
  selectedTimeRange = 'hours'
  filteredForeCastData! : IForecast[];
  ngOnInit(){
  this.setUpChartOptions();
  this.updateForeCastChart();

}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['foreCastData'] && this.foreCastData?.length) {
      this.updateForeCastChart();
    }
  }
//======================================================General Functions==================================================================== 

//handle time chnage 
onTimeChange(){
  this.filterDataByTimeRange();
  this.updateForeCastChart();

}
//======================================================General Functions====================================================================

// =======================================Line Chart Functions====================================================================
//set chart options 
setUpChartOptions (){
this.forecastChartOptions={
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

  }
//set time range 
filterDataByTimeRange(){
 switch(this.selectedTimeRange){
  case'hours':
    this.filteredForeCastData = this.foreCastData.slice(-24);

    break;
  case'weekly':
    this.filteredForeCastData = this.foreCastData.filter((_,index)=>index%24===0).slice(-7);
    break;
  case'monthly':
    this.filteredForeCastData = this.foreCastData.filter((_,index)=>index%24===0).slice(-30);
    break;
  default:
    this.filteredForeCastData = this.foreCastData;
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
  updateForeCastChart(){
  //filter data based on time range
  console.log(this.foreCastData);
  
  this.filterDataByTimeRange();
  console.log(this.filteredForeCastData);
  
    //labels 
    
    
    const labels = this.filteredForeCastData.map(item=>this.formatTimestamp(item.time));
  //tottal aresoal optical depth
  const totalAOD = this.filteredForeCastData.map(item=>item.AQI_pred);
  console.log(totalAOD);
  
  //data points for black carbon
  const aoe_perd = this.filteredForeCastData.map(item=>item.AQI_pred);
  //data points for dust
  //set up chart
  this.forecasrtChartData = {
    labels,
    datasets:[
      {
        label:'Predicditions',
        data:totalAOD,
        borderColor:'rgba(255, 99, 132, 1)',
        backgroundColor:'rgba(255, 99, 132, 0.2)',
        fill:true,
        borderWidth:2,
        tension:0.4
      },
      {
        label:'AOD',
        data:totalAOD,
        borderColor:'rgba(54, 162, 235, 1)',
        backgroundColor:'rgba(54, 162, 235, 0.2)',
        fill:false,
        borderWidth:2,
        tension:0.4
      },
      {
        label:'Probability',
        data:aoe_perd,
        borderColor:'rgba(255, 206, 86, 1)',
        backgroundColor:'rgba(255, 206, 86, 0.2)',
        fill:false,
        borderWidth:2,
        tension:0.4
      }
    ]
  }
  }
// =======================================Line Chart Functions====================================================================
//========================================Key Mertrices Card======================================================================
// handleKeyMetricsChange(event?: any) {
//   this.keyMetrics = event;
// }
//========================================Key Mertrices Card======================================================================


}
