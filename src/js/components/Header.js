export default class Header {
  constructor () {
    this.headerButton = document.querySelector('.header__btn-text');
    this.logoutIcon = document.querySelector('.header__btn-logout');
  }

  getLoggedInHeader() {
    const headerLinks = document.querySelector('.header__links');
    console.log("logged in")
    const savedArticlesLink = `
    <a class="header__link" id="saved-articles" href="./news.html">Сохраненные статьи</a>`
    headerLinks.insertAdjacentHTML('beforeend', savedArticlesLink);
    this.logoutIcon.style.display = "block";
    this.headerButton.textContent = localStorage.getItem("username");
  }

  getLoggedOutHeader() {
    const savedArticlesLink = document.querySelector("#saved-articles");
    this.headerButton.textContent = "Авторизоваться";
    this.logoutIcon.style.display = "none";
    savedArticlesLink.remove();
    localStorage.clear();
  }
}