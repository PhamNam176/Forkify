import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  // render recipe detail
  render(data) {
    // if there is no data or data is an empty array
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const htmlMarkup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', htmlMarkup);
  }

  // private method to clear element
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // public method to render a spinner for loading screen
  renderSpinner() {
    const htmlMarkup = `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', htmlMarkup);
  }

  // render error method
  renderError(message = this._errorMessage) {
    const htmlMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', htmlMarkup);
  }

  // render success
  renderSuccess(message = this._successMessage) {
    const htmlMarkup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    
      </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', htmlMarkup);
  }
}
