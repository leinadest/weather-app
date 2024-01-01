import { Main, Aside, InfoSection } from './ui';
import {
  getMainWeatherData,
  getOtherWeathersData,
  getAdditionalData,
  getCurrentState,
  setCurrentState,
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

  if (!document.querySelector('aside')) {
    Aside.createAside();
  }

  if (!document.querySelector('.additional-info')) {
    InfoSection.createInfoSection();
  }

  Main.updateWeatherData(...mainWeatherData);
  Aside.updateOtherWeathersData(otherWeathersData);
  InfoSection.updateInfo(additionalData);

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

  Main.updateWeatherData(...mainWeatherData);
  Aside.updateOtherWeathersData(otherWeathersData);
  InfoSection.updateInfo(additionalData);
}
