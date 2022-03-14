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
    itemInfo["price"] = productInfo["price"];
    console.log(itemInfo);

    let row = document.createElement("div");
    cartContainer.appendChild(row);
  }
});
