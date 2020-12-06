import "./pages/index.css";
import Popup from "./js/components/Popup";

const popup = document.querySelector(".popup");


const setPopup = new Popup(popup);

function showPopup(event) {
  if (event.target.textContent === "Войти") {
    setPopup.setEnterForm();
    setPopup.open();
  } else if (event.target.textContent === "Зарегистрироваться") {
    setPopup.setRegForm();
    setPopup.open();
  }
}

setPopup.setEventListeners(document.querySelector('.header__button'));

document.querySelector('.popup__other-btn').addEventListener('click', showPopup);