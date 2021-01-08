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
    this.popupElement.classList.add('popup_is-opened');
    document.addEventListener("keydown", this._escKey);
  }

  close() {
    this.popupElement.classList.remove('popup_is-opened');
    document.removeEventListener("keydown", this._escKey);
    this.clearForm();
  }

  setRegForm() {
    this.clearForm();
    if (!this.popupElement.querySelector('#name')) {
      const regForm = `
      <h4 class="popup__subtitle" id="name">Имя</h4>
      <input type="text" name="name" id="name" class="popup__input popup__input_type_name" placeholder="Введите имя" required>
      <p class="error-msg" id="error-name"></p>`;
      this.form.insertAdjacentHTML('afterbegin', regForm);
    }
    this.popupElement.querySelector('.popup__title').textContent = "Регистрация";
    this.popupElement.querySelector('.popup__button').textContent = "Зарегистрироваться";
    this.popupElement.querySelector('.popup__other-btn').textContent = "Войти";
  }

  setEnterForm() {
    this.clearForm();
    if (this.popupElement.querySelector('#name')) {
      this.popupElement.querySelectorAll('#name').forEach((el) => el.remove());
      this.popupElement.querySelectorAll('#error-name').forEach((el) => el.remove());
    }
    this.popupElement.querySelector('.popup__title').textContent = "Вход";
    this.popupElement.querySelector('.popup__button').textContent = "Войти";
    this.popupElement.querySelector('.popup__other-btn').textContent = "Зарегистрироваться";
  }

  _escKey(event) {
    if (event.key === "Escape") this.close();
  }

  clearForm() {
    this.form.reset();
    const inputs = Array.from(this.form.elements);
    inputs.forEach((elem) => {
      if (!elem.classList.contains('popup__button')) {
        document.querySelector(`#error-${elem.id}`).textContent = " ";
      }
    });
    document.querySelector(`#error-server`).textContent = " ";
  }
}