import express from 'express';
const app = express();
import {keys} from "./sources/keys.js";
import fetch from "node-fetch"
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('Hello from backend to front end');
});

app.post('/weather', async (req, res) => {
  try {
    const cityName = req.body.cityName;
    const weatherFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}`)
    const weatherInfo = await weatherFetch.json();
    const weatherRes = {cityName: `${weatherInfo.name}`, temp:`${weatherInfo.main.temp}`};
    res.status(200).json(weatherRes);
  } catch (err) {
    res.status(404).json({ weatherText: "City is not found!" });
  }

});

export default app