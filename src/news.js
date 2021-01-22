import "./pages/news.css";
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";
import NewsCard from "./js/components/NewsCard";
import NewsCardList from "./js/components/NewsCardList";

const headerBtn = document.querySelector('.header__button');

//api
const apiMain = new MainApi();
const news = new NewsApi();
//классы
const cardClass = new NewsCard();
const newsList = new NewsCardList(news, apiMain, cardsContainer, cardClass);

newsList.renderSavedPage();

headerBtn.textContent = localStorage.getItem("username");

function clearStorage() {
  localStorage.clear();
  window.location.href = "index.html";
}

headerBtn.addEventListener("click", clearStorage);