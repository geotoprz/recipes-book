import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime';

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
    // RENDERING ERROR
    recipeView.renderError(`${err} 💥💥💥💥`);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
