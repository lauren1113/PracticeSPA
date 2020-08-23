import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import "./env";

const router = new Navigo(location.origin);

router
  .on({
    "/": () => render(state.Home),
    ":page": params => {
      let routeEntered = params.page;
      let formattedRoute = capitalize(routeEntered);
      let pieceOfState = state[formattedRoute];
      render(pieceOfState);
    }
  })
  .resolve();

axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
  state.Blog.posts = response.data;
  if (router.lastRouteResolved().params) {
    const currentPage = router.lastRouteResolved().params.page;
    render(state[currentPage]);
  }
});

axios
  .get(
    "http://api.openweathermap.org/data/2.5/weather?q=st.%20louis&appid=${process.env.OWM_API_KEY}"
  )
  .then(response => {
    state.Footer.weather.city - response.data.name;
    state.Footer.weather.temp = convertKtoF(response.data.main.temp);
    state.Footer.weather.feelsLike = convertKtoF(response.data.main.feels_like);
    if (
      !router.lastRouteResolved().params ||
      router.lastRouteResolved().params.page === "Home"
    ) {
      render(state.Home);
    }
  });

function convertKtoF(temp) {
  return Math.round(((temp - 273) * 9) / 5 + 32);
}
axios
  .get(`https://api.github.com/users/lauren1113/repos`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })
  .then(response => {
    response.data.forEach(repo => console.log(repo.name));
  });

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer(state.Footer)}
  `;
  router.updatePageLinks();
  addNavEventListeners();
  addPicOnFormSubmit(st);
}

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
