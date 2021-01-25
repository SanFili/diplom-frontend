import Header from "./Header";

export default class Form extends Header {
  constructor(popupForm, api, setPopup, successPopup) {
    super();
    this.popupForm = popupForm;
    this.api = api;
    this.setPopup = setPopup;
    this.successPopup = successPopup;
    this.serverError = this.popupForm.querySelector(".error-msg_server");
    this.btn = this.popupForm.querySelector(".popup__button");
    this.getInfo = this.getInfo.bind(this);
    this.setEventListeners();
  }

  checkInputValidity(elem, msg) {
    if (!elem.classList.contains('popup__button')) {
      const errorElement = document.querySelector(`#error-${elem.id}`);
      if (elem.value === "") {
        errorElement.textContent = msg.emptyInput;
        return false;
      } else if (elem.classList.contains('popup__input_type_email')) {
          if (elem.validity.patternMismatch) {
            errorElement.textContent = msg.emailError;
            return false;
        }
      }
        errorElement.textContent = " ";
        return true;
    }
  }

  setSubmitButtonState(formIsValid) {
    const popupButton = this.popupForm.querySelector('.popup__button');
    if (formIsValid) {
      if (this.btn.hasAttribute("disabled")) {
        this.btn.removeAttribute("disabled");
      }
      popupButton.classList.add('popup__button_active');
    } else {
      if (!this.btn.hasAttribute("disabled")) {
        this.btn.setAttribute("disabled")
      };
      popupButton.classList.remove('popup__button_active');
    }
  }

  setEventListeners() {
    const errorMsg = {
      emptyInput: "Это обязательное поле",
      emailError: "Неверный формат e-mail",
    };
    this.popupForm.addEventListener('input', () => {
      const inputs = Array.from(this.popupForm.elements);
      let formIsValid = true;
      inputs.forEach((element) => {
        if (!element.classList.contains('popup__button')) {
          if (!this.checkInputValidity(element, errorMsg)) {
            formIsValid = false;
          }
        }
      });
      this.setSubmitButtonState(formIsValid);
    })
  }

  getInfo() {
    const inputs = this.popupForm.querySelectorAll(".popup__input");
    const userData = {};
    let i = 0;
    while (inputs[i]) {
      userData[inputs[i].name] = inputs[i].value;
      i++;
    }
    this.authorization(userData);
  }

  authorization(userData) {
    if (userData.name) {
      this.api.signup(userData)
      .then((res) => {
        if (res.status === 200) {
          this.setPopup.close();
          this.successPopup.open();
          serverError.textContent = " ";
          // this.getLoggedInHeader();
          // console.log('success reg')
        } else if (answer.status === 409) {
          this.serverError.textContent = "Такой пользователь уже зарегистрирован";
        } else if (answer.status === 500) {
          this.serverError.textContent = "Ошибка на сервере";
        }
      })
      .catch(err => this.serverError.textContent = err);
    } else if (!userData.name) {
      this.api.signin(userData)
      .then((res) => {
        if (res.status === 200) {
          this.api.getUserData()
            .then((res) => {
              localStorage.setItem("username", res.data.name);
              this.setPopup.close();
              serverError.textContent = " ";
              this.getLoggedInHeader();
              document.querySelector('.card__alert').textContent = " ";
              // console.log('success auth')
            })
            .catch(err => this.serverError.textContent = err);
        } else if (answer.status === 401) {
          this.serverError.textContent = "Введен неверный email или пароль";
        } else if (answer.status === 500) {
          this.serverError.textContent = "Ошибка на сервере";
        }
      })
      .catch(err => this.serverError.textContent = err);
    }
  }
};