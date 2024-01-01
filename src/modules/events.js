import { Main, Aside, InfoSection } from './ui';
import {
  getMainWeatherData,
  getOtherWeathersData,
  getAdditionalData,
  getCurrentState,
  setCurrentState,
} from './data';
import { isValidLocation } from './utils';

/**
 * Reset the search form's validity if it's invalid, so that user can re-enter
 * invalid input
 * @param { Event } e
 */
export async function handleInput(e) {
  const input = e.target;
  if (!input.checkValidity()) input.setCustomValidity('');
}

/**
 * Get user-inputted location, then render and update the page with the weather
 * information of said location, then finally update currentState
 * @param { Event } e
 */
export async function handleForm(e) {
  e.preventDefault();

  const form = e.target;
  const input = form.querySelector('input');
  const locationInput = input.value;

  const locationIsValid = await isValidLocation(locationInput);
  if (!locationIsValid) {
    input.setCustomValidity('Cannot find location. Please try again.');
    form.reportValidity();
    return;
  }

  const mainWeatherData = await getMainWeatherData(locationInput);
  const otherWeathersData = await getOtherWeathersData(locationInput);
  const additionalData = await getAdditionalData(locationInput);

  if (!document.querySelector('aside')) {
    Aside.createAside();
  }

  if (!document.querySelector('.additional-info')) {
    InfoSection.createInfoSection();
  }

  Main.updateWeatherData(mainWeatherData);
  Aside.updateOtherWeathersData(otherWeathersData);
  InfoSection.updateInfo(additionalData);

  setCurrentState({ location: locationInput });
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

  Main.updateWeatherData(mainWeatherData);
  Aside.updateOtherWeathersData(otherWeathersData);
  InfoSection.updateInfo(additionalData);
}
