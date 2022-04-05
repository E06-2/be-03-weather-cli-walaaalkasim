/* IMPORTANT
  To test this solution;
  - create a .env file from the .env.example
  - add your OpenWeatherMap API key
 */

import { getWeatherForecast } from "./lib.js";
import dotenv from "dotenv";

const { parsed: config } = dotenv.config();
const [, , city, units] = process.argv;

if (!city) {
  console.log("No city provided!");
  process.exit();
}

getWeatherForecast(config.API_KEY, city, units).then((weather) => {
  console.log("@@@@@@@@@@@@@@@@@@@");
  console.log("@ WEATHER PROGRAM @");
  console.log("@@@@@@@@@@@@@@@@@@@\n");
  console.log(`For the city of ${city}:\n`);

  const units = weather.units === "metric" ? "°C" : "°F";

  weather.daily.forEach((day) => {
    const date = new Date(day.dt * 1000); // convert timestamp to ms

    console.log(`${date.toLocaleDateString()}`);
    console.log(
      `It will be ${day.temp.day}${units} and ${day.weather[0].description}\n`
    );
  });
});
