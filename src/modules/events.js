import { header, main, aside, infoSection } from '../index';
import getCurrentWeatherData, {
  getLocationData,
  getForecastData,
  getMeasurementSystem,
  getMainWeatherData,
  getOtherWeathersData,
  getAdditionalData,
} from './data';

export default async function handleForm(e) {
  e.preventDefault();

  const location = e.target.querySelector('input').value;
  const mainWeatherData = await getMainWeatherData(location);
  const otherWeathersData = await getOtherWeathersData(location);
  const additionalData = await getAdditionalData(location);

  if (!document.querySelector('aside')) aside.render();
  if (!document.querySelector('.additional-info')) infoSection.render();

  main.updateWeatherData(...mainWeatherData);
  aside.updateOtherWeathersData(otherWeathersData);
  infoSection.updateInfo(additionalData);
}
