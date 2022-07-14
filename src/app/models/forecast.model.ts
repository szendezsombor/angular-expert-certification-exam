export interface ForecastModel {
    city: {
        country: string;
        name: string;
    };
    list: {
        temp: {
            day: number;
            min: number;
            max: number;
        }
        weather: {
            main: string;
            description: string;
            icon: string;
        }
    }[]
}
