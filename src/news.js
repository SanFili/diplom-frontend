import "./pages/news.css";
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";
import NewsCard from "./js/components/NewsCard";
import SavedCards from "./js/components/SavedCards";

const headerBtn = document.querySelector('.header__button');
console.log(localStorage.getItem("username"))

headerBtn.textContent = localStorage.getItem("username");

//api
const apiMain = new MainApi();
const news = new NewsApi();
//классы
const cardClass = new NewsCard();
const savedList = new SavedCards(apiMain, cardClass);

savedList.renderSavedCards();

function clearStorage() {
  localStorage.clear();
  window.location.href = "index.html";
}

headerBtn.addEventListener("click", clearStorage);