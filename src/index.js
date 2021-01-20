import "./pages/index.css";
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";
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
const news = new NewsApi();
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

function logInOut(event) {
  if (event.target.textContent === "Авторизоваться") {
    setPopup.setEnterForm();
    setPopup.open();
  } else if (event.target.textContent === localStorage.getItem("username")) {
    getHeader.getLoggedOutHeader();
  }
}

function getData(event) {
  event.preventDefault();
  authForm._getInfo();
}

formBtn.addEventListener('click', getData);
headerBtn.addEventListener('click', logInOut);
popupBtn.addEventListener('click', changePopup);