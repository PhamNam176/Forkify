import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', e => {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = Number(btn.dataset.goto);
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const page = this._data.curPage;
    const countPage = Math.ceil(
      this._data.results.length / this._data.resPerPage
    );
    let htmlMarkup;

    // if we have only one page then we have no pagination button
    if (countPage === 1) return this._generateBtn(false, false);

    // first page and there are more than 1 page
    if (page === 1 && countPage > 1) return this._generateBtn(false, true);

    // last page and there are more than 1 page
    if (page === countPage) return this._generateBtn(true, false);

    // in the middle
    if (page !== 1 && page !== countPage) {
      return this._generateBtn(true, true);
    }
  }

  // method to render button

  _generateBtn(back, next) {
    const page = this._data.curPage;
    let backBtn;
    let nextBtn;

    if (back) {
      backBtn = `
      <button data-goto ="${
        page - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page - 1}</span>
      </button>  
    `;
    }

    if (next) {
      nextBtn = `
      <button data-goto ="${
        page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
    }
    return [backBtn, nextBtn].join('');
  }
}

export default new PaginationView();
