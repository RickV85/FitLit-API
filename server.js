const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3001;
const app = express();
const users = require('./data/users');
const activity = require('./data/activity');
const hydration = require('./data/hydration');
const sleep = require('./data/sleep');

app.locals = {
  title: 'FitLit API',
  users,
  activity,
  hydration,
  sleep
}

app.use(cors());
app.use(express.json());

app.get('/api/v1/users', (req, res) => {
  res.status(200).json(app.locals.users);
});

app.get('/api/v1/activity', (req, res) => {
  res.status(200).json(app.locals.activity);
});

app.get('/api/v1/hydration', (req, res) => {
  res.status(200).json(app.locals.hydration);
});

app.get('/api/v1/sleep', (req, res) => {
  res.status(200).json(app.locals.hydration);
});


app.listen(port, () => {
  console.log(`${app.locals.title} is now running on http://localhost:${port} !`)
});