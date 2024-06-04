let arr = [];

const element = document.querySelector(".bottom");
const search = document.getElementById("search");
search.addEventListener("keyup", (e) => searchFilter(e));

const sortCap = document.getElementById("cap");
sortCap.addEventListener("click", () => sortByCap(arr));

const sortByPercent = document.getElementById("per");
sortByPercent.addEventListener("click", () => sortByPercentage(arr));

// consuming API using async/await
async function fetchDataAA() {
  let url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  try {
    const res = await fetch(url);
    const data = await res.json();
    arr = data;
    render(arr);
  } catch (error) {
    console.log("Error", error.message);
  }
}

// consuming API using .then()

function fetchDataT() {
  let url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      arr = data;
      render(arr);
    })
    .catch((err) => console.error(err));
}

// fetchDataAA();
fetchDataT();

function render(arr) {
  element.innerHTML = "";
  arr.forEach((coin) => {
    let newNode = document.createElement("div");
    newNode.setAttribute("class", "coin");

    let img = document.createElement("img");
    img.src = coin.image;

    let name = document.createElement("div");
    name.innerText = coin.name;
    name.setAttribute("class", "name");

    let symbol = document.createElement("div");
    symbol.innerText = coin.symbol.toUpperCase();
    symbol.setAttribute("class", "symbol");

    let current_price = document.createElement("div");
    current_price.innerText = "$" + coin.current_price;
    current_price.setAttribute("class", "current_price");

    let market_cap = document.createElement("div");
    market_cap.innerText = "Mkt Cap: " + "$" + coin.market_cap;
    market_cap.setAttribute("class", "market_cap");

    let price_change_percentage_24h = document.createElement("div");
    let val = percent(coin.price_change_percentage_24h);
    if (val >= 0) {
      price_change_percentage_24h.style.color = "green";
    } else {
      price_change_percentage_24h.style.color = "red";
    }
    price_change_percentage_24h.innerText = val + "%";
    price_change_percentage_24h.setAttribute(
      "class",
      "price_change_percentage_24h"
    );

    let total_volume = document.createElement("div");
    total_volume.innerText = coin.total_volume;
    total_volume.setAttribute("class", "total_volume");

    newNode.appendChild(img);
    newNode.appendChild(name);
    newNode.appendChild(symbol);
    newNode.appendChild(current_price);
    newNode.appendChild(total_volume);
    newNode.appendChild(price_change_percentage_24h);

    newNode.appendChild(market_cap);
    element.appendChild(newNode);
  });
}

function sortByCap(arr) {
  arr.sort((a, b) => parseFloat(a.market_cap) - parseFloat(b.market_cap));
  render(arr);
}

function sortByPercentage(arr) {
  arr.sort(
    (a, b) =>
      parseFloat(a.price_change_percentage_24h) -
      parseFloat(b.price_change_percentage_24h)
  );
  render(arr);
}

function searchFilter(e) {
  let query = e.target.value.toLowerCase();
  const arr1 = arr.filter((coin) => coin.name.toLocaleLowerCase().match(query));
  render(arr1);
}

function percent(str) {
  let val = parseFloat(str, 2).toFixed(2);
  return val;
}
