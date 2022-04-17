import { xml2json } from "./xml2json.js";

function readAislesXML(aisleName) {
  // Request to access xml file
  // The result of access is 'response'
  // We pass response.text() to the next block
  return (
    fetch("./Data/Inventory.xml")
      .then(function (response) {
        return response.text();
      })
      // We receive response.text() and rename it 'data'
      // We parse 'data' to a json object
      // The json object is called 'ret'
      // We pass the ret["inventory"] to next block
      .then(function (data) {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(data, "text/xml");
        let ret = xml2json(xmlDoc, "    ");
        return ret["inventory"];
      })
      // We receive ret["inventory"] and rename it 'data'
      // Data["product"] is an array of json, we loop through it
      // And select all item whose "asile" match our aisle name
      .then(function (data) {
        const ret = data["product"].filter((x) => {
          return x["aisle"] == aisleName;
        });
        // And return those selected items
        return ret;
      })
  );
}

function getAisleName() {
  // Get the aisle name from the url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const aisleName = urlParams.get("aislename");
  return aisleName;
}

// We add an event to window
// Whenever window load, the async (event) => {} function is called
window.addEventListener("load", async (event) => {
  const aisleName = getAisleName();
  // readAislesXML is an async function. When it is called, it will start, and we don't need to watch him do his job.
  // We will go to other thread, maybe scroll up and down the page, maybe click another button in the page, and readAislesXML will do its stuff in the back.
  // await keyword means that, we will let this thread watch him. He will signal this thread when he is done. And then this thread can continue.
  const products = await readAislesXML(aisleName);

  console.log(products);
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
    // When click a product, it goes to product.html with its product id in the url
    a.href = "./product.html?id=" + products[i]["id"];
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
