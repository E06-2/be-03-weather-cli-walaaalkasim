require("dotenv").config();
//console.log(process.env);
const axios = require("axios");
var colors = require("colors");
const API_KEY = process.env.API_KEY;
const city = process.argv.slice(2)[0]; ///name of the city
const measurement = process.argv.slice(2)[1]; ///measyrement C or F
const forecast = process.argv.slice(2)[2]; // forecast 1 or 5 days
let url = "";
let uri = "";
if (forecast === "1") {
  url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city} `;
} else if (forecast === "5") {
  uri = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5 `;
}
if (forecast === "1") {
  axios
    .get(url)
    .then(function (response) {
      // handle success
      if (measurement === "c" || "C") {
        console.log("@@@@@@@@@@@@@@@@@@@");
        console.log("@ WEATHER PROGRAM @");
        console.log("@@@@@@@@@@@@@@@@@@@");
        console.log("             ");
        console.log("City Name :".yellow, response.data.location.name);
        console.log("Country :".red, response.data.location.country);
        console.log("Current Temp :".blue, response.data.current.temp_c, "°C");
        console.log(
          "Current Condition :".brightMagenta,
          response.data.current.condition.text
        );

        console.log("                ");
        console.log(
          "it is now",
          response.data.current.temp_c,
          "°C",
          "in",
          response.data.location.name,
          ",",
          response.data.location.country
        );
      } else if (measurement === "f" || "F") {
        console.log("@@@@@@@@@@@@@@@@@@@");
        console.log("@ WEATHER PROGRAM @");
        console.log("@@@@@@@@@@@@@@@@@@@");
        console.log("             ");
        console.log("City Name :".yellow, response.data.location.name);
        console.log("Country :".red, response.data.location.country);
        console.log("Current Temp :".blue, response.data.current.temp_f, "°F");
        console.log(
          "Current Condition :".brightMagenta,
          response.data.current.condition.text
        );

        console.log("                ");
        console.log(
          "it is now",
          response.data.current.temp_f,
          "°F",
          "in",
          response.data.location.name,
          ",",
          response.data.location.country
        );
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
} else if (forecast === "5") {
  axios
    .get(uri)
    .then(function (response) {
      // handle success
      if (measurement === "c" || "C") {
        console.log("@@@@@@@@@@@@@@@@@@@");
        console.log("@ WEATHER FORECAST 5 DAYS @");
        console.log("@@@@@@@@@@@@@@@@@@@");
        console.log("             ");
        console.log("City Name :".yellow, response.data.location.name);
        console.log("Country :".red, response.data.location.country);
        console.log("Current Temp :".blue, response.data.current.temp_c, "°C");
        console.log(
          "Current Condition :".brightMagenta,
          response.data.current.condition.text
        );

        console.log("                ");
        console.log(
          "it is now",
          response.data.current.temp_c,
          "°C",
          "in",
          response.data.location.name,
          ",",
          response.data.location.country
        );
        console.log("up to five days forecast".bgMagenta);
        const fivedays = response.data.forecast.forecastday.map((el) => {
          console.log(el.date, el.day.avgtemp_c, "°C", el.day.condition.text);
        });
      } else if (measurement === "f" || "F") {
        console.log("@@@@@@@@@@@@@@@@@@@");
        console.log("@ WEATHER PROGRAM @");
        console.log("@@@@@@@@@@@@@@@@@@@");
        console.log("             ");
        console.log("City Name :".yellow, response.data.location.name);
        console.log("Country :".red, response.data.location.country);
        console.log("Current Temp :".blue, response.data.current.temp_f, "°F");
        console.log(
          "Current Condition :".brightMagenta,
          response.data.current.condition.text
        );

        console.log("                ");
        console.log(
          "it is now",
          response.data.current.temp_f,
          "°F",
          "in",
          response.data.location.name,
          ",",
          response.data.location.country
        );

        console.log("up to five days forecast".bgWhite);
        const fivedays = response.data.forecast.forecastday.map((el) => {
          console.log(el.date, el.day.avgtemp_c, "°C", el.day.condition.text);
        });
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
