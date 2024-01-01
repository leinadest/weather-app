import fetchData, { changeDate } from './utils';

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
 * @returns the location data of a specified location upon resolution
 */
export async function getLocationData(location) {
  const url = `${baseURL}/current.json?key=${APIKey}&q=${location}`;
  const data = await fetchData(url);

  return data.location;
}

/**
 * @param { string } location
 * @returns the current weather data of a specified location upon resolution
 */
export async function getCurrentWeatherData(location) {
  const url = `${baseURL}/current.json?key=${APIKey}&q=${location}`;
  const data = await fetchData(url);
  return data.current;
}

/**
 * @param { string } location
 * @param { int } dt format: YYYY-MM-DD
 * @returns the forecast data of a specified location at a specified date upon
 * resolution
 */
export async function getForecastData(location, dt) {
  const url = `${baseURL}/forecast.json?key=${APIKey}&q=${location}&dt=${dt}`;
  const data = await fetchData(url);
  return data.forecast.forecastday[0];
}

/**
 * @param { string } location
 * @param { string } dt format: "YYYY-MM-DD"
 * @returns the weather data of a specified location at a past date specified
 * by dt upon resolution
 */
export async function getHistoryData(location, dt) {
  const url = `${baseURL}/history.json?key=${APIKey}&q=${location}&dt=${dt}`;
  const data = await fetchData(url);
  return data.forecast.forecastday[0];
}

/**
 * @param { string } location
 * @returns the local time of the specified location (format: YYYY-MM-DD HH:MM)
 * upon resolution
 */
export async function getLocalTime(location) {
  return (await getLocationData(location)).localtime;
}

// PROJECT FUNCTIONS

/**
 * @param { string } location
 * @returns the weather data used in main upon resolution
 */
export async function getMainWeatherData(locationInput) {
  const localTime = await getLocalTime(locationInput);
  const locationData = await getLocationData(locationInput);
  const currentWeatherData = await getCurrentWeatherData(locationInput);
  const forecastData = await getForecastData(locationInput, localTime);

  let location = locationData.name ?? '';
  location +=
    locationData.region !== location ? `, ${locationData.region}` : '';
  location += `, ${locationData.country}`;

  const units = currentState.measurementSystem === 'Metric' ? '°C' : '°F';

  const temp = `${currentWeatherData.temp_c}${units}`;
  const maxTemp = `${forecastData.day.maxtemp_c}${units}`;
  const minTemp = `${forecastData.day.mintemp_c}${units}`;
  const condition = currentWeatherData.condition.text;

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
 * @returns the weather data used in aside upon resolution
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

/**
 * @param { string } location
 * @returns the data used in the Additional Section upon resolution
 */
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

/**
 * @returns currentState
 */
export function getCurrentState() {
  return currentState;
}

/**
 * Set specified values of currentState by passing state as an object with the
 * specified property key-value pairs. For example, passing state =
 * { location: 'london' } will result in currentState.location = 'london'
 * @param { object } state
 */
export function setCurrentState(state) {
  Object.entries(state).forEach((entry) => {
    const [key, value] = entry;
    currentState[key] = value;
  });
}
