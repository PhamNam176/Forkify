// In architecture, model is where business logics are implemented
// model consists business logic, state, http library

import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

// export state
export const state = {
  recipe: {},
  search: {
    key: '',
    results: [],
    curPage: 1,
    resPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

// load API
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    // reformat the result
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // update bookmark status of recipe based on state.bookmark
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// load search result

export const loadSearchResults = async function (key) {
  try {
    const data = await getJSON(`${API_URL}?search= ${key}`);
    state.search.key = key;
    state.search.page = 1;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// function to get search results for current page
export const getPageResults = function (page) {
  const begin = (page - 1) * state.search.resPerPage;
  const end = page * state.search.resPerPage;
  state.search.curPage = page;

  return state.search.results.slice(begin, end);
};

// function to store bookmarks in localstorage
export const storeBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// function to add bookmark
export const addBookmark = function (recipe) {
  // push recipe in the bookmarks list
  state.bookmarks.push(recipe);

  // new properties bookmarked of object recipe
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  storeBookmarks();
};

// function to delete bookmark, common pattern with input as id
export const delBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  // mark current recipe not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  storeBookmarks();
};

// load data from storage
export const init = function () {
  // load saved bookmarks from local storage
  const storedBookmarks = localStorage.getItem('bookmarks');
  if (storedBookmarks) state.bookmarks = JSON.parse(storedBookmarks);
};

init();
console.log(state.bookmarks);
