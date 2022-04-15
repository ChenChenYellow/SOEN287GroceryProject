import { xml2json } from "./xml2json.js";

function readAislesXML(aisleName) {
  return fetch("./Data/Inventory.xml") // request to access xml file
    .then(function (response) { // the result of access is 'response'
      return response.text(); // we pass response.text() to the next block
    })
    .then(function (data) { // we receive response.text() and rename it 'data'
      let parser = new DOMParser(); // we parse 'data' to a json object
      let xmlDoc = parser.parseFromString(data, "text/xml");
      let ret = xml2json(xmlDoc, "    "); // the json object is called 'ret'
      return ret["inventory"]; // we pass the ret["inventory"] to next block
    })
    .then(function (data) { // we receive ret["inventory"] and rename it 'data'
      const ret = data["product"].filter((x) => { // data["product"] is an array of json, we loop through it
        return x["aisle"] == aisleName; // and select all item whose "asile" match our aisle name
      });
      return ret; // and return those selected items
    });
}

function getAisleName() {
  // Get the aisle name from the url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const aisleName = urlParams.get("aislename");
  return aisleName;
}

window.addEventListener("load", async (event) => {
  const aisleName = getAisleName();
  const products = await readAislesXML(aisleName);

  // 'products' is an array of json, containing all products of our aisle
  // Now its time fill the data to the page using html
  let aisleNameH1 = document.getElementById("aisleName");
  let words = aisleName.toLowerCase().split("_");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }
  aisleNameH1.innerHTML = words.join(" ");
  document.getElementById("title").innerHTML = aisleNameH1.innerHTML;

  let cardContainer = document.getElementById("cardContainer");
  let cardRow = document.createElement("div");
  cardContainer.appendChild(cardRow);
  cardRow.classList.add("row");
  for (let i = 0; i < products.length; i++) {
    let card = document.createElement("div");
    cardRow.appendChild(card);
    card.classList.add("shadow", "card", "col-lg-2", "mx-1", "my-2");
    card.onmouseover = function () {
      this.style.backgroundColor = "rgb(235,235,235)";
    };
    card.onmouseleave = function () {
      this.style.backgroundColor = "rgb(250,250,250)";
    };
    card.style.transition = "all 0.4s";
    let img = document.createElement("img");
    card.appendChild(img);
    img.src = "./Data/" + products[i]["image"];
    img.classList.add("card-img-top", "mt-2");
    img.alt = "Image not available";

    let cardBody = document.createElement("div");
    card.appendChild(cardBody);
    cardBody.classList.add("card-body", "d-flex", "flex-column");
    let a = document.createElement("a");
    cardBody.appendChild(a);
    a.href = "./product.html?id=" + products[i]["id"]; // When click a product, it goes to product.html with its product id in the url
    a.classList.add("text-decoration-none", "stretched-link");
    a.style.color = "inherit";
    let hr = document.createElement("hr");
    cardBody.appendChild(hr);
    hr.style.width = "90%";
    hr.style.height = "0.5px";
    hr.style.backgroundColor = "rgb(250,250,250,0.2)";
    let h5 = document.createElement("h5");
    h5.innerHTML = products[i]["name"];
    h5.classList.add("card-title", "mt-auto");
    cardBody.appendChild(h5);
  }
});
