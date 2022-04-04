import { xml2json } from "./xml2json.js";

function readSpecificProductFromInventoryXML(specifications) {
  return fetch("./Data/Inventory.xml")
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      let parser = new DOMParser(),
        xmlDoc = parser.parseFromString(data, "text/xml");
      let ret = xml2json(xmlDoc, "    ");
      return ret["inventory"];
    })
    .then(function (data) {
      const ret = data["product"].filter((x) => {
        return x["id"] == specifications["id"];
      });
      return ret[0];
    });
}

async function getAllSubtotal() {
  let cart = sessionStorage.getItem("ShoppingCart");
  cart = JSON.parse(cart);
  let subtotal = 0.0;
  if (cart == null) {
    return subtotal;
  }

  for (let i = 0; i < cart.length; i++) {
    let specifications = cart[i]["specifications"];
    let quantity = cart[i]["quantity"];
    let productInfo = await readSpecificProductFromInventoryXML(specifications);

    let itemInfo = {};
    itemInfo["id"] = specifications["id"];
    itemInfo["name"] = productInfo["name"];
    itemInfo["quantity"] = quantity;

    while (productInfo.hasOwnProperty("options")) {
      let optionLabel = productInfo["options"]["label"];
      let optionDescription = null;
      for (const key of Object.keys(specifications)) {
        if (key == optionLabel) {
          optionDescription = specifications[key];
          break;
        }
      }

      let optionArray = productInfo["options"]["option"];
      if(!Array.isArray(optionArray)){
        optionArray = [optionArray]
      }
      for (let j = 0; j < optionArray.length; j++) {
        if (optionArray[j]["description"] == optionDescription) {
          itemInfo[optionLabel] = optionDescription;
          productInfo = optionArray[j];
          break;
        }
      }
    }
    itemInfo["price"] = parseFloat(productInfo["price"]);
    itemInfo["subtotal"] = itemInfo["price"] * itemInfo["quantity"];

    subtotal += itemInfo["subtotal"];
  }
  return subtotal;
}

async function refreshSubtoalTPSTVQTotal() {
  let subtotal = await getAllSubtotal();
  let textSubtotal = document.getElementById("textSubtotal");
  textSubtotal.innerHTML = "$ " + parseFloat(subtotal).toFixed(2);
  let tps = 0.05 * subtotal;
  let textTPS = document.getElementById("textTPS");
  textTPS.innerHTML = "$ " + parseFloat(tps).toFixed(2);
  let tvq = 0.09975 * subtotal;
  let textTVQ = document.getElementById("textTVQ");
  textTVQ.innerHTML = "$ " + parseFloat(tvq).toFixed(2);
  let total = subtotal + tps + tvq;
  let textTotal = document.getElementById("textTotal");
  textTotal.innerHTML = "$ " + parseFloat(total).toFixed(2);
}

