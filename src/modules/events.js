import { header, main, aside, infoSection } from '../index';
import getCurrentWeatherData, {
  getLocationData,
  getForecastData,
  getMainWeatherData,
  getOtherWeathersData,
  getAdditionalData,
  getCurrentState,
  setCurrentState
} from './data';

/**
 * Get user-inputted location, then render and update the page with the weather 
 * information of said location, then finally update currentState
 * @param { Event } e 
 */
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

  setCurrentState({ location });
}

/**
 * Get user-inputted measurement system, then update the page accordingly
 * @param { Event } e 
 */
export async function handleButton(e) {
  const measurementSystem = e.target.textContent;
  setCurrentState({ measurementSystem });

  if (document.querySelector('.temp').textContent === '') return;

  const { location } = getCurrentState();
  const mainWeatherData = await getMainWeatherData(location);
  const otherWeathersData = await getOtherWeathersData(location);
  const additionalData = await getAdditionalData(location);

  main.updateWeatherData(...mainWeatherData);
  aside.updateOtherWeathersData(otherWeathersData);
  infoSection.updateInfo(additionalData);
}