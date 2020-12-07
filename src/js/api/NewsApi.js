export default class NewsApi {
  constructor() {
    this.apiKey = "d905610b9adf4166ae3f388ef3ea907a";
    this.url = "https://newsapi.org";
  }

  checkAnswer(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res)
  .catch((err) => {
    return Promise.reject(new Error(`Ошибка: ${err.message}`))
  });
  }

  getNews(keyWord, today, weekBefore) {
    fetch(
      `${this.url}/v2/everything?q=${keyWord}}&from=${weekBefore}&to=${today}&sortBy=date&apiKey=${this.apiKey}`
    )
    .then(res => this.checkAnswer(res));
  }
}