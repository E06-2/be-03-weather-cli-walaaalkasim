import axios from "axios";

export async function getWeather(openWeatherMapKey, city) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapKey}&units=metric`
    );

    return {
      temperature: `${response.data.main.temp}°C`,
      conditions: response.data.weather[0].description,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getWeatherForecast(
  openWeatherMapKey,
  city,
  units = "metric"
) {
  try {
    const cityDetails = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapKey}`
    );

    const parsedUnits = units === "metric" ? "metric" : "imperial";

    const { lat, lon } = cityDetails.data.coord;
    const response = await axios.get(`
https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${openWeatherMapKey}&units=${parsedUnits}`);

    return { daily: response.data.daily, units: parsedUnits };
  } catch (error) {
    console.log(error);
  }
}
