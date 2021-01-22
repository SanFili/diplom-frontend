const notSavedIcon = require("../../images/save-card.svg");
const savedIcon = require("../../images/save-card-saved.svg");
const trashIcon = require("../../images/trash.svg");

export default class NewsCard {
  constructor(api, page) {
    this.api = api;
    this.page = page;
    this.icon = document.querySelector('.card__save-img');
  }

  _getCardData(cardData, key) {
    return {
      keyword: key,
      title: cardData.title,
      text: cardData.description,
      date: cardData.publishedAt,
      source: cardData.source.name,
      link: cardData.url,
      image: cardData.urlToImage
    };
  }

  _getDate(dateCard) {
    const date = new Date(dateCard);
    return `${date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    })}, ${date.getFullYear()}`;
  }

  _renderIcon(cardData) {
    const alertMsg = document.querySelector('.card__alert');
    const cardSave = document.querySelector('.card__save');
    if (this.page === "newsPage") {
      this.icon.src = trashIcon;
      alertMsg.textContent = "Убрать из сохраненных";
      const theme = `
      <p class="card__theme">${keyword}</p>`
      cardSave.insertAdjacentHTML('beforebegin', theme);
    } else if (this.page === "indexPage") {
      this.icon.src = notSavedIcon;
      alertMsg.textContent = "Войдите, чтобы сохранять статьи";
    }
  }

  createCard (cardData, keyword) {
    const template = document.createElement("div");
    template.insertAdjacentHTML('beforeend', `
      <div class="card">
        <a class="card__link" href="${cardData.link}" target="_blank">
          <div class="card__save">
            <p class="card__alert"> </p>
            <button class="card__save-btn">
              <img class="card__save-img" src=" " alt="сохранить/удалить статью">
            </button>
          </div>
          <img class="card__img" src="${cardData.image}" alt="изображение статьи">
          <div class="card__content">
            <p class="card__data"></p>
            <h3 class="card__title">${cardData.title}</h3>
            <p class="card__article">${cardData.text}</p>
            <p class="card__resource">${cardData.source}</p>
          </div>
        </a>
      </div>`
    )
    const card = template.firstElementChild;
    card.querySelector('.card__data').textContent = this._getDate(cardData.date);
    this._renderIcon(keyword);
    card.querySelector('.card__save-img').addEventListener('click', () => this._saveCard(cardData, keyword));
  }

  _saveCard(cardData, keyword) {
    if (this.icon.src === notSavedIcon) {
      this.api.createArticle(this._getCardData(cardData, keyword))
        .then((res) => {
          this.icon.src === savedIcon;
        })
        .catch((err) => alert("Ошибка"));
    } else if (this.icon.src === savedIcon || trash) {
      if (window.confirm()){
        this.api.removeArticle(cardData._id)
        .then((res) => {
          this.icon.src === notSavedIcon;
        })
        .catch(err => alert("Ошибка"))
      }
    }
  }
}