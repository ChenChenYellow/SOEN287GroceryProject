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
  if (operationType == "addnewproduct") {
    console.log("add new product");
    const last = inventory["product"][inventory.product.length - 1];
    const ret = parseInt(last["id"]) + 1;
    return ret;
  } else if (operationType == "update") {
    console.log("is update");
    const id = urlParams.get("id");
    let properties = inventory["product"].filter((x) => {
      return x["id"] == id;
    })[0];
    let ret = [{ "id": id }];
    while (properties.hasOwnProperty("options")) {
      let options = properties["options"];
      let label = options["label"];
      const value = urlParams
        .get(label.replaceAll(" ", "-"))
        .replaceAll("-", " ");
      ret.push({ "label": label, "value": value });
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
    ret.push({ "image": properties["image"] });
    ret.push({ "price": properties["price"] });
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

function fillHtmlElement(container, labels, names) {
  for (let i = 0; i < labels.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row", "my-2");
    container.appendChild(row);

    let col = document.createElement("div");
    col.classList.add("col-sm-6");
    row.appendChild(col);

    let label = document.createElement("label");
    label.innerHTML = labels[i];
    label.classList.add("border-bottom");
    col.appendChild(label);

    col = document.createElement("div");
    col.classList.add("col-sm-6");
    row.appendChild(col);

    let input = document.createElement("input");
    input.type = "text";
    input.name = names[i];
    input.placeholder = labels[i];
    col.appendChild(input);
  }
}

window.addEventListener("load", async (event) => {
  let inventoryInfo = await readInventoryXML();
  console.log(inventoryInfo);
  if (Number.isInteger(inventoryInfo)) {
    // Add new product
    console.log("Add new product");
    let container = document.getElementById("containerProperty");

    let btnAddNewProduct = document.getElementById("btnAddNewProduct");
    btnAddNewProduct.hidden = false;

    let textTitleAddNewProduct = document.getElementById("textTitleAddNewProduct");
    textTitleAddNewProduct.hidden = false;

    let inputID = document.getElementById("inputID");
    inputID.value = inventoryInfo;

    let textID = document.getElementById("textID");
    textID.innerHTML = inventoryInfo;

    let labels = [
      "Name",
      "Aisle",
      "Main Image",
      "Description",
      "More Description",
    ];
    let names = [
      "name",
      "aisle",
      "mainimage",
      "description",
      "moredescription",
    ];

    fillHtmlElement(container, labels, names);

    let rowProperties = document.createElement("div");
    rowProperties.classList.add("row");
    container.appendChild(rowProperties);

    let row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    let col = document.createElement("div");
    col.classList.add("col-sm-2");
    row.appendChild(col);

    let buttonAddProperty = document.createElement("button");
    buttonAddProperty.innerHTML = "+";
    buttonAddProperty.classList.add("btn", "btn-outline-success");
    buttonAddProperty.type = "button";
    col.appendChild(buttonAddProperty);

    let inputNumberOfOption = document.createElement("input");
    inputNumberOfOption.name = "numberofoption";
    inputNumberOfOption.hidden = true;
    inputNumberOfOption.type = "number";
    inputNumberOfOption.value = 0;
    col.appendChild(inputNumberOfOption);

    let counter = 0;
    buttonAddProperty.addEventListener("click", (e) => {
      counter++;
      console.log("counter " + counter);
      let labelPlaceholder = "Option Name " + counter;
      let valuePlaceholder = "Value " + counter;
      inputNumberOfOption.value = counter;

      col = document.createElement("div");
      col.classList.add("col-sm-6", "my-2");
      rowProperties.appendChild(col);

      let inputLabel = document.createElement("input");
      inputLabel.type = "text";
      inputLabel.placeholder = labelPlaceholder;
      inputLabel.name = "label" + counter;
      inputLabel.classList.add("border-bottom", "border-top", "border-right");
      col.appendChild(inputLabel);

      col = document.createElement("div");
      col.classList.add("col-sm-6", "my-2");
      rowProperties.appendChild(col);

      let inputValue = document.createElement("input");
      inputValue.type = "text";
      inputValue.placeholder = valuePlaceholder;
      inputValue.name = "value" + counter;
      inputValue.classList.add("border-left", "border-top", "border-right");
      col.appendChild(inputValue);
    });
  } else if (Array.isArray(inventoryInfo)) {
    // Update product
    let container = document.getElementById("containerProperty");

    let textTitleUpdate = document.getElementById("textTitleUpdate");
    textTitleUpdate.hidden = false;

    let btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.hidden = false;

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
    let container = document.getElementById("containerProperty");

    let textTitleAddOption = document.getElementById("textTitleAddOption");
    textTitleAddOption.hidden = false;

    let btnAddOption = document.getElementById("btnAddOption");
    btnAddOption.hidden = false;

    let inputID = document.getElementById("inputID");
    inputID.value = inventoryInfo["id"];

    let textID = document.getElementById("textID");
    textID.innerHTML = inventoryInfo["id"];

    while (inventoryInfo.hasOwnProperty("options")) {
      let options = inventoryInfo["options"];
      let label = options["label"];

      let row = document.createElement("div");
      row.classList.add("row", "my-2");
      container.appendChild(row);

      let col = document.createElement("div");
      col.classList.add("col-sm-6");
      row.appendChild(col);

      let textLabel = document.createElement("label");
      textLabel.innerHTML = label;
      col.appendChild(textLabel);

      col = document.createElement("div");
      col.classList.add("col-sm-6");
      row.appendChild(col);

      let input = document.createElement("input");
      input.type = "text";
      input.name = label;
      col.appendChild(input);
      let optionList = options["option"];
      if (!Array.isArray(optionList)) {
        optionList = [optionList];
      }
      inventoryInfo = optionList[0];
    }
  } else {
    // We have a problem
    console.log("We have a problem");
  }
});
