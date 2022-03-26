const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
const prime = urlParams.get("prime");
const cheaper = urlParams.get("cheaper");

const endpoint = "https://relcnob.com/wp-recreate-this/wp-json/wp/v2/";
getCategories();

getProducts();

function getCategories() {
  fetch(endpoint + "categories")
    .then((res) => res.json())
    .then(setupCategories);
}

function getProducts() {
  if (id == null) {
    fetch(endpoint + "product?per_page=100&_embed")
      .then((res) => res.json())
      .then(setupProducts);
  } else {
    fetch(endpoint + "product?per_page=100&_embed&categories=" + id)
      .then((res) => res.json())
      .then(setupProducts);
  }
}

setupFiltering();

function setupFiltering() {
  // everything
  document.querySelector(".cat-filtering a").href = `index.html`;
  //   under $50
  document.querySelector(
    ".cat-filtering a:nth-child(2)"
  ).href = `index.html?cheaper=1`;
  //   prime
  document.querySelector(
    ".cat-filtering a:nth-child(3)"
  ).href = `index.html?prime=1`;
  if (id !== null) {
    document.querySelector(
      ".cat-filtering a:nth-child(2)"
    ).href = `index.html?id=${id}&cheaper=1`;
    //   prime
    document.querySelector(
      ".cat-filtering a:nth-child(3)"
    ).href = `index.html?id=${id}&prime=1`;
  }
  if (prime == null && cheaper == null) {
    document.querySelector(".cat-filtering a").classList.add("active-filter");
  } else if (cheaper !== null) {
    console.log("a");
    document
      .querySelector(".cat-filtering a:nth-child(2)")
      .classList.add("active-filter");
  } else if (prime !== null) {
    document
      .querySelector(".cat-filtering a:nth-child(3)")
      .classList.add("active-filter");
  }
}

function setupCategories(catArray) {
  const template = document.querySelector("#categorytemplate").content;
  const parentElement = document.querySelector(".categories div:first-child");
  catArray.forEach((cat) => {
    const copy = template.cloneNode(true);
    copy.querySelector("a").textContent = cat.name;
    copy.querySelector("a").href = `index.html?id=${cat.id}`;
    if (cat.id == id) {
      copy.querySelector("a").classList.add("active-link");
    }
    parentElement.appendChild(copy);
  });
}

