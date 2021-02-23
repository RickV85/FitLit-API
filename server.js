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
  res.status(200).json(app.locals.sleep);
});


app.post('/api/v1/sleep', (req, res) => {
  const requiredParams = ['userID', 'date', 'hoursSlept', 'sleepQuality'];
  const newSleepEntry = req.body;
  checkUserExists(newSleepEntry.userID, res);
  checkHasAllParams(requiredParams, newSleepEntry, res);

  app.locals.sleep.sleepData.push(newSleepEntry);
  res.status(201).json(newSleepEntry);
});

app.post('/api/v1/hydration', (req, res) => {
  const requiredParams = ['userID', 'date', 'numOunces'];
  const newHydrationEntry = req.body;
  checkUserExists(newHydrationEntry.userID, res);
  checkHasAllParams(requiredParams, newHydrationEntry, res);

  app.locals.hydration.hydrationData.push(newHydrationEntry);
  res.status(201).json(newHydrationEntry);
});

app.post('/api/v1/activity', (req, res) => {
  const requiredParams = ['userID', 'date', 'flightsOfStairs', 'minutesActive', 'numSteps'];
  const newActivityEntry = req.body;
  checkUserExists(newActivityEntry.userID, res);
  checkHasAllParams(requiredParams, newActivityEntry, res);

  app.locals.activity.activityData.push(newActivityEntry);
  res.status(201).json(newActivityEntry);
});

function checkUserExists(userID, response) {
  const user = users.userData.find(user => user.id === userID)
  if (!user) {
    return response.status(422).json({
      message: `No user found with ID of ${userID}`
    });
  } 
}

function checkHasAllParams(requiredParams, newData, response) {
  for (let i = 0; i < requiredParams.length; i++) {
    if (newData[requiredParams[i]] === undefined) {
      return response.status(422).json({
        message: `You are missing a required parameter of ${requiredParams[i]}`
      });
    }
  }
}

app.listen(port, () => {
  console.log(`${app.locals.title} is now running on http://localhost:${port} !`)
});