window.addEventListener("load", async (event) => {
  let cart = sessionStorage.getItem("ShoppingCart");
  cart = JSON.parse(cart);

  let cartContainer = document.getElementById("cartContainer");

  if (cart == null || cart.length == 0) {
    let row = document.createElement("div");
    cartContainer.appendChild(row);
    row.classList.add("row", "my-4");

    let emptyMessage = document.createElement("h6");
    row.appendChild(emptyMessage);
    emptyMessage.innerHTML = "No Item in Cart";
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    let specifications = cart[i]["specifications"];
    let quantity = cart[i]["quantity"];
    let productInfo = await readSpecificProductFromInventoryXML(specifications);

    let itemInfo = {};
    itemInfo["id"] = specifications["id"];
    itemInfo["name"] = productInfo["name"];
    itemInfo["quantity"] = quantity;

    while (productInfo.hasOwnProperty("options")) {
      let optionLabel = productInfo["options"]["label"];
      let optionDescription = null;
      for (const key of Object.keys(specifications)) {
        if (key == optionLabel) {
          optionDescription = specifications[key];
          break;
        }
      }

      let optionArray = productInfo["options"]["option"];
      if(!Array.isArray(optionArray)){
        optionArray = [optionArray]
      }
      for (let j = 0; j < optionArray.length; j++) {
        if (optionArray[j]["description"] == optionDescription) {
          itemInfo[optionLabel] = optionDescription;
          productInfo = optionArray[j];
          break;
        }
      }
    }
    itemInfo["price"] = parseFloat(productInfo["price"]);
    itemInfo["image"] = productInfo["image"];
    itemInfo["subtotal"] = itemInfo["price"] * itemInfo["quantity"];

    let row = document.createElement("div");
    cartContainer.appendChild(row);
    row.classList.add("row", "border-top", "border-bottom", "py-4");

    let divItemImage = document.createElement("div");
    row.appendChild(divItemImage);
    divItemImage.classList.add("col-lg-2", "my-2");

    let divItemDescription = document.createElement("div");
    row.appendChild(divItemDescription);
    divItemDescription.classList.add("col-lg-4", "my-2");

    let divItemName = document.createElement("div");
    divItemDescription.appendChild(divItemName);
    divItemName.classList.add("container-fluid");

    let divItemProperties = document.createElement("div");
    divItemDescription.appendChild(divItemProperties);
    divItemProperties.classList.add("container-fluid");

    let divItemPrice = document.createElement("div");
    row.appendChild(divItemPrice);
    divItemPrice.classList.add("col-lg-2", "my-2");

    let divItemQuantity = document.createElement("div");
    row.appendChild(divItemQuantity);
    divItemQuantity.classList.add("col-lg-2", "my-2");

    let divItemSubtotal = document.createElement("div");
    row.appendChild(divItemSubtotal);
    divItemSubtotal.classList.add("col-lg-2", "my-2");

    row = document.createElement("div");
    divItemPrice.appendChild(row);
    row.classList.add("row", "container-fluid");

    let label = document.createElement("h5");
    row.appendChild(label);
    label.innerHTML = "Unit Price";

    row = document.createElement("div");
    divItemQuantity.appendChild(row);
    row.classList.add("row", "container-fluid");

    label = document.createElement("h5");
    row.appendChild(label);
    label.innerHTML = "Quantity";

    row = document.createElement("div");
    divItemSubtotal.appendChild(row);
    row.classList.add("row", "container-fluid");

    label = document.createElement("h5");
    row.appendChild(label);
    label.innerHTML = "Subtotal";

    for (const key of Object.keys(itemInfo)) {
      let value = itemInfo[key];
      switch (key) {
        case "id":
          break;
        case "name":
          row = document.createElement("div");
          divItemName.appendChild(row);
          row.classList.add("row");

          let itemName = document.createElement("h5");
          row.appendChild(itemName);
          itemName.innerHTML = value;
          break;
        case "image":
          row = document.createElement("div");
          divItemImage.appendChild(row);
          row.classList.add("row", "container-fluid");

          let image = document.createElement("img");
          row.appendChild(image);
          image.src = "./Data/" + value;
          image.classList.add("img-fluid");
          break;
        case "price":
          row = document.createElement("div");
          divItemPrice.appendChild(row);
          row.classList.add("row", "container-fluid");

          let price = document.createElement("h6");
          row.appendChild(price);
          price.innerHTML = "$ " + parseFloat(value).toFixed(2);
          break;
        case "quantity":
          row = document.createElement("div");
          divItemQuantity.appendChild(row);
          row.classList.add("row", "container-fluid");

          let inputQuantity = document.createElement("input");
          row.appendChild(inputQuantity);
          inputQuantity.classList.add("form-control");
          inputQuantity.type = "number";
          inputQuantity.min = 1;
          inputQuantity.id = "inputQuantity" + i;
          inputQuantity.value = value;
          inputQuantity.addEventListener("input", async (e) => {
            itemInfo["quantity"] = parseInt(e.target.value);
            cart[i]["quantity"] = itemInfo["quantity"];
            itemInfo["subtotal"] = itemInfo["quantity"] * itemInfo["price"];
            sessionStorage.setItem("ShoppingCart", JSON.stringify(cart));
            let subtotal = document.getElementById("textSubtotal" + i);
            subtotal.innerHTML = "$ " + parseFloat(itemInfo["subtotal"]).toFixed(2);

            refreshSubtoalTPSTVQTotal();
          });
          break;
        case "subtotal":
          row = document.createElement("div");
          divItemSubtotal.appendChild(row);
          row.classList.add("row", "container-fluid");

          let subtotal = document.createElement("h6");
          row.appendChild(subtotal);
          subtotal.innerHTML = "$ " + parseFloat(value).toFixed(2);
          subtotal.id = "textSubtotal" + i;
          break;
        default:
          row = document.createElement("div");
          divItemProperties.appendChild(row);
          row.classList.add("row");

          let property = document.createElement("h6");
          row.appendChild(property);
          property.innerHTML =
            key[0].toUpperCase() + key.substring(1) + ": " + value;
          break;
      }
    }

    row = document.createElement("div");
    divItemProperties.appendChild(row);
    row.classList.add("row");

    let buttonRemove = document.createElement("button");
    row.appendChild(buttonRemove);
    buttonRemove.classList.add("btn", "btn-outline-warning");
    buttonRemove.innerHTML = "Remove Item";
    buttonRemove.addEventListener("click", (e) => {
      for (let j = 0; j < cart.length; j++) {
        let cartSpecifications = cart[j]["specifications"];
        let isFound = true;
        for (const key of Object.keys(cartSpecifications)) {
          if (cartSpecifications[key] != itemInfo[key]) {
            isFound = false;
            break;
          }
        }
        if (isFound) {
          cart.splice(j, 1);
          sessionStorage.setItem("ShoppingCart", JSON.stringify(cart));
          break;
        }
      }
      window.location.reload();
    });
  }

  let row = document.createElement("div");
  cartContainer.appendChild(row);
  row.classList.add("row", "mt-4");

  let hr = document.createElement("hr");
  row.appendChild(hr);
  hr.style.backgrounColor = "rgb(0,0,0)";
  hr.style.height = "2px";
  hr.style.width = "75%";
  hr.classList.add("mr-0");

  row = document.createElement("div");
  cartContainer.appendChild(row);
  row.classList.add("row");

  let label = document.createElement("h5");
  row.appendChild(label);
  label.innerHTML = "Subtotal";
  label.classList.add("text-left", "col-lg-12");

  row = document.createElement("div");
  cartContainer.appendChild(row);
  row.classList.add("row");

  let textSubtotal = document.createElement("h6");
  row.appendChild(textSubtotal);
  textSubtotal.classList.add("text-right", "col-lg-12");
  textSubtotal.id = "textSubtotal";

  row = document.createElement("div");
  cartContainer.appendChild(row);
  row.classList.add("row");

  label = document.createElement("h5");
  row.appendChild(label);
  label.innerHTML = "TPS";
  label.classList.add("text-left", "col-lg-12");

  row = document.createElement("div");
  cartContainer.appendChild(row);
  row.classList.add("row");

  let textTPS = document.createElement("h6");
  row.appendChild(textTPS);
  textTPS.classList.add("text-right", "col-lg-12");
  textTPS.id = "textTPS";

  row = document.createElement("div");
  cartContainer.appendChild(row);
  row.classList.add("row");

  label = document.createElement("h5");
  row.appendChild(label);
  label.innerHTML = "TVQ";
  label.classList.add("text-left", "col-lg-12");

  row = document.createElement("div");
  cartContainer.appendChild(row);
  row.classList.add("row");

  let textTVQ = document.createElement("h6");
  row.appendChild(textTVQ);
  textTVQ.classList.add("text-right", "col-lg-12");
  textTVQ.id = "textTVQ";

  row = document.createElement("div");
  cartContainer.appendChild(row);
  row.classList.add("row");

  label = document.createElement("h5");
  row.appendChild(label);
  label.innerHTML = "Total";
  label.classList.add("text-left", "col-lg-12");

  row = document.createElement("div");
  cartContainer.appendChild(row);
  row.classList.add("row");

  let textTotal = document.createElement("h6");
  row.appendChild(textTotal);
  textTotal.classList.add("text-right", "col-lg-12");
  textTotal.id = "textTotal";

  refreshSubtoalTPSTVQTotal();
});
