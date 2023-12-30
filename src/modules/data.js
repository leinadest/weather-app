const baseURL = "https://api.weatherapi.com/v1";
const APIKey = "25111dbd26004b48957195332232912";

export default async function getCurrentWeather(location) {
  const url = `${baseURL}/current.json?key=${APIKey}&q=${location}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.current);
}

export async function getForecast(location, days) {
  const url = `${baseURL}/forecast.json?key=${APIKey}&q=${location}&days=${days}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.forecast.forecastday);
}

/**
 * Return the weather data of a past date specified by dt
 * @param { string } location
 * @param { string } dt dt format: "YYYY-MM-DD"
 */
export async function getHistory(location, dt) {
  const url = `${baseURL}/history.json?key=${APIKey}&q=${location}&dt=${dt}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.forecast.forecastday[0]);
}