import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root'})
export class WeatherService {

    static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';

    getWeatherIcon(id) {
        if (id >= 200 && id <= 232) {
            return WeatherService.ICON_URL + 'art_storm.png';
        } else if (id >= 501 && id <= 511) {
            return WeatherService.ICON_URL + 'art_rain.png';
 } else if (id === 500 || (id >= 520 && id <= 531)) {
            return WeatherService.ICON_URL + 'art_light_rain.png';
 } else if (id >= 600 && id <= 622) {
            return WeatherService.ICON_URL + 'art_snow.png';
 } else if (id >= 801 && id <= 804) {
            return WeatherService.ICON_URL + 'art_clouds.png';
 } else if (id === 741 || id === 761) {
            return WeatherService.ICON_URL + 'art_fog.png';
 } else {
            return WeatherService.ICON_URL + 'art_clear.png';
 }
    }
}
