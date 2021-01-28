const notSavedIcon = require("../../images/save-card.svg");
const savedIcon = require("../../images/save-card-saved.svg");
const trashIcon = require("../../images/trash.svg");

export default class NewsCard {
  constructor(api, page) {
    this.api = api;
    this.page = page;
    this.cardSave = document.querySelector('.card__save');
  }

  _getCardData(cardData, key) {
    return {
      keyword: key,
      title: cardData.title,
      text: cardData.description ? cardData.description : cardData.text,
      date: cardData.publishedAt ? cardData.publishedAt : cardData.date,
      source: cardData.source.name ? cardData.source.name : cardData.source,
      link: cardData.url ? cardData.url : cardData.link,
      image: cardData.urlToImage ? cardData.urlToImage : cardData.image,
      id: cardData._id ? cardData._id : null
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
      return keyword
    } else if (this.page === "indexPage") {
      return "display: none"
    }
  }

  _renderAlertMsg() {
    const alertMsg = {
      delete: "Убрать из сохраненных",
      enter: "Войдите, чтобы сохранять статьи",
      empty: " "
    }
    if (this.page === "newsPage") {
      return alertMsg.delete
    } else if (this.page === "indexPage") {
      if (!localStorage.getItem("username")) {
        return alertMsg.enter
      } else {return "display: none"}
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
    const articleData = this._getCardData(cardData, keyword);
    const template = document.createElement("div");
    template.insertAdjacentHTML('beforeend', `
      <div class="card">
        <a class="card__link" href="${articleData.link}" target="_blank">
          <p class="card__theme" style="${this._renderTheme(keyword)}">${this._renderTheme(keyword)}</p>
          <div class="card__save">
            <p class="card__alert" style="${this._renderAlertMsg()}">${this._renderAlertMsg()}</p>
            <button class="card__save-btn">
              <img class="card__save-img" src="${this._renderIcon()}" alt="сохранить/удалить статью">
            </button>
          </div>
          <img class="card__img" src="${articleData.image}" alt="изображение статьи">
          <div class="card__content">
            <p class="card__data"></p>
            <h3 class="card__title">${articleData.title}</h3>
            <p class="card__article">${articleData.text}</p>
            <p class="card__resource">${articleData.source}</p>
          </div>
        </a>
      </div>`
    );
    const card = template.firstElementChild;
    this._renderAlertMsg();
    card.querySelector('.card__data').textContent = this._getDate(articleData.date);
    this._renderTheme(keyword);
    card.querySelector('.card__save-img').addEventListener('click', (event) => {
      event.preventDefault();
      this._saveCard(cardData, keyword)
    });

    return card
  }

  _saveCard(cardData, keyword) {
    const icon = event.target;
    const iconUrl = icon.src.slice(22);
    const articleData = this._getCardData(cardData, keyword);
    if (iconUrl === notSavedIcon) {
      if (localStorage.getItem("username")) {
        this.api.createArticle(articleData)
        .then((res) => {
          if (res.data) {
            icon.src = `http://localhost:8080/${savedIcon}`;
          } else {
            alert("Войдите, чтобы сохранить статью");
          }
        })
        .catch((err) => console.log(err));
      } else {alert("Войдите, чтобы сохранить статью");}
    } else if (iconUrl === notSavedIcon || trashIcon) {
        this.api.deleteArticle(articleData.id)
        .then((res) => {
          icon.src = `http://localhost:8080/${notSavedIcon}`;
        })
        .catch(err => console.log(err))
    }
  }
}