import icons from 'url:../../img/icons.svg';

class SearchView {
  _parentElement = document.querySelector('.search');

  // get search query
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearSearch();
    return query;
  }

  // private method to clear search field
  _clearSearch() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  // add event handler as subscriber
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      //prevent reload
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
