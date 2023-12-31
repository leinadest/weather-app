import { header, main, aside } from '../index';
import getCurrentWeatherData, { 
    getLocationData,
    getForecastData,
    getMeasurementSystem,
    getMainWeatherData,
    getOtherWeathersData,
} from './data';

export async function handleForm(e) {
    e.preventDefault();

    const locationInput = e.target.querySelector('input').value;
    const mainWeatherData = await getMainWeatherData(locationInput);
    const otherWeathersData = await getOtherWeathersData(locationInput);
    const measurementSystem = getMeasurementSystem();

    if (!document.querySelector('aside')) aside.render();

    main.updateWeatherData(...mainWeatherData);
    aside.updateOtherWeathersData(otherWeathersData, measurementSystem);
}
