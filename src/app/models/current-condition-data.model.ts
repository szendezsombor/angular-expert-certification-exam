export interface CurrentConditionDataModel {
    main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    wather: {
        description: string;
        icon: string;
        id: number;
        main: string;
    }[];
}
