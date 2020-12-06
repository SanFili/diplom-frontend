export default class Popup {
  constructor(popupElement) {
    this.popupElement = popupElement;
    this.form = this.popupElement.querySelector('.popup__form');
    this.button = this.popupElement.querySelector('.popup__button');
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setEnterForm = this.setEnterForm.bind(this);
    this.setRegForm = this.setRegForm.bind(this);
    this._escKey = this._escKey.bind(this);
    this.popupElement.querySelector('.popup__close').addEventListener('click', this.close);
  }

  open() {
    console.log(this.popupElement)
    this.popupElement.classList.add('popup_is-opened');
    document.addEventListener("keydown", this._escKey);
  }

  close() {
    this.popupElement.classList.remove('popup_is-opened');
    document.removeEventListener("keydown", this._escKey);
  }

  setRegForm() {
    this.form.reset();
    if (!this.popupElement.querySelector('#name')) {
      const regForm = `
      <h4 class="popup__subtitle" id="name">Имя</h4>
      <input type="text" name="name" id="name" class="popup__input popup__input_type_name" placeholder="Введите имя" required>
      <p class="error-msg" id="error-name"></p>
      <p class="error-msg error-msg_server" id="error-server"></p>`;
      this.button.insertAdjacentHTML('beforeBegin', regForm);
    }
    this.popupElement.querySelector('.popup__title').textContent = "Регистрация";
    this.popupElement.querySelector('.popup__button').textContent = "Зарегистрироваться";
    this.popupElement.querySelector('.popup__other-btn').textContent = "Войти";
  }

  setEnterForm() {
    this.form.reset();
    if (this.popupElement.querySelector('#name')) {
      this.popupElement.querySelectorAll('#name').forEach((el) => el.remove());
      this.popupElement.querySelectorAll('#error-name').forEach((el) => el.remove());
      this.popupElement.querySelectorAll('#error-server').forEach((el) => el.remove());
    }
    this.popupElement.querySelector('.popup__title').textContent = "Вход";
    this.popupElement.querySelector('.popup__button').textContent = "Войти";
    this.popupElement.querySelector('.popup__other-btn').textContent = "Зарегистрироваться";
  }

  setEventListeners(openButton) {
    openButton.addEventListener('click', this.open);
  }

  _escKey(event) {
    if (event.key === "Escape") this.close();
  }
}