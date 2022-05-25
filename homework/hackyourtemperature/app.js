import express from "express";
const app = express();
import { keys } from "./sources/keys.js";
import fetch from "node-fetch";
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from backend to front end");
});

app.post("/weather", async (req, res) => {
  try {
    const cityName = req.body.cityName;
    if (!cityName) {
      return res.status(400).json({ msg: 'no city name was provided.' });
    const weatherFetch = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}&units=metric`
    );
    const weatherInfo = await weatherFetch.json();
    const weatherRes = {
      weatherText: `${weatherInfo.name} current temprature is${weatherInfo.main.temp} degrees`,
    };
    res.status(200).json(weatherRes);
  } catch (err) {
    res.status(404).json({ weatherText: "City is not found!" });
  }
});

export default app;
