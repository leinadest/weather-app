import changeDate from './utils';

const baseURL = 'https://api.weatherapi.com/v1';
const APIKey = '25111dbd26004b48957195332232912';

const currentState = {
  measurementSystem: 'Metric',
  location: '',
  mainWeatherData: null,
  otherWeathersData: null,
  additionalData: null,
};

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
export async function getForecastData(location, dt) {
  const url = `${baseURL}/forecast.json?key=${APIKey}&q=${location}&dt=${dt}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.forecast.forecastday[0];
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

/**
 * @param { string } location
 * @returns the arguments necessary for the weather data on the main HTML
 * element
 */
export async function getMainWeatherData(locationInput) {
  const localTime = getLocalTime(locationInput);
  const locationData = await getLocationData(locationInput);
  const currentWeatherData = await getCurrentWeatherData(locationInput);
  const forecastData = await getForecastData(locationInput, localTime);

  let location = locationData.name ?? '';
  if (locationData.region && locationData.region !== location) {
    location += `, ${locationData.region}`;
  }

  location += `, ${locationData.country}`;

  const condition = currentWeatherData.condition.text;
  let temp;
  let maxTemp;
  let minTemp;

  if (currentState.measurementSystem === 'Metric') {
    temp = `${currentWeatherData.temp_c}°C`;
    maxTemp = `${forecastData.day.maxtemp_c}°C`;
    minTemp = `${forecastData.day.mintemp_c}°C`;
  } else {
    temp = `${currentWeatherData.temp_f}°F`;
    maxTemp = `${forecastData.day.maxtemp_f}°F`;
    minTemp = `${forecastData.day.mintemp_f}°F`;
  }

  return [
    location,
    temp,
    condition,
    maxTemp,
    minTemp,
    currentState.measurementSystem,
  ];
}

/**
 * @param { string } location
 */
export async function getOtherWeathersData(location) {
  const localDate = (await getLocalTime(location)).slice(0, 10);
  const otherWeathersData = [
    (await getHistoryData(location, changeDate(localDate, -3))).day,
    (await getHistoryData(location, changeDate(localDate, -2))).day,
    (await getHistoryData(location, changeDate(localDate, -1))).day,
    (await getForecastData(location, changeDate(localDate, 1))).day,
    (await getForecastData(location, changeDate(localDate, 2))).day,
  ];

  let units = ['f', '°F'];
  if (currentState.measurementSystem === 'Metric') units = ['c', '°C'];

  const otherWeathers = [];

  otherWeathersData.forEach((data, i) => {
    const avgTemp = data[`avgtemp_${units[0]}`];
    const condition = data.condition.text;
    const daysAway = i - 3 >= 0 ? i - 2 : i - 3;

    const description =
      daysAway > 0 ? `${daysAway} Day(s) Ahead` : `${-daysAway} Day(s) Ago`;

    otherWeathers[i] = [description, `${avgTemp}${units[1]}`, condition];
  });

  return otherWeathers;
}

export async function getAdditionalData(location) {
  const currentWeatherData = await getCurrentWeatherData(location);

  const u =
    currentState.measurementSystem === 'Metric'
      ? ['c', '°C', 'kph', 'mb', 'mm']
      : ['f', '°F', 'mph', 'in', 'in'];

  return [
    ['It feels like: ', `${currentWeatherData[`feelslike_${u[0]}`]}${u[1]}`],
    [
      'Wind',
      [
        `Speed: ${currentWeatherData[`wind_${u[2]}`]} ${u[2]}`,
        `Gust: ${currentWeatherData[`gust_${u[2]}`]} ${u[2]}`,
        `Direction: ${currentWeatherData.wind_dir}`,
      ],
    ],
    ['Pressure', `${currentWeatherData[`pressure_${u[3]}`]} ${u[3]}`],
    ['Precipitation', `${currentWeatherData[`precip_${u[4]}`]} ${u[4]}`],
    ['Humidity', `${currentWeatherData.humidity}%`],
    ['Cloud Coverage', `${currentWeatherData.cloud}%`],
    ['UV Index', currentWeatherData.uv],
  ];
}

export function getCurrentState() {
  return currentState;
}

export function setCurrentState(state) {
  Object.entries(state).forEach((entry) => {
    const [key, value] = entry;
    currentState[key] = value;
  });
}
