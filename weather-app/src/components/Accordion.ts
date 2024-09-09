import { DirectionHelper } from "../helper/DirectionHelper";
import CurrentWeatherService from "../service/CurrentWeatherService";
import { DateTimeService } from "../service/DateTimeService";
import WeatherCode from "../service/WeatherCode";
import { City } from "../types/City";
import { Weather } from "../types/CurrentWeather";
import { Forecast } from "../types/DailyForceast";
import { LocalDateTime } from "../types/LocalDateTime";
import forecastItem from "./ForecastTemplate";

export default async function accordionItem(city: City, forecast: Forecast): Promise<string> {
    const collapseId = `collapse-${city.id}`;
    const dateTime: LocalDateTime = new DateTimeService().getCurrentLocalDateTime();
    const currentWeather: Weather = await new CurrentWeatherService().getCurrentWeather(city.latitude, city.longitude);

    let forecastItems = '';
    for (let i = 1; i <= 7; i++) {
        forecastItems += forecastItem(i, forecast);
    }

    return `
        <div class="accordion mb-3" id="accordionExample-${city.id}">
            <div class="accordion-item">
                <header class="accordion-header wrap-words">
                    <button class="accordion-button collapsed" data-bs-toggle="collapse"
                        data-bs-target="#${collapseId}">
                        <div class="d-flex flex-column">
                            <h2 class="fs-5 fw-bold">
                                <i class="fa-solid fa-location-dot me-2 text-primary"></i>${city.name}
                            </h2>
                            <h3 class="fs-6 country">
                                ${city.country}
                            </h3>
                        </div>
                    </button>
                </header>

                <div id="${collapseId}" class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample-${city.id}">
                    <div class="weather accordion-body text-start">
                        <div>
                            <h4 class="text-white fs-6 fw-bold">Current local date and time</h4>
                            <div>
                                ${dateTime.dayOfWeek} ${dateTime.day} ${dateTime.month} ${dateTime.year} ${dateTime.time}
                            </div>
                        </div>
                        <hr class="border-white">
                        <div>
                            <h4 class="text-white fs-6 fw-bold">Current conditions</h4>
                            <div class="d-flex justify-content-between gap-2 flex-wrap">
                                <div class="row flex-wrap">
                                    <div class="col">
                                        <img class="weather-icon" src="${WeatherCode.getImageForCode(currentWeather.current_weather.weathercode)}"
                                            alt="Overcast">
                                    </div>
                                    <div class="col">
                                        <div>Overcast</div>
                                        <div class="fs-1 fw-bold">${currentWeather.current_weather.temperature}°</div>
                                    </div>
                                </div>
                                <div class="weather-grid">
                                    <div>
                                        <i class="fa-solid fa-temperature-three-quarters"></i>
                                        <span>${forecast.daily.apparent_temperature_max[0]}°</span>
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-droplet"></i>
                                        <span>${forecast.hourly.precipitation_probability[0]}%</span>
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-wind"></i>
                                        <span>${currentWeather.current_weather.windspeed} km/h</span>
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-compass"></i>
                                        <span>${DirectionHelper.getDirection(currentWeather.current_weather.winddirection)}</span>
                                    </div>
                                    <div>
                                        <span class="d-flex gap-1 align-items-center">
                                            <span class="d-flex flex-column">
                                                <i class="fa-solid fa-chevron-up"></i>
                                                <i class="fa-solid fa-sun"></i>
                                            </span>
                                            <span>${forecast.daily.sunrise[0].split("T")[1]}</span>
                                        </span>
                                    </div>
                                    <div>
                                        <span class="d-flex gap-1 align-items-center">
                                            <span class="d-flex flex-column">
                                                <i class="fa-solid fa-chevron-down"></i>
                                                <i class="fa-solid fa-sun"></i>
                                            </span>
                                            <span>${forecast.daily.sunset[0].split("T")[1]}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="border-white">
                        <div>
                            <h4 class="text-white fs-6 fw-bold mb-3">Daily Forecast</h4>
                            <div class="weather-details-grid mb-2">
                                ${forecastItems}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
