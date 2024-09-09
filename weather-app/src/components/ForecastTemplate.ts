import { getDayOfWeek } from "../helper/DateTimeHelper";
import WeatherCode from "../service/WeatherCode";
import { Forecast } from "../types/DailyForceast";

export default function forecastItem(id: number, forecast: Forecast): string {
    return `
        <div class="rounded-2 p-3 shadow border border-1 border-dark">
            <div class="row flex-wrap">
                <div class="col mt-2">
                    <h5 class="fs-6 fw-bold mb-0">${getDayOfWeek(forecast.daily.time[id])}</h5>
                    <div class="mb-3"><small>${forecast.daily.time[id]}</small></div>
                    <img class="weather-detail-icon"
                        src="${WeatherCode.getImageForCode(forecast.daily.weathercode[id])}"
                        alt="${WeatherCode.getDescriptionForCode(forecast.daily.weathercode[id])}">
                    <div class="fw-bold mb-2">${WeatherCode.getDescriptionForCode(forecast.daily.weathercode[id])}</div>
                </div>
                <div class="col mt-2">
                    <div class="mb-3">
                        <i class="fa-solid fa-temperature-three-quarters"></i>
                        <span>${forecast.daily.apparent_temperature_max[id]}°</span>
                    </div>
                    <div class="mb-3">
                        <i class="fa-solid fa-wind"></i>
                        <span>${forecast.daily.windspeed_10m_max[id]} km/h</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-droplet"></i>
                        <span>${forecast.hourly.precipitation_probability[id]}%</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}