import { xml2json } from "./xml2json.js";

async function readInventoryXML() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const operationType = urlParams.get("operationtype");

  const response = await fetch("./Data/Inventory.xml");
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(await response.text(), "text/xml");
  const json = xml2json(xmlDoc, "    ");
  const inventory = json["inventory"];

  console.log("operation type is");
  console.log(operationType);
  if (operationType == "add") {
  } else if (operationType == "update") {
    console.log("is update");
    const id = urlParams.get("id");
    let properties = inventory["product"].filter((x) => {
      return x["id"] == id;
    })[0];
    let ret = [{ id: id }];
    while (properties.hasOwnProperty("options")) {
      let options = properties["options"];
      let label = options["label"];
      const value = urlParams
        .get(label.replaceAll(" ", "-"))
        .replaceAll("-", " ");
      ret.push({ label: label, value: value });
      let optionList = options["option"];
      if (!Array.isArray(optionList)) {
        optionList = [optionList];
      }
      for (let i = 0; i < optionList.length; i++) {
        if (optionList[i]["description"] == value) {
          properties = optionList[i];
          break;
        }
      }
    }
    ret.push({ image: properties["image"] });
    ret.push({ price: properties["price"] });
    return ret;
  } else if (operationType == "addoption") {
    const id = urlParams.get("id");
    let ret = inventory["product"].filter((x) => {
      return x["id"] == id;
    })[0];
    return ret;
  } else {
    return null;
  }
}

window.addEventListener("load", async (event) => {
  let inventoryInfo = await readInventoryXML();
  console.log(inventoryInfo);
  if (Number.isInteger(inventoryInfo)) {
    // Add new product
  } else if (Array.isArray(inventoryInfo)) {
    // Update product
    let container = document.getElementById("containerProperty");

    inventoryInfo.forEach((property) => {
      if (property.hasOwnProperty("label")) {
        let row = document.createElement("div");
        row.classList.add("row", "my-2");
        container.appendChild(row);

        let col = document.createElement("div");
        col.classList.add("col-sm-6");
        row.appendChild(col);

        let label = document.createElement("label");
        label.innerHTML = property["label"];
        col.appendChild(label);

        col = document.createElement("div");
        col.classList.add("col-sm-6");
        row.appendChild(col);

        let h6 = document.createElement("h6");
        h6.innerHTML = property["value"];
        col.appendChild(h6);

        let input = document.createElement("input");
        input.hidden = true;
        input.type = "text";
        input.name = property["label"];
        input.value = property["value"];
        col.appendChild(input);
      } else if (property.hasOwnProperty("id")) {
        let inputID = document.getElementById("inputID");
        inputID.value = property["id"];
        let textID = document.getElementById("textID");
        textID.innerHTML = property["id"];
        console.log(property);
      } else if (property.hasOwnProperty("image")) {
        let inputImage = document.getElementById("inputImage");
        inputImage.value = property["image"];
      } else if (property.hasOwnProperty("price")) {
        let inputPrice = document.getElementById("inputPrice");
        inputPrice.value = property["price"];
      }
    });
  } else if (inventoryInfo != null) {
    console.log("not null");
  } else {
    // We have a problem
    console.log("We have a problem");
  }
});
