import "./pages/index.css";
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";
import Popup from "./js/components/Popup";
import Form from "./js/components/Form";
import Header from "./js/components/Header";
import NewsCard from "./js/components/NewsCard";
import NewsCardList from "./js/components/NewsCardList";

const popup = document.querySelector(".popup");
const popupSuccess = document.querySelector(".popup_success");
const popupForm = document.querySelector('.popup__form');
const formBtn = document.querySelector('.popup__button');
const headerBtn = document.querySelector('.header__button');
const popupBtn = document.querySelector('.popup__other-btn');
const searchBtn = document.querySelector('.search__btn');
const showMoreBtn = document.querySelector('.results__show-more');

//api
const apiMain = new MainApi();
const apiNews = new NewsApi();

const getHeader = new Header();
const setPopup = new Popup(popup);
const successPopup = new Popup(popupSuccess);
const cardClass = new NewsCard();
const newsList = new NewsCardList(apiNews, cardClass);
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
searchBtn.addEventListener('click', newsList.renderResults);
showMoreBtn.addEventListener('click', newsList.showMore);