export interface EventDetails {
  name: string;
  datetime: string; // ISO string
  location: string;
  description?: string;
}

export interface WeatherInfo {
  temperatureMin: number | null;
  temperatureMax: number | null;
  precipitationProbability: number | null;
}

/**
 * Fetch weather forecast for a given location and date.
 * Uses Open-Meteo geocoding and forecast APIs.
 */
export async function getWeather(
  location: string,
  date: string
): Promise<WeatherInfo> {
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
  );
  if (!geoRes.ok) {
    throw new Error(`Geocoding failed: ${geoRes.status}`);
  }
  const geoData = await geoRes.json();
  if (!geoData.results || !geoData.results.length) {
    throw new Error(`Location not found: ${location}`);
  }
  const { latitude, longitude } = geoData.results[0];

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=UTC`
  );
  if (!weatherRes.ok) {
    throw new Error(`Weather fetch failed: ${weatherRes.status}`);
  }
  const weatherData = await weatherRes.json();
  const daily = weatherData.daily;
  return {
    temperatureMin: daily?.temperature_2m_min?.[0] ?? null,
    temperatureMax: daily?.temperature_2m_max?.[0] ?? null,
    precipitationProbability: daily?.precipitation_probability_max?.[0] ?? null,
  };
}

/**
 * Generate prompt text describing an event with weather info.
 */
export async function buildEventPrompt(event: EventDetails): Promise<string> {
  const dateOnly = event.datetime.split('T')[0];
  const weather = await getWeather(event.location, dateOnly);
  const weatherText =
    weather.temperatureMax !== null && weather.temperatureMin !== null
      ? `The forecast calls for a high of ${weather.temperatureMax}°C and a low of ${weather.temperatureMin}°C with a ${weather.precipitationProbability}% chance of precipitation.`
      : 'Weather information is unavailable.';
  return `Event: ${event.name}\nDate: ${event.datetime}\nLocation: ${event.location}\n${weatherText}\nDescription: ${event.description ?? ''}`;
}
