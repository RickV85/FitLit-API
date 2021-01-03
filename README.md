# whats-cookin-api

This repo was created to be used with the wc-refactor-tractor project.

## Set Up

Clone this down, and `cd` into it.  Then run:

`npm install`

`npm start`

## Endpoints

| Description | URL | Method | Required Properties for Request | Sample Successful Response |
|----------|-----|--------|---------------------|-----------------|
| Get all users |`http://localhost:3001/api/v1/users`| GET  | none | An array containing all users |
|Get all ingredients |`http://localhost:3001/api/v1/ingredients` | GET  | An array containing all ingredients |
|Get all recipes | `http://localhost:3001/api/v1/recipes` | GET | none | An array containing all recipes |
| Add/Remove Ingredients from a pantry |`http://localhost:3001/api/v1/users`| POST | `{ userID: <number>, ingredientID: <number>, ingredientModification: <number> }` | `{message: '"User # <userID> has 7 units of item # <ingredientID>"' }`|

