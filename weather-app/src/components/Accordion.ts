import { DirectionHelper } from "../helper/DirectionHelper";
import CurrentWeatherService from "../service/CurrentWeatherService";
import { DateTimeService } from "../service/DateTimeService";
import WeatherCode from "../service/WeatherCode";
import { City } from "../types/City";
import { Weather } from "../types/CurrentWeather";
import { Forecast } from "../types/DailyForceast";
import { LocalDateTime } from "../types/LocalDateTime";

export default async function accordionItem(index: number, city: City, forecast: Forecast): Promise<string> {
    const collapseId = `collapse-${index}`
    const dateTime: LocalDateTime = new DateTimeService().getCurrentLocalDateTime();
    const currentWeather: Weather = await new CurrentWeatherService().getCurrentWeather(city.latitude, city.longitude);
    return `
        <div class="accordion mb-3" data-accordion="">
                    <div class="accordion-item">

                        <!-- Entête d'une ville -->
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

                        <!-- Détail d'une ville, le data-collapse doit être unique, prendre un ID de la réponse de l'API -->
                        <div data-collapse-${collapseId}="" class="accordion-collapse collapse"
                            data-bs-parent="[data-accordion]">
                            <div class="weather accordion-body text-start">
                                <div>
                                    <div>
                                        <h4 class="text-white fs-6 fw-bold">Current local date and time</h4>
                                        <div>
                                            ${dateTime.dayOfWeek}
                                            ${dateTime.day}
                                            ${dateTime.month}
                                            ${dateTime.year}
                                            ${dateTime.time}
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
                                                    <span>${forecast.daily.precipitation_probability[0]}%</span>
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
                                </div>
                                <hr class="border-white">
                                <div>
                                    <div>
                                        <h4 class="text-white fs-6 fw-bold mb-3">Daily Forecast</h4>
                                        <div class="weather-details-grid mb-2">
                                            <div class="rounded-2 p-3 shadow border border-1 border-dark">
                                                <div class="row flex-wrap">
                                                    <div class="col mt-2">
                                                        <h5 class="fs-6 fw-bold mb-0">Today</h5>
                                                        <div class="mb-3"><small>10/27</small></div>
                                                        <img class="weather-detail-icon"
                                                            src="/images/rainy.svg"
                                                            alt="Rain showers: Slight intensity">
                                                        <div class="fw-bold mb-2">Rain showers: Slight intensity</div>
                                                    </div>
                                                    <div class="col mt-2">
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-temperature-three-quarters"></i>
                                                            <span>14.3°</span>
                                                        </div>
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-wind"></i>
                                                            <span>25.9 km/h</span>
                                                        </div>
                                                        <div>
                                                            <i class="fa-solid fa-droplet"></i>
                                                            <span>89%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="rounded-2 p-3 shadow border border-1 border-dark">
                                                <div class="row flex-wrap">
                                                    <div class="col mt-2">
                                                        <h5 class="fs-6 fw-bold mb-0">Tomorrow</h5>
                                                        <div class="mb-3"><small>10/28</small></div>
                                                        <img class="weather-detail-icon"
                                                            src="/images/rainy.svg"
                                                            alt="Rain: Slight intensity">
                                                        <div class="fw-bold mb-2">Rain: Slight intensity</div>
                                                    </div>
                                                    <div class="col mt-2">
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-temperature-three-quarters"></i>
                                                            <span>14°</span>
                                                        </div>
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-wind"></i>
                                                            <span>36.1 km/h</span>
                                                        </div>
                                                        <div>
                                                            <i class="fa-solid fa-droplet"></i>
                                                            <span>87%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="rounded-2 p-3 shadow border border-1 border-dark">
                                                <div class="row flex-wrap">
                                                    <div class="col mt-2">
                                                        <h5 class="fs-6 fw-bold mb-0">Sunday</h5>
                                                        <div class="mb-3"><small>10/29</small></div>
                                                        <img class="weather-detail-icon"
                                                            src="/images/rainy.svg"
                                                            alt="Rain showers: Slight intensity">
                                                        <div class="fw-bold mb-2">Rain showers: Slight intensity</div>
                                                    </div>
                                                    <div class="col mt-2">
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-temperature-three-quarters"></i>
                                                            <span>15.4°</span>
                                                        </div>
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-wind"></i>
                                                            <span>35.8 km/h</span>
                                                        </div>
                                                        <div>
                                                            <i class="fa-solid fa-droplet"></i>
                                                            <span>85%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="rounded-2 p-3 shadow border border-1 border-dark">
                                                <div class="row flex-wrap">
                                                    <div class="col mt-2">
                                                        <h5 class="fs-6 fw-bold mb-0">Monday</h5>
                                                        <div class="mb-3"><small>10/30</small></div>
                                                        <img class="weather-detail-icon"
                                                            src="/images/rainy.svg"
                                                            alt="Rain showers: Slight intensity">
                                                        <div class="fw-bold mb-2">Rain showers: Slight intensity</div>
                                                    </div>
                                                    <div class="col mt-2">
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-temperature-three-quarters"></i>
                                                            <span>13.3°</span>
                                                        </div>
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-wind"></i>
                                                            <span>21.1 km/h</span>
                                                        </div>
                                                        <div>
                                                            <i class="fa-solid fa-droplet"></i>
                                                            <span>88%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="rounded-2 p-3 shadow border border-1 border-dark">
                                                <div class="row flex-wrap">
                                                    <div class="col mt-2">
                                                        <h5 class="fs-6 fw-bold mb-0">Tuesday</h5>
                                                        <div class="mb-3"><small>10/31</small></div>
                                                        <img class="weather-detail-icon"
                                                            src="/images/rainy.svg"
                                                            alt="Rain showers: Slight intensity">
                                                        <div class="fw-bold mb-2">Rain showers: Slight intensity</div>
                                                    </div>
                                                    <div class="col mt-2">
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-temperature-three-quarters"></i>
                                                            <span>12.8°</span>
                                                        </div>
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-wind"></i>
                                                            <span>25.6 km/h</span>
                                                        </div>
                                                        <div>
                                                            <i class="fa-solid fa-droplet"></i>
                                                            <span>91%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="rounded-2 p-3 shadow border border-1 border-dark">
                                                <div class="row flex-wrap">
                                                    <div class="col mt-2">
                                                        <h5 class="fs-6 fw-bold mb-0">Wednesday</h5>
                                                        <div class="mb-3"><small>11/01</small></div>
                                                        <img class="weather-detail-icon"
                                                            src="/images/rainy.svg"
                                                            alt="Rain: Slight intensity">
                                                        <div class="fw-bold mb-2">Rain: Slight intensity</div>
                                                    </div>
                                                    <div class="col mt-2">
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-temperature-three-quarters"></i>
                                                            <span>12.3°</span>
                                                        </div>
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-wind"></i>
                                                            <span>27.2 km/h</span>
                                                        </div>
                                                        <div>
                                                            <i class="fa-solid fa-droplet"></i>
                                                            <span>90%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="rounded-2 p-3 shadow border border-1 border-dark">
                                                <div class="row flex-wrap">
                                                    <div class="col mt-2">
                                                        <h5 class="fs-6 fw-bold mb-0">Thursday</h5>
                                                        <div class="mb-3"><small>11/02</small></div>
                                                        <img class="weather-detail-icon"
                                                            src="/images/rainy.svg"
                                                            alt="Rain: Slight intensity">
                                                        <div class="fw-bold mb-2">Rain: Slight intensity</div>
                                                    </div>
                                                    <div class="col mt-2">
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-temperature-three-quarters"></i>
                                                            <span>13.7°</span>
                                                        </div>
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-wind"></i>
                                                            <span>48.3 km/h</span>
                                                        </div>
                                                        <div>
                                                            <i class="fa-solid fa-droplet"></i>
                                                            <span>82%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="rounded-2 p-3 shadow border border-1 border-dark">
                                                <div class="row flex-wrap">
                                                    <div class="col mt-2">
                                                        <h5 class="fs-6 fw-bold mb-0">Friday</h5>
                                                        <div class="mb-3"><small>11/03</small></div>
                                                        <img class="weather-detail-icon"
                                                            src="/images/rainy.svg"
                                                            alt="Rain: Slight intensity">
                                                        <div class="fw-bold mb-2">Rain: Slight intensity</div>
                                                    </div>
                                                    <div class="col mt-2">
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-temperature-three-quarters"></i>
                                                            <span>10.7°</span>
                                                        </div>
                                                        <div class="mb-3">
                                                            <i class="fa-solid fa-wind"></i>
                                                            <span>49.2 km/h</span>
                                                        </div>
                                                        <div>
                                                            <i class="fa-solid fa-droplet"></i>
                                                            <span>76%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    `
}