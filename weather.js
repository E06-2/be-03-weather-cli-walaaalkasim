/* IMPORTANT
  To test this solution;
  - create a .env file from the .env.example
  - add your OpenWeatherMap API key
 */

import { getWeather } from "./lib.js";
import dotenv from "dotenv";

const { parsed: config } = dotenv.config();
const [, , city] = process.argv;

if (!city) {
  console.log("No city provided!");
  process.exit();
}

getWeather(config.API_KEY, city).then((weather) => {
  console.log("@@@@@@@@@@@@@@@@@@@");
  console.log("@ WEATHER PROGRAM @");
  console.log("@@@@@@@@@@@@@@@@@@@\n");
  console.log(`It is now ${weather.temperature}°C in ${city}`);
  console.log(`The current weather conditions are: ${weather.conditions}`);
});
