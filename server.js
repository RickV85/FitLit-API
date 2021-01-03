const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3001;
const app = express();
const users = require('./data/users');
const recipes = require('./data/recipes');
const ingredients = require('./data/ingredients');

app.locals = {
  title: 'What\'s Cookin API',
  users,
  recipes,
  ingredients
}

app.use(cors());
app.use(express.json());

app.get('/api/v1/users', (req, res) => {
  res.status(200).json(app.locals.users);
});

app.get('/api/v1/recipes', (req, res) => {
  res.status(200).json(app.locals.recipes);
});

app.get('/api/v1/ingredients', (req, res) => {
  res.status(200).json(app.locals.ingredients);
});

app.post('/api/v1/users', (req, res) => {
  const { userID, ingredientID, ingredientModification } = req.body;

  for (let requiredParameter of ['userID', 'ingredientID', 'ingredientModification']) {
    if (req.body[requiredParameter] === undefined) {
      return res.status(422).json({
        message: `You are missing a required parameter of ${requiredParameter}`
      });
    }
  }

  const foundUser = users.find(user => user.id === userID);

  if (!foundUser) {
    return res.status(422).json({
      message: `No user found with ID ${userID}`
    })
  }

  let pantryToModify = foundUser.pantry.find(pantryItem => pantryItem.ingredient === ingredientID);

  if (!pantryToModify && ingredientModification > 0) {
    foundUser.pantry.push({ ingredient: ingredientID, amount: ingredientModification });
    return res.status(201).json({ 
      message: `${ingredientModification} units of item # ${ingredientID} were added to user ${userID}'s pantry`
    });
  } 

  if ((pantryToModify && ingredientModification < 0) && (pantryToModify.amount + ingredientModification < 0)) {
    return res.status(422).json({ message: `The user doesn't have enough of this item.`});
  }

  pantryToModify.amount += ingredientModification;
  return res.status(201).json({
    message: `User # ${userID} has ${pantryToModify.amount} units of item # ${pantryToModify.ingredient}`
  });
});

app.listen(port, () => {
  console.log(`${app.locals.title} is now running on http://localhost:${port} !`)
});