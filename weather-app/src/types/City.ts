export interface CitiesReponse {
    results: City[];
    generationtime_ms: number;
}

export interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    timezone: string;
    postcodes?: string[];
    country_id: number;
    country: string;
    admin1_id?: number;
    admin2_id?: number;
    admin3_id?: number;
    population?: number;
    admin1?: string;
    admin2?: string;
    admin3?: string;
    admin4_id?: number;
    admin4?: string;
}