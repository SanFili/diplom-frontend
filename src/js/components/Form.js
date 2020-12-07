export default class Form {
  constructor(popupForm) {
    this.popupForm = popupForm;
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
      console.log('active')
      popupButton.classList.add('popup__button_active');
    } else {
      popupButton.classList.remove('popup__button_active');
    }
  }

  setEventListeners() {
    const errorMsg = {
      emptyInput: "Это обязательное поле",
      emailError: "Неверный формат e-mail",
      serverError: "Такой пользователь уже зарегестрирован"
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
      console.log(formIsValid)
      this.setSubmitButtonState(formIsValid);
    })
  }

  setServerError() {
    document.querySelector('#error-server').textContent = "Такой пользователь уже зарегестрирован"
  }
};