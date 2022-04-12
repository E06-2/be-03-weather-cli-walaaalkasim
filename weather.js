require("dotenv").config();

const axios = require("axios");
var colors = require("colors");
const API_KEY = process.env.API_KEY;

const [city, measurement = "c", forcast = "1"] = process.argv.slice(2);

const range = forcast === "5" ? "forecast" : "current";

const url = `http://api.weatherapi.com/v1/${range}.json?key=${API_KEY}&q=${city}&days=${forcast}`;

axios
  .get(url)
  .then(function (response) {
    const { location, current, forecast } = response.data;
    const { name, country } = location;
    const { temp_c, temp_f, condition } = current;

    measurement === "c" || "" ? (temp = temp_c + "°C") : (temp = temp_f + "°F");

    const currentWeather = () => {
      return console.log(
        "@@@@@@@@@@@@@@@@@@@\n@ WEATHER ** PROGRAM @\n@@@@@@@@@@@@@@@@@@@\n\n",
        "City Name :".yellow,
        name,
        "\n",
        "Country :".red,
        country,
        "\n",
        "Current Temp :".blue,
        temp,
        "\n",
        "Current Condition :".brightMagenta,
        condition.text,
        "\n",
        "it is now",
        temp,
        "in",
        name,
        ",",
        country
      );
    };

    const forecastWeather = () => {
      currentWeather();
      console.log("up to five days forecast".bgMagenta);

      measurement === "c" || ""
        ? forecast.forecastday.map((el) => {
            console.log(el.date, el.day.avgtemp_c, "°C", el.day.condition.text);
          })
        : forecast.forecastday.map((el) => {
            console.log(el.date, el.day.avgtemp_f, "°F", el.day.condition.text);
          });
    };

    forcast === "1" || "" ? currentWeather() : forecastWeather();
  })

  .catch(function (error) {
    console.log(error);
  });
