import "./pages/index.css";
import MainApi from "./js/api/MainApi";
import Popup from "./js/components/Popup";
import Form from "./js/components/Form";
import Header from "./js/components/Header";

const apiKey = 'd905610b9adf4166ae3f388ef3ea907a';

const popup = document.querySelector(".popup");
const popupSuccess = document.querySelector(".popup_success");
const popupForm = document.querySelector('.popup__form');
const formBtn = document.querySelector('.popup__button');
const headerBtn = document.querySelector('.header__button');
const popupBtn = document.querySelector('.popup__other-btn');

const getHeader = new Header();
const setPopup = new Popup(popup);
const successPopup = new Popup(popupSuccess);
//api
const apiMain = new MainApi();
// валидация
const authForm = new Form(popupForm, apiMain, setPopup, successPopup);

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
  if (event.target.textContent === "Авторизоваться" || "Грета") {
    setPopup.setEnterForm();
    setPopup.open();
  }
}

function getData(event) {
  event.preventDefault();
  authForm._getInfo();
}

formBtn.addEventListener('click', getData);
headerBtn.addEventListener('click', openPopup);
popupBtn.addEventListener('click', changePopup);