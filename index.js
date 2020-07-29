import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
function render(st) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
  `;
  addNavEventListeners();
  addPicOnFormSubmit(st);
}
render(state.Home);
function addNavEventListeners() {
  document.querySelectorAll("nav a").forEach(link =>
    link.addEventListener("click", event => {
      event.preventDefault();
      let linkText = event.target.textContent;
      let pieceOfState = state[linkText];
      render(pieceOfState);
    })
  );
}
function addPicOnFormSubmit(st) {
  if (st.page === "Register") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      let inputList = event.target.elements;
      console.log(inputList[0].value);
      let newPicObject = {
        title: inputList[1].value,
        url: inputList[0].value
      };
      state.Gallery.pictures.push(newPicObject);
      render(state.Gallery);
    });
  }
}
// add menu toggle to bars icon in nav bar
document.querySelector(".fa-bars").addEventListener("click", () => {
  document.querySelector("nav > ul").classList.toggle("hidden--mobile");
});
