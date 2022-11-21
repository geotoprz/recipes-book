import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Get All Recipes / Create Recipe
const getAllUrl = 'https://forkify-api.herokuapp.com/api/v2/recipes';

// Get Recipe / Delete Recipe
const modifySingleUrl = 'https://forkify-api.herokuapp.com/api/v2/recipes/:id';

const key = 'a8c8b207-0bd6-44b5-93f1-ac814aa7b396';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) LOADING RECIPE
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2) RENDERING RECIPE
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

controlRecipes();

['haschange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
