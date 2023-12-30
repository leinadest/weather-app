import { header, main } from '../index';
import getCurrentWeatherData, { 
    getLocationData,
    getForecastData,
    getMeasurementSystem,
    getMainWeatherData,
} from './data';

export async function handleForm(e) {
    e.preventDefault();

    const locationInput = e.target.querySelector('input').value;
    const args = await getMainWeatherData(locationInput);

    main.updateWeatherData(...args);
}
