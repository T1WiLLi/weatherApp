export interface Forecast {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    daily_units: Dailyunits;
    daily: Daily;
}

export interface Daily {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];   
    weathercode: number[];   
    sunrise: string[];
    sunset: string[];
    windspeed_10m_max: number[];
    winddirection_10m_dominant: number[];
    precipitation_probability: number[];
}

export interface Dailyunits {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    apparent_temperature_max: string;
    apparent_temperature_min: string;
    weathercode: string;
    sunrise: string;
    sunset: string;
    windspeed_10m_max: string;
    winddirection_10m_dominant: string;
}