function setupProducts(prodArray) {
  const template = document.querySelector("#productcardtemplate").content;
  const parentElement = document.querySelector(".product-list");
  if (cheaper == null && prime == null) {
    prodArray.forEach((prod) => {
      const copy = template.cloneNode(true);
      function kFormatter(num) {
        return Math.abs(num) > 999
          ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
          : Math.sign(num) * Math.abs(num);
      }
      copy.querySelector(".pc-price").textContent = "$" + prod.price;
      copy.querySelector(".pc-img-wrapper img").src =
        prod._embedded[
          "wp:featuredmedia"
        ][0].media_details.sizes.medium.source_url;
      copy.querySelector(".pc-name p:first-child").textContent =
        prod.title.rendered;
      copy.querySelector(".pc-name p:last-child").textContent =
        "by " + prod.seller;
      copy.querySelector(".pc-like").textContent = kFormatter(prod.likes);
      if (prod.verified == 1) {
        copy.querySelector(".pc-price").classList.add("verified");
      }
      copy.querySelector(".pc-user:nth-child(1) img").src =
        "https://picsum.photos/" +
        getRandomInt(50, 100) +
        "/" +
        getRandomInt(50, 100);
      copy.querySelector(".pc-user:nth-child(2) img").src =
        "https://picsum.photos/" +
        getRandomInt(50, 100) +
        "/" +
        getRandomInt(50, 100);
      copy.querySelector(".pc-user:nth-child(3) img").src =
        "https://picsum.photos/" +
        getRandomInt(50, 100) +
        "/" +
        getRandomInt(50, 100);
      copy.querySelector(".pc-user:nth-child(4) img").src =
        "https://picsum.photos/" +
        getRandomInt(50, 100) +
        "/" +
        getRandomInt(50, 100);
      copy.querySelector(".pc-user:nth-child(5) img").src =
        "https://picsum.photos/" +
        getRandomInt(50, 100) +
        "/" +
        getRandomInt(50, 100);
      parentElement.appendChild(copy);
    });
  } else if (cheaper == 1) {
    prodArray.forEach((prod) => {
      const copy = template.cloneNode(true);
      function kFormatter(num) {
        return Math.abs(num) > 999
          ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
          : Math.sign(num) * Math.abs(num);
      }
      if (prod.price < 50) {
        copy.querySelector(".pc-price").textContent = "$" + prod.price;
        copy.querySelector(".pc-img-wrapper img").src =
          prod._embedded[
            "wp:featuredmedia"
          ][0].media_details.sizes.medium.source_url;
        copy.querySelector(".pc-name p:first-child").textContent =
          prod.title.rendered;
        copy.querySelector(".pc-name p:last-child").textContent =
          "by " + prod.seller;
        copy.querySelector(".pc-like").textContent = kFormatter(prod.likes);
        if (prod.verified == 1) {
          copy.querySelector(".pc-price").classList.add("verified");
        }
        copy.querySelector(".pc-user:nth-child(1) img").src =
          "https://picsum.photos/" +
          getRandomInt(50, 100) +
          "/" +
          getRandomInt(50, 100);
        copy.querySelector(".pc-user:nth-child(2) img").src =
          "https://picsum.photos/" +
          getRandomInt(50, 100) +
          "/" +
          getRandomInt(50, 100);
        copy.querySelector(".pc-user:nth-child(3) img").src =
          "https://picsum.photos/" +
          getRandomInt(50, 100) +
          "/" +
          getRandomInt(50, 100);
        copy.querySelector(".pc-user:nth-child(4) img").src =
          "https://picsum.photos/" +
          getRandomInt(50, 100) +
          "/" +
          getRandomInt(50, 100);
        copy.querySelector(".pc-user:nth-child(5) img").src =
          "https://picsum.photos/" +
          getRandomInt(50, 100) +
          "/" +
          getRandomInt(50, 100);
        parentElement.appendChild(copy);
      }
    });
  } else if (prime == 1) {
    prodArray.forEach((prod) => {
      const copy = template.cloneNode(true);
      function kFormatter(num) {
        return Math.abs(num) > 999
          ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
          : Math.sign(num) * Math.abs(num);
      }
      if (prod.verified == 1) {
        copy.querySelector(".pc-price").textContent = "$" + prod.price;
        copy.querySelector(".pc-img-wrapper img").src =
          prod._embedded[
            "wp:featuredmedia"
          ][0].media_details.sizes.medium.source_url;
        copy.querySelector(".pc-name p:first-child").textContent =
          prod.title.rendered;
        copy.querySelector(".pc-name p:last-child").textContent =
          "by " + prod.seller;
        copy.querySelector(".pc-like").textContent = kFormatter(prod.likes);
        if (prod.verified == 1) {
          copy.querySelector(".pc-price").classList.add("verified");
        }
        copy.querySelector(".pc-user:nth-child(1) img").src =
          "https://picsum.photos/" +
          getRandomInt(50, 100) +
          "/" +
          getRandomInt(50, 100);
        copy.querySelector(".pc-user:nth-child(2) img").src =
          "https://picsum.photos/" +
          getRandomInt(50, 100) +
          "/" +
          getRandomInt(50, 100);
        copy.querySelector(".pc-user:nth-child(3) img").src =
          "https://picsum.photos/" +
          getRandomInt(50, 100) +
          "/" +
          getRandomInt(50, 100);
        copy.querySelector(".pc-user:nth-child(4) img").src =
          "https://picsum.photos/" +
          getRandomInt(50, 100) +
          "/" +
          getRandomInt(50, 100);
        copy.querySelector(".pc-user:nth-child(5) img").src =
          "https://picsum.photos/" +
          getRandomInt(50, 100) +
          "/" +
          getRandomInt(50, 100);
        parentElement.appendChild(copy);
      }
    });
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

document
  .querySelector(".close-welcome-message")
  .addEventListener("click", function () {
    document
      .querySelector("#welcome-message")
      .classList.toggle("hide-welcome-message");
  });

document
  .querySelector(".header-actions label")
  .addEventListener("click", function () {
    document
      .querySelector(".header-actions div")
      .classList.toggle("show-searchbar");
  });
document
  .querySelector(".header-actions .searchbar-wrapper span")
  .addEventListener("click", function () {
    document
      .querySelector(".header-actions div")
      .classList.toggle("show-searchbar");
  });
