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

window.addEventListener("load", async (event) => {
  let cart = sessionStorage.getItem("ShoppingCart");
  cart = JSON.parse(cart);

  console.log(cart);
  if (cart == null) {
    return;
  }

  let cartContainer = document.getElementById("cartContainer");

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
      for (let j = 0; j < optionArray.length; j++) {
        if (optionArray[i]["description"] == optionDescription) {
          itemInfo[optionLabel] = optionDescription;
          productInfo = optionArray[i];
          break;
        }
      }
    }
    itemInfo["price"] = parseFloat(productInfo["price"]);
    itemInfo["image"] = productInfo["image"];
    itemInfo["subtotal"] = itemInfo["price"] * itemInfo["quantity"];
    console.log(itemInfo);

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
          image.src = "/Data/" + value;
          image.classList.add("img-fluid");
          break;
        case "price":
          row = document.createElement("div");
          divItemPrice.appendChild(row);
          row.classList.add("row", "container-fluid");

          let price = document.createElement("h6");
          row.appendChild(price);
          price.innerHTML = "$ " + value;
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
          inputQuantity.addEventListener("input", (e) => {
            itemInfo["quantity"] = parseInt(e.target.value);
            cart[i]["quantity"] = itemInfo["quantity"];
            itemInfo["subtotal"] = itemInfo["quantity"] * itemInfo["price"];
            sessionStorage.setItem("ShoppingCart", JSON.stringify(cart));
            let subtotal = document.getElementById("textSubtotal" + i);
            subtotal.innerHTML = "$ " + itemInfo["subtotal"];
          });
          break;
        case "subtotal":
          row = document.createElement("div");
          divItemSubtotal.appendChild(row);
          row.classList.add("row", "container-fluid");

          let subtotal = document.createElement("h6");
          row.appendChild(subtotal);
          subtotal.innerHTML = "$ " + value;
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
  }

  let row = document.createElement("div");
  cartContainer.appendChild(row);
  row.classList.add("row", "mt-4");

  let hr = document.createElement('')
});
