import "./pages/index.css";
import MainApi from "./js/api/MainApi";
import Popup from "./js/components/Popup";
import Form from "./js/components/Form";

const apiKey = 'd905610b9adf4166ae3f388ef3ea907a';

const popup = document.querySelector(".popup");
//api
const api = new MainApi();
// валидация
const validateForm = new Form(document.querySelector('.popup__form'));

const setPopup = new Popup(popup);

function changePopup(event) {
  if (event.target.textContent === "Войти") {
    setPopup.setEnterForm();
    setPopup.open();
  } else if (event.target.textContent === "Зарегистрироваться") {
    setPopup.setRegForm();
    setPopup.open();
  }
}

function openPopup(event) {
  if (event.target.textContent === "Авторизоваться") {
    setPopup.setEnterForm();
    setPopup.open();
  }
}

document.querySelector('.header__button').addEventListener('click', openPopup);

document.querySelector('.popup__other-btn').addEventListener('click', changePopup);