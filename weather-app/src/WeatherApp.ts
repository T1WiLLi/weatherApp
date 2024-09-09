import accordionItem from "./components/Accordion";
import WeatherService from "./service/WeatherService";
import { UIManager } from "./UIManager";

export class WeatherApp {
    private weatherService: WeatherService;
    private uiManager: UIManager;
    private cache: Map<string, string>;
    private debounceTimer: number | null;

    constructor(uiManager: UIManager) {
        this.weatherService = new WeatherService();
        this.uiManager = uiManager;
        this.cache = new Map();
        this.debounceTimer = null;

        this.loadCacheFromLocalStorage();
    }

    debounceSearch(query: string): void {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }

        this.debounceTimer = window.setTimeout(() => {
            this.handleSearch(query);
        }, 300);
    }

    private loadCacheFromLocalStorage(): void {
        const cachedData = localStorage.getItem('weatherAppCache');
        if (cachedData) {
            const parsedCache = JSON.parse(cachedData) as { [key: string]: string };
            this.cache = new Map(Object.entries(parsedCache));
        }
    }

    private saveCacheToLocalStorage(): void {
        const cacheObject = Object.fromEntries(this.cache);  // Convert Map to object
        localStorage.setItem('weatherAppCache', JSON.stringify(cacheObject));
    }

    private async handleSearch(query: string) {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            this.uiManager.updateAccordionSection('');
            return;
        }

        if (this.cache.has(trimmedQuery)) {
            const cachedData = this.cache.get(trimmedQuery)!;
            this.uiManager.updateAccordionSection(cachedData);
            return;
        }

        this.uiManager.showLoading();

        try {
            const cities = await this.weatherService.fetchLocations(trimmedQuery);
            if (cities.length > 0) {
                this.uiManager.hideError();
                const forecastPromises = cities.map(city =>
                    this.weatherService.fetchForecast(city.latitude, city.longitude)
                        .then(forecast => accordionItem(city, forecast))
                );
                const accordionItems = await Promise.all(forecastPromises);
                const resultHTML = accordionItems.join('');

                this.cache.set(trimmedQuery, resultHTML);
                this.saveCacheToLocalStorage();
                this.uiManager.updateAccordionSection(resultHTML);
            } else {
                this.uiManager.showError("No cities found.");
            }
        } catch (error) {
            this.uiManager.showError("An error occurred while fetching data.");
        } finally {
            this.uiManager.hideLoading();
        }
    }
}
