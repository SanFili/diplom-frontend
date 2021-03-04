export default class NewsApi {
  constructor() {
    this.apiKey = "de5af01867b8401b84fe2105a6b0efe4";
    // this.apiKey = "d905610b9adf4166ae3f388ef3ea907a";
    this.url = "https://nomoreparties.co/news" // "https://newsapi.org";
  }

  getNews(keyWord, today, weekBefore) {
    return fetch(
      `${this.url}/v2/everything?q=${keyWord}}&from=${weekBefore}&to=${today}&sortBy=date&apiKey=${this.apiKey}`
    )
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res)
    })
    .catch((err) => {
      return Promise.reject(new Error(`Ошибка: ${err.message}`))
    });
  }
}