import showError from "./components/Error";
import showLoading from "./components/Loading";
import { clearSection } from "./helper/ComponentHelper";
import { WeatherApp } from "./WeatherApp";

export class UIManager {
    private errorSection: HTMLElement;
    private loadingSection: HTMLElement;
    private searchInput: HTMLInputElement;
    private clearButton: HTMLElement;
    private accordionSection: HTMLElement;
    private weatherApp: WeatherApp;

    constructor() {
        this.errorSection = document.querySelector('[data-error]')!;
        this.loadingSection = document.querySelector('[data-loading]')!;
        this.searchInput = document.querySelector('#search-bar-input')!;
        this.clearButton = document.querySelector('#clear-search')!;
        this.accordionSection = document.querySelector('[data-accordion-grid]')!;
        this.weatherApp = new WeatherApp(this);
        this.bindEvents();
    }

    private bindEvents(): void {
        this.searchInput.addEventListener('input', () => this.weatherApp.debounceSearch(this.searchInput.value));
        this.clearButton.addEventListener('click', () => this.clearSearch());
    }

    showLoading(): void {
        showLoading();
        this.loadingSection.classList.remove('d-none');
    }

    hideLoading(): void {
        clearSection('[data-loading]');
        this.loadingSection.classList.add('d-none');
    }

    showError(error: string): void {
        showError(error);
        this.errorSection.classList.remove('d-none');
    }


    hideError(): void {
        clearSection('[data-error]'); 
        this.errorSection.classList.add('d-none');
    }

    updateAccordionSection(html: string): void {
        this.accordionSection.innerHTML = html;
    }

    clearSearch(): void {
        this.searchInput.value = '';
        this.updateAccordionSection('');
    }
}
