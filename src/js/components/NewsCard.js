const notSavedIcon = require("../../images/save-card.svg");
const savedIcon = require("../../images/save-card-saved.svg");
const trashIcon = require("../../images/trash.svg");

export default class NewsCard {
  constructor(api, page) {
    this.api = api;
    this.page = page;
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

  _renderTheme(keyword) {
    if (this.page === "newsPage") {
      const theme = `
       <p class="card__theme">${keyword}</p>`
       cardSave.insertAdjacentHTML('beforebegin', theme);
    }
  }

  _renderAlertMsg() {
    const alertMsg = {
      remove: "Убрать из сохраненных",
      enter: "Войдите, чтобы сохранять статьи"
    }
    if (this.page === "newsPage") {
      return alertMsg.remove
    } else if (this.page === "indexPage") {
      return alertMsg.enter
    }
  }

  _renderIcon() {
    if (this.page === "newsPage") {
      return trashIcon
    } else if (this.page === "indexPage") {
      return notSavedIcon
    }
  }

  createCard (cardData, keyword) {
    const template = document.createElement("div");
    template.insertAdjacentHTML('beforeend', `
      <div class="card">
        <a class="card__link" href="${cardData.url}" target="_blank">
          <div class="card__save">
            <p class="card__alert">${this._renderAlertMsg()}</p>
            <button class="card__save-btn">
              <img class="card__save-img" src="${this._renderIcon()}" alt="сохранить/удалить статью">
            </button>
          </div>
          <img class="card__img" src="${cardData.urlToImage}" alt="изображение статьи">
          <div class="card__content">
            <p class="card__data"></p>
            <h3 class="card__title">${cardData.title}</h3>
            <p class="card__article">${cardData.description}</p>
            <p class="card__resource">${cardData.source.name}</p>
          </div>
        </a>
      </div>`
    );
    const card = template.firstElementChild;
    card.querySelector('.card__data').textContent = this._getDate(cardData.date);
    this._renderTheme(keyword);
    card.querySelector('.card__save-img').addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('.card__save-img')) {
        this._saveCard(cardData, keyword)
      }
    });

    return card
  }

  _saveCard(cardData, keyword) {
    const icon = event.target;
    const iconUrl = icon.src.slice(22);
    if (iconUrl === notSavedIcon) {
      this.api.createArticle(this._getCardData(cardData, keyword))
        .then((res) => {
          if (res.data) {
            icon.src = `http://localhost:8080/${savedIcon}`;
          } else {
            alert("Войдите, чтобы сохранить статью");
          }
        })
        .catch((err) => console.log(err));
    } else if (iconUrl === notSavedIcon || trashIcon) {
        this.api.deleteArticle(cardData._id)
        .then((res) => {
          icon.src = `http://localhost:8080/${notSavedIcon}`;
        })
        .catch(err => console.log(err))
    }
  }
}