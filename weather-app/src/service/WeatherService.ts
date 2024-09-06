export default class WeatherService {
    // TODO: FIX BOTH URL, so that we can pass the correct params later
private forcastApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=46.04178&longitude=-73.11358&forecast_days=8&timezone=auto&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,weathercode,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant,precipitation_probability";    
private locationApiUrl = "https://geocoding-api.open-meteo.com/v1/search?name=Sorel&count=10&language=fr&format=json";

    // Create fuinction to fetch, and format the data.
}