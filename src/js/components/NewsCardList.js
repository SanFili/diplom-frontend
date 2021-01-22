export default class NewsCardList {
  constructor(newsApi, mainApi, container) {
    super();
    this.newsApi = newsApi;
    this.mainApi = mainApi;
    this.container = container;
    this.errorRes = document.querySelector('.results__not-found');
    this.searchInput = document.querySelector('.search__input');
  }

  addCard(cardData, keyword) {
    this.container.appendChild(this.newsListClass.createCard(cardData, keyword));
  }

  clearList() {
    if (this.container.children.length !== 0) {
      document.querySelectorAll(".card").forEach((el) => el.remove());
      document.querySelector('.results__show-more').style.display = "none";
    }
  }

  renderResults() {
    this.clearList();
    this.renderLoader();
    if (this.errorRes.style.display = "block") {
      this.errorRes.style.display = "none";
    }
    document.querySelector('.results__content').style.display = "block";
    this.newsApi.getNews(this.searchInput.value, formatDate(today), formatDate(weekBefore))
      .then((cards) => {
        for (let i = 0; i < 3; i++) {
          this.addCard(cards[i], this.searchInput.value);
        }
        if (cards.length > 3) {
          document.querySelector('.results__show-more').style.display = "block";
        }
      })
      .catch(err => this.renderError());
  }

  renderLoader() {
    const preloader = document.querySelector('.results__loading');
    preloader.style.display = "block";
    setTimeout(function() {
      preloader.style.display = "none";
    }, 3000)
  }

  renderError() {
    this.renderLoader();
    this.errorRes.style.display = "block";
  }

  showMore() {
    let j = this.container.children.length;
    const count = j + 3;
    this.newsApi.getNews(this.searchInput.value, formatDate(today), formatDate(weekBefore))
      .then((cards) => {
        for (j; j < count; j++) {
          this.addCard(cards[j], this.searchInput.value);
        }
        if (cards.length > count) {
          document.querySelector('.results__show-more').style.display = "block";
        }
      })
      .catch(err => this.renderError());
  }
}