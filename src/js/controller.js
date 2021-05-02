import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarksView.js';

// pollyfying ES6 except async await
import 'core-js/stable';
//pollyfying async await
import 'regenerator-runtime/runtime';
import resultsView from './views/resultsView.js';

const recipeContainer = document.querySelector('.recipe');
const searchForm = document.querySelector('.search');

// parcel
if (module.hot) {
  module.hot.accept();
}

// get data from forkify API with async await
const controlRecipe = async function () {
  try {
    // get hash of url
    const id = window.location.hash.slice(1);
    if (!id) return; // if no id then do not show anything
    recipeView.renderSpinner();
    // 1) Loading recipes
    await model.loadRecipe(id);

    // 2) Rendering recipes
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// get and render search results
const controlSearch = async function () {
  try {
    const key = searchView.getQuery();
    if (!key) return;
    await model.loadSearchResults(key);

    // render results view
    controlPage();
  } catch (err) {
    console.log(err);
  }
};

// controller for pagination
const controlPagination = function (gotoPage) {
  controlPage(gotoPage);
};

// controller for add and remove bookmark
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.delBookmark(model.state.recipe.id);
  }
  recipeView.render(model.state.recipe);
};

// controller for showing bookmarks
const controlShowBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

// render a page of result
const controlPage = function (page = model.state.search.page) {
  resultsView.render(model.getPageResults(page));
  paginationView.render(model.state.search);
};

// init function
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(controlPagination);
  bookmarkView.addHandlerShowBookmark(controlShowBookmarks);
};

init();
