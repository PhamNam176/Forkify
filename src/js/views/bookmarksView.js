import icons from 'url:../../img/icons.svg';
import View from './View.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = "You don't have any bookmark!";
  _successMessage = '';

  // add handler
  addHandlerShowBookmark(handler) {
    const btn = document.querySelector('.nav__btn--bookmarks');
    btn.addEventListener('mouseover', e => {
      e.preventDefault();
      handler();
    });
  }

  // private method to generate html template for search results
  _generateMarkup() {
    return this._data.map(this._generatePreview).join('');
  }

  _generatePreview(recipe) {
    return `
    <li class="preview">
      <a class="preview__link preview__link--active" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src="${recipe.image}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;
  }
}

export default new BookmarksView();
