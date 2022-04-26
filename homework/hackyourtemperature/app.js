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
  // getting city name from the request
  const cityName = req.body.cityName;
  // fetching weather information
  const weatherInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}`)
  .then(res => res.json())
  .catch(err => {
    console.error(err)
    });
    // checking if response has the right property if not it return city not found
    if (!weatherInfo.name) {
       return res.status(404).json({
          weatherText: "City is not found!"
        });
    }
    // creating response object and sending it back with correct status
    const weatherRes = {cityName: `${weatherInfo.name}`, temp:`${weatherInfo.main.temp}`};
    res.status(200).json(weatherRes);
  
});

export default app