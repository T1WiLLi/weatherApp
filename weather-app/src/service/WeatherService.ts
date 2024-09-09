import { City, CitiesReponse } from "../types/City";
import { Daily, Dailyunits, Forecast, Hourly } from "../types/DailyForceast";

export default class WeatherService {
    private baseForecastApiUrl = "https://api.open-meteo.com/v1/forecast";
    private baseLocationApiUrl = "https://geocoding-api.open-meteo.com/v1/search";

    public async fetchForecast(latitude: number, longitude: number): Promise<Forecast> {
        const url = `${this.baseForecastApiUrl}?latitude=${latitude}&longitude=${longitude}&forecast_days=8&timezone=auto&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,weathercode,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant&hourly=precipitation_probability`;
        try {
            const response = await fetch(url);
            console.log('Forecast Response:', response);
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Forecast Error:', errorText);
                throw new Error(`Failed to fetch forecast data: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Received forecast data:', JSON.stringify(data, null, 2));
            return this.deserializeForecast(data);
        } catch (error) {
            console.error('Fetch forecast error:', error);
            throw error;
        }
    }

    public async fetchLocations(query: string): Promise<City[]> {
        const url = `${this.baseLocationApiUrl}?name=${query}&count=10&language=fr`;
        try {
            const response = await fetch(url);
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: CitiesReponse = await response.json();
            console.log('Data:', data);
            return this.deserializeCities(data);
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    private deserializeCities(data: CitiesReponse): City[] {
        if (!data.results || !Array.isArray(data.results)) {
            console.error('Unexpected data structure:', data);
            return [];
        }

        return data.results.map((city: City) => ({
            id: city.id,
            name: city.name,
            latitude: city.latitude,
            longitude: city.longitude,
            elevation: city.elevation,
            feature_code: city.feature_code,
            country_code: city.country_code,
            timezone: city.timezone,
            postcodes: city.postcodes,
            country_id: city.country_id,
            country: city.country,
            admin1_id: city.admin1_id,
            admin2_id: city.admin2_id,
            admin3_id: city.admin3_id,
            population: city.population,
            admin1: city.admin1,
            admin2: city.admin2,
            admin3: city.admin3,
            admin4_id: city.admin4_id,
            admin4: city.admin4,
        }));
    }

    private deserializeForecast(data: any): Forecast {
        return {
            latitude: data.latitude,
            longitude: data.longitude,
            generationtime_ms: data.generationtime_ms,
            utc_offset_seconds: data.utc_offset_seconds,
            timezone: data.timezone,
            timezone_abbreviation: data.timezone_abbreviation,
            elevation: data.elevation,
            daily_units: this.deserializeDailyUnits(data.daily_units),
            daily: this.deserializeDaily(data.daily),
            hourly: this.deserializeHourly(data.hourly)
        };
    }

    private deserializeDailyUnits(units: any): Dailyunits {
        return {
            time: units.time,
            temperature_2m_max: units.temperature_2m_max,
            temperature_2m_min: units.temperature_2m_min,
            apparent_temperature_max: units.apparent_temperature_max,
            apparent_temperature_min: units.apparent_temperature_min,
            weathercode: units.weathercode,
            sunrise: units.sunrise,
            sunset: units.sunset,
            windspeed_10m_max: units.windspeed_10m_max,
            winddirection_10m_dominant: units.winddirection_10m_dominant
        };
    }

    private deserializeDaily(daily: any): Daily {
        return {
            time: daily.time,
            temperature_2m_max: daily.temperature_2m_max,
            temperature_2m_min: daily.temperature_2m_min,
            apparent_temperature_max: daily.apparent_temperature_max,
            apparent_temperature_min: daily.apparent_temperature_min,
            weathercode: daily.weathercode,
            sunrise: daily.sunrise,
            sunset: daily.sunset,
            windspeed_10m_max: daily.windspeed_10m_max,
            winddirection_10m_dominant: daily.winddirection_10m_dominant
        };
    }

    private deserializeHourly(hourly: any): Hourly {
        return {
            time: hourly.time,
            precipitation_probability: hourly.precipitation_probability
        };
    }
}


