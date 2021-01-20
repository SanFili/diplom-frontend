const notSavedIcon = require("../../images/save-card.svg");
const savedIcon = require("../../images/save-card-saved.svg");
const trashIcon = require("../../images/trash.svg");

export default class NewsCard {
  constructor(api, keyword, cardData, page) {
    this.api = api;
    this.keyword = keyword;
    this.cardData = cardData;
    this.page = page;
    this.icon = document.querySelector('.card__save-img');
  }

  _getCardData() {
    return {
      keyword: this.keyword,
      title: this.cardData.title,
      text: this.cardData.description,
      date: this.cardData.publishedAt,
      source: this.cardData.source.name,
      link: this.cardData.url,
      image: this.cardData.urlToImage
    };
  }

  _getDate(dateCard) {
    const date = new Date(dateCard);
    return `${date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    })}, ${date.getFullYear()}`;
  }

  _renderIcon() {
    const alertMsg = document.querySelector('.card__alert');
    const cardSave = document.querySelector('.card__save');
    if (this.page === "savedPage" ) {
      this.icon.src = trashIcon;
      alertMsg.textContent = "Убрать из сохраненных";
      const theme = `
      <p class="card__theme">${this.cardData.keyword}</p>`
      cardSave.insertAdjacentHTML('beforebegin', theme);
    } else {
      this.icon.src = notSavedIcon;
      alertMsg.textContent = "Войдите, чтобы сохранять статьи";
    }
  }

  createCard () {
    const template = document.createElement("div");
    template.insertAdjacentHTML('beforeend', `
      <div class="card">
        <a class="card__link" href="${this.cardData.link}" target="_blank">
          <div class="card__save">
            <p class="card__alert"> </p>
            <button class="card__save-btn">
              <img class="card__save-img" src=" " alt="сохранить/удалить статью">
            </button>
          </div>
          <img class="card__img" src="${this.cardData.image}" alt="изображение статьи">
          <div class="card__content">
            <p class="card__data"></p>
            <h3 class="card__title">${this.cardData.title}</h3>
            <p class="card__article">${this.cardData.text}</p>
            <p class="card__resource">${this.cardData.source}</p>
          </div>
        </a>
      </div>`
    )
    const card = template.firstElementChild;
    card.querySelector('.card__data').textContent = this._getDate(cardData.date);
    this._renderIcon();
  }
}