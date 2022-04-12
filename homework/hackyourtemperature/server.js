import express from 'express';
const app = express();
const port = 3000;
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello from backend to front end');
});

app.post('/Weather', (req, res) => {
  const cityName = req.body.cityName;
  if (!cityName) {
    return res.status(400).json({ msg: 'no city name was provided.' });
  }
  return res.json(cityName);
});

app.listen(port, () => {
  console.log(`Weather app listening on port ${port}`);
});
