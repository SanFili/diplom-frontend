export default class MainApi {
  constructor() {
    this.url = "api.diplom.san.students.nomoreparties.space";
  }

  checkAnswer(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res)
  .catch((err) => {
    return Promise.reject(new Error(err.status))
  });
  }

  signup({name, email, password}) {
    return fetch(`http://${this.url}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    .then(res => this.checkAnswer(res));
  }

  signin({email, password}) {
    return fetch(`http://${this.url}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(res => this.checkAnswer(res));
  }

  getUserData() {
    return fetch(`http://${this.url}/users/me`, {
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

  deleteArticle(articleId) {
    return fetch(`https://${this.url}/articles/${atricleId}`, {
      method: "DELETE",
      credentials: "include",
    })
    .then(res => this.checkAnswer(res));
  }
}