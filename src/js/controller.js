import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime';

if (module.hot) {
  module.hot.accept;
}

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

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) GET SEARCH QUERY
    const query = searchView.getQuery();
    if (!query) return;

    // 2) LOAD SEARCH RESULTS
    await model.loadSearchResults(query);

    // 3) RENDER RESULTS
    resultsView.render(model.state.search.results);
  } catch (err) {
    throw err;
  }
};
controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
