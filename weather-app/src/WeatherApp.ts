import accordionItem from "./components/Accordion";
import WeatherService from "./service/WeatherService";
import { UIManager } from "./UIManager";

type CachedData = {
    resultHTML: string;
    timestamp: number;
}

export class WeatherApp {
    private weatherService: WeatherService;
    private uiManager: UIManager;
    private cache: Map<string, CachedData>;
    private debounceTimer: number | null;
    private cacheExpiryTime: number = 3600000;

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
            const parsedCache = JSON.parse(cachedData) as { [key: string]: CachedData };
            Object.entries(parsedCache).forEach(([query, data]) => {
                this.cache.set(query, data);
            });
        }
    }

    private saveCacheToLocalStorage(): void {
        const cacheObject = Object.fromEntries(this.cache);
        localStorage.setItem('weatherAppCache', JSON.stringify(cacheObject));
    }

    private isCacheExpired(timestamp: number): boolean {
        const currentTime = Date.now();
        return currentTime - timestamp > this.cacheExpiryTime;
    }

    private async handleSearch(query: string) {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            this.uiManager.updateAccordionSection('');
            return;
        }

        if (this.cache.has(trimmedQuery)) {
            const cachedData = this.cache.get(trimmedQuery)!;
            if (!this.isCacheExpired(cachedData.timestamp)) {
                this.uiManager.updateAccordionSection(cachedData.resultHTML);
                return;
            } else {
                this.cache.delete(trimmedQuery);
                this.saveCacheToLocalStorage();
            }
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

                const cachedData: CachedData = {
                    resultHTML: resultHTML,
                    timestamp: Date.now()
                };

                this.cache.set(trimmedQuery, cachedData);
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
