export default class NewsCardList {
  constructor(newsApi, mainApi, container, cardClass) {
    super();
    this.newsApi = newsApi;
    this.mainApi = mainApi;
    this.container = container;
    this.cardClass = cardClass;
    this.errorRes = document.querySelector('.results__not-found');
    this.searchInput = document.querySelector('.search__input');
  }

  addCard(cardData, keyword) {
    this.container.appendChild(this.cardClass.createCard(cardData, keyword));
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

  renderSavedPage() {
    const mySet = new Set();
    let count = 0;
    this.mainApi.getArticles()
      .then((cards) => {
        for (let card of cards) {
          this.addCard(card, card.keyword);
          mySet.add(card.keyword);
          count += 1;
        }
        const themes = Array.from(mySet);
        this.renderThemes(themes);
        this.renderCount(count);
      })
      .catch(err => console.log(err));
  }

  renderThemes(themes) {
    const spanThemes = document.querySelector('#themes');
    if (themes.length = 1) {
      spanThemes.textContent = `${themes[0]}`;
    } else if (themes.length = 2) {
      spanThemes.textContent = `${themes[0]} и ${themes[1]}`;
    } else if (themes.length = 3) {
      spanThemes.textContent = `${themes[0]}, ${themes[1]} и ${themes[2]}`;
    } else if (themes.length > 3) {
      spanThemes.textContent = `${themes[0]}, ${themes[1]} и ${themes.length - 2} другим`;
    }
  }

  renderCount(count) {
    const savedTitle = document.querySelector('.saved__quantity');
    savedTitle.textContent = `${localStorage.getItem("username")}, у вас ${count} сохраненных статей`;
  }
}