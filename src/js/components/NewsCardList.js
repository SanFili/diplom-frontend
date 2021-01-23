export default class NewsCardList {
  constructor(api, cardClass) {
    this.api = api;
    this.cardClass = cardClass;
    this.container = document.querySelector('.cards');
    this.resSection = document.querySelector('.results');
    this.errorRes = document.querySelector('.results__not-found');
    this.showMoreBtn = document.querySelector('.results__show-more');
    this.searchInput = document.querySelector('.search__input');
    this.clearList = this.clearList.bind(this);
    this.renderLoader = this.renderLoader.bind(this);
    console.log(this.container);
  }

  addCard(cardData, keyword) {
    this.container.appendChild(this.cardClass.createCard(cardData, keyword));
  }

  clearList() {
    if (this.container.children.length !== 0) {
      document.querySelectorAll(".card").forEach((el) => el.remove());
      this.showMoreBtn.style.display = "none";
    }
  }

  renderResults() {
    //this.clearList();
    //this.renderLoader();
    console.log(this.container)
    if (this.errorRes.style.display = "block") {
      this.errorRes.style.display = "none";
    }
    this.resSection.style.display = "block";
    document.querySelector('.results__content').style.display = "block";
    this.api.getNews(this.searchInput.value, formatDate(today), formatDate(weekBefore))
      .then((cards) => {
        for (let i = 0; i < 3; i++) {
          this.addCard(cards[i], this.searchInput.value);
        }
        if (cards.length > 3) {
          this.showMoreBtn.style.display = "block";
        }
      })
      .catch(err => this.renderError());
  }

  renderLoader() {
    const preloader = document.querySelector('.results__loading');
    preloader.style.display = "block";
    this.resSection.style.display = "block";
    setTimeout(function() {
      preloader.style.display = "none";
    }, 3000)
  }

  renderError() {
    this.renderLoader();
    this.errorRes.style.display = "block";
    this.resSection.style.display = "block";
  }

  showMore() {
    let j = this.container.children.length;
    const count = j + 3;
    this.api.getNews(this.searchInput.value, formatDate(today), formatDate(weekBefore))
      .then((cards) => {
        for (j; j < count; j++) {
          this.addCard(cards[j], this.searchInput.value);
        }
        if (cards.length > count) {
          this.showMoreBtn.style.display = "block";
        }
      })
      .catch(err => this.renderError());
  }
}