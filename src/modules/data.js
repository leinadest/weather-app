import decrementDate from './utils';

const baseURL = "https://api.weatherapi.com/v1";
const APIKey = "25111dbd26004b48957195332232912";

let measurementSystem = 'Metric';

// API FETCH FUNCTIONS

/**
 * @param { string } location 
 * @returns the location data of a specified location
 */
export async function getLocationData(location) {
  const url = `${baseURL}/current.json?key=${APIKey}&q=${location}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.location;
}

/** 
 * @param { string } location 
 * @returns the current weather data of a specified location
 */
export default async function getCurrentWeatherData(location) {
  const url = `${baseURL}/current.json?key=${APIKey}&q=${location}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.current;
}

/**
 * @param { string } location 
 * @param { int } days 
 * @returns the forecast data of a specified location by a specified number 
 * of days ahead
 */
export async function getForecastData(location, days) {
  const url = `${baseURL}/forecast.json?key=${APIKey}&q=${location}&days=${days}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.forecast.forecastday;
}

/**
 * @param { string } location
 * @param { string } dt dt format: "YYYY-MM-DD"
 * @returns the weather data of a past date specified by dt
 */
export async function getHistoryData(location, dt) {
  const url = `${baseURL}/history.json?key=${APIKey}&q=${location}&dt=${dt}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.forecast.forecastday[0];
}

/**
 * @param { string } location 
 * @returns the local time of the specified location (format: YYYY-MM-DD HH:MM)
 */
export async function getLocalTime(location) {
  return (await getLocationData(location)).localtime;
}

// PROJECT FUNCTIONS

export function getMeasurementSystem() {
  return measurementSystem;
}

export function setMeasurementSystem(system) {
  measurementSystem = system;
}

/**
 * @param { string } location 
 * @returns the arguments necessary for the weather data on the main HTML
 * element
 */
export async function getMainWeatherData(locationInput) {
  
  const locationData = await getLocationData(locationInput);
  const currentWeatherData = await getCurrentWeatherData(locationInput);
  const todaysForecastData = (await getForecastData(locationInput, 1))["0"].day;

  let location = locationData.name ?? '';
  if (locationData.region && locationData.region !== location) {
      location += `, ${locationData.region}`;
  }

  location += `, ${locationData.country}`;

  const condition = currentWeatherData.condition.text;
  let temp;
  let maxTemp;
  let minTemp;

  if (measurementSystem === 'Metric') {
      temp = currentWeatherData.temp_c;
      maxTemp = todaysForecastData.maxtemp_c;
      minTemp = todaysForecastData.mintemp_c;
  } else {
      temp = currentWeatherData.temp_f;
      maxTemp = todaysForecastData.maxtemp_f;
      minTemp = todaysForecastData.mintemp_f;
  }

  return [location, temp, condition, maxTemp, minTemp, measurementSystem];
}

/**
 * @param { string } locationInput 
 */
export async function getOtherWeathersData(locationInput) {
  const forecastData = await getForecastData(locationInput, 3);
  const localDate = (await getLocalTime(locationInput)).slice(0, 10);
  const historyData = [
    (await getHistoryData(locationInput, decrementDate(localDate, 1))).day,
    (await getHistoryData(locationInput, decrementDate(localDate, 2))).day,
    (await getHistoryData(locationInput, decrementDate(localDate, 3))).day
  ];
  
  let notations = ['f', '°F'];
  if (measurementSystem === 'Metric') notations = ['c', '°C'];

  const otherWeathers = {};

  for (let daysAgo = 3; daysAgo > 0; daysAgo -= 1) {
    const avgTemp = historyData[daysAgo-1][`avgtemp_${notations[0]}`];
    const condition = historyData[daysAgo-1].condition.text;

    otherWeathers[`${daysAgo} Day(s) Ago`] = [
      `${avgTemp}${notations[1]}`,
      condition
    ];
  }

  for (let daysAhead = 1; daysAhead < 3; daysAhead += 1) {
    const avgTemp = forecastData[daysAhead].day[`avgtemp_${notations[0]}`];
    const condition = forecastData[daysAhead].day.condition.text;

    otherWeathers[`${daysAhead} Days Ahead`] = [
      `${avgTemp}°${notations[1]}`,
      condition
    ];

  }

  return otherWeathers;
}