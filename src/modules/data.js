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
export async function getHistory(location, dt) {
  const url = `${baseURL}/history.json?key=${APIKey}&q=${location}&dt=${dt}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.forecast.forecastday[0];
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