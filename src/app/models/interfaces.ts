export interface PollutionData {
  timestamp: string;
  BCEXTTAU: number;
  DUEXTTAU: number;
  OCEXTTAU: number;
  SSEXTTAU: number;
  SUEXTTAU: number;
  TOTEXTTAU: number;
}

export interface WeatherData {
  timestamp: string;
  PS: number;
  QV2M: number;
  T2M: number;
  U10M: number;
  V10M: number;
}

export interface SeparatedDataResponse {
  pollution: PollutionData[];
  weather: WeatherData[];
}

export interface Forecast {
  timestamp: string;
  pollution_level: string;
  advice: string;
}