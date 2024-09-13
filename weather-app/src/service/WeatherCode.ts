export default class WeatherCode {
    private static imageMap: { [key: number]: string } = {
        0: 'day.svg',
        1: 'cloudy.svg',
        2: 'cloudy.svg',
        3: 'cloudy.svg',
        45: 'fog.png',
        48: 'fog.png',
        51: 'rainy.svg',
        53: 'rainy.svg',
        55: 'rainy.svg',
        56: 'rainy.svg',
        57: 'rainy.svg',
        61: 'rainy.svg',
        63: 'rainy.svg',
        65: 'rainy.svg',
        66: 'rainy.svg',
        67: 'rainy.svg',
        71: 'snowy.svg',
        73: 'snowy.svg',
        75: 'snowy.svg',
        77: 'snowy.svg',
        80: 'rainy.svg',
        81: 'rainy.svg',
        82: 'rainy.svg',
        85: 'snowy.svg',
        86: 'snowy.svg',
        95: 'thunder.svg',
        96: 'thunder.svg',
        99: 'thunder.svg'
    };

    private static descriptionMap: { [key: number]: string } = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Light rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Light snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Light rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Light snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with hail',
        99: 'Thunderstorm with heavy hail'
    };

    public static getImageForCode(code: number): string {
        return `./images/${this.imageMap[code] || 'day.svg'}`;
    }

    public static getDescriptionForCode(code: number): string {
        return this.descriptionMap[code] || 'Unknown';
    }
}

