export default class MainApi {
  constructor() {
    this.url = "api.news.students.nomoreparties.co/";
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

  signup({name, email, pass}) {
    return fetch(`https://${this.url}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        pass,
      }),
    })
    .then(res => this.checkAnswer(res));
  }

  signin(email, pass) {
    return fetch(`https://${this.url}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        pass,
      }),
    })
    .then(res => this.checkAnswer(res));
  }

  getUserData() {
    return fetch(`https://${this.url}/users/me`, {
      method: "GET",
      credentials: "include",
    })
    .then(res => this.checkAnswer(res));
  }

  getArticles() {
    return fetch(`https://${this.url}/articles`, {
      method: "GET",
      credentials: "include",
    })
    .then(res => this.checkAnswer(res));
  }

  createArticle(articleData) {
    return fetch(`https://${this.url}/articles`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: articleData.keyword,
        title: articleData.title,
        text: articleData.text,
        date: articleData.date,
        source: articleData.source,
        link: articleData.link,
        image: articleData.image,
      }),
    })
    .then(res => this.checkAnswer(res));
  }

  removeArticle(articleId) {
    return fetch(`https://${this.url}/articles/${atricleId}`, {
      method: "DELETE",
      credentials: "include",
    })
    .then(res => this.checkAnswer(res));
  }
}