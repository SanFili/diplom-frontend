import "./pages/news.css";
import MainApi from "./js/api/MainApi";
import NewsCard from "./js/components/NewsCard";
import SavedCards from "./js/components/SavedCards";

const headerBtn = document.querySelector('.header__button');

headerBtn.textContent = localStorage.getItem("username");

//api
const apiMain = new MainApi();

//классы
const cardClass = new NewsCard(apiMain, "newsPage");
const savedList = new SavedCards(apiMain, cardClass);

savedList.renderSavedCards();

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

headerBtn.addEventListener("click", logout);