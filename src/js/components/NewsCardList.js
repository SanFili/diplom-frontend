export default class NewsCardList {
  constructor(api, cardClass, page) {
    this.api = api;
    this.cardClass = cardClass;
    this.page = page;
    this.container = document.querySelector('.cards');
    this.resSection = document.querySelector('.results');
    this.errorRes = document.querySelector('.results__not-found');
    this.showMoreBtn = document.querySelector('.results__show-more');
    this.searchInput = document.querySelector('.search__input');
    this.preloader = document.querySelector('.results__loading');
    this.errText = document.querySelector('.results__not-found-text');
    this.clearList = this.clearList.bind(this);
    this.showMore = this.showMore.bind(this);
    this.today = new Date();
    this.weekBefore = new Date();
    this.weekBefore.setDate(this.today.getDate() - 7);
    this.day = this.formatDate(this.today);
    this.week = this.formatDate(this.weekBefore);
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
    this.resSection.style.display = "block";
    this.clearList();
    this.preloader.style.display = "block";
    if (this.errorRes.style.display = "flex") {
     this.errorRes.style.display = "none";
    }
    this.api.getNews(this.searchInput.value, this.day, this.week)
      .then((cards) => {
        this.preloader.style.display = "none";
        if (cards.totalResults === 0) {
          this.errorRes.style.display = "flex";
        } else {
          for (let i = 0; i < 3; i++) {
            this.addCard(cards.articles[i], this.searchInput.value);
          }
          document.querySelector('.results__content').style.display = "block";
          if (cards.totalResults > 3) {
            this.showMoreBtn.style.display = "block";
          }
        }
      })
      .catch((err) => {
        console.log(err)
        this.preloader.style.display = "none";
        this.errorRes.style.display = "flex";
        this.errText.textContent = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      })
  }

  showMore() {
    let j = this.container.children.length;
    const count = j + 3;
    this.api.getNews(this.searchInput.value, this.day, this.week)
      .then((cards) => {
        for (j; j < count; j++) {
          this.addCard(cards.articles[j], this.searchInput.value);
        }
        if (cards.length > count) {
          this.showMoreBtn.style.display = "block";
        }
      })
      .catch(err => console.log(err))
  }

  formatDate(date) {
    return `${date.getFullYear()}-${this.leftPad(date.getMonth() + 1)}-${this.leftPad(date.getDate())}`;
  }

  leftPad(num) {
    return num >= 9 ? num : `0${num}`;
  }
}