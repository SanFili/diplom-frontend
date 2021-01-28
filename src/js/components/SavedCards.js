export default class SavedArticles{
  constructor(api, cardClass) {
    this.api = api;
    this.cardClass = cardClass;
  }

  addCard(cardData, keyword) {
    const container = document.querySelector('.cards');
    container.appendChild(this.cardClass.createCard(cardData, keyword));
  }

  renderSavedCards() {
    const mySet = new Set();
    let count = 0;
    this.api.getArticles()
      .then((cards) => {
        for (let card of cards.data) {
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
    if (themes.length === 1) {
      spanThemes.textContent = themes[0];
    } else if (themes.length === 2) {
      spanThemes.textContent = `${themes[0]} и ${themes[1]}`;
    } else if (themes.length === 3) {
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