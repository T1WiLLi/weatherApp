import { Weather } from "../types/CurrentWeather";

export default class CurrentWeatherService {
    private API_URL = "https://api.open-meteo.com/v1/forecast";

    async getCurrentWeather(latitude: number, longitude: number): Promise<Weather> {
        const url = `${this.API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const response = await fetch(url);
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Weather = await response.json();
        return data;
    }
}
