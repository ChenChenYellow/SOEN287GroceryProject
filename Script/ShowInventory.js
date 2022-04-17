import { xml2json } from "./xml2json.js";

async function readInventoryXML() {
  const response = await fetch("./Data/Inventory.xml");
  const data = await response.text();
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(data, "text/xml");
  let ret = xml2json(xmlDoc, "    ");
  return ret["inventory"];

function fillFormWithHiddenInput(form, propertyList) {
  for (let k = 0; k < propertyList.length; k++) {
    const property = propertyList[k];
    let input = document.createElement("input");
    input.type = "text";
    input.hidden = true;
    if (property.hasOwnProperty("id")) {
      input.value = property["id"];
      input.name = "id";
    } else if (property.hasOwnProperty("label")) {
      input.value = property["value"];
      input.name = property["label"];
    }
    form.appendChild(input);
  }
}

function loadTable(row, labels, keys, data) {
  for (let j = 0; j < labels.length; j++) {
    let fieldName = document.createElement("h5");
    row.appendChild(fieldName);
    fieldName.classList.add("col-lg-6", "border-left");
    fieldName.innerHTML = labels[j];

    let fieldValue = document.createElement("p");
    row.appendChild(fieldValue);
    fieldValue.classList.add("col-lg-6");
    fieldValue.innerHTML = data[keys[j]];
  }
}

function loadOptions(container, product, parentPropertyList) {
  let options = product["options"];

  let indexString = "";
  for (let i = 0; i < parentPropertyList.length; i++) {
    let item = parentPropertyList[i];
    if (item.hasOwnProperty("id")) {
      indexString = indexString + item["id"];
    } else if (item.hasOwnProperty("option")) {
      indexString = indexString + item["option"];
    }
  }
  indexString = indexString.replaceAll(" ", "-");
  indexString = indexString.replaceAll(".", "_");

  let cardBodyContainerRow = document.createElement("div");
  cardBodyContainerRow.classList.add("row");
  container.appendChild(cardBodyContainerRow);

  let h5 = document.createElement("h5");
  h5.classList.add("col-lg-12", "border-left");
  h5.innerHTML = options["label"].toUpperCase();
  cardBodyContainerRow.appendChild(h5);

  let accordion = document.createElement("div");
  accordion.id = "accordion" + indexString;
  accordion.classList.add("col-lg-12");
  cardBodyContainerRow.appendChild(accordion);

  let optionList = options["option"];
  if (!Array.isArray(optionList)) {
    optionList = [optionList];
  }
  for (let j = 0; j < optionList.length; j++) {
    let option = optionList[j];
    let newIndexString = indexString + option["description"];
    newIndexString = newIndexString.replaceAll(" ", "-");
    newIndexString = newIndexString.replaceAll(".", "_");

    let card = document.createElement("div");
    card.classList.add("card");
    accordion.appendChild(card);

    let cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    card.appendChild(cardHeader);

    h5 = document.createElement("h5");
    h5.innerHTML = option["description"];
    cardHeader.appendChild(h5);

    let buttonView = document.createElement("button");
    buttonView.classList.add("btn", "btn-outline-info");
    buttonView.setAttribute("data-toggle", "collapse");
    buttonView.setAttribute("data-target", "#collapse" + newIndexString);
    buttonView.innerHTML = "View";
    cardHeader.appendChild(buttonView);

    let cardBody = document.createElement("div");
    card.appendChild(cardBody);
    cardBody.classList.add("card-body", "py-0");

    let collapse = document.createElement("div");
    cardBody.appendChild(collapse);
    collapse.id = "collapse" + newIndexString;
    collapse.classList.add("collapse", "hide");

    let propertyList = JSON.parse(JSON.stringify(parentPropertyList)); // clone parent
    propertyList.push({
      "label": options["label"].replaceAll(" ", "-"),
      "value": option["description"].replaceAll(" ", "-"),
    });
    //console.log(propertyList);
    if (option.hasOwnProperty("options")) {
      loadOptions(collapse, option, propertyList);
    } else {
      collapse.classList.add("container-fluid");

      let row = document.createElement("div");
      row.classList.add("row");
      collapse.appendChild(row);

      let labels = ["Description", "Price", "Image"];
      let keys = ["description", "price", "image"];

      loadTable(row, labels, keys, option);

      let form = document.createElement("form");
      form.action = "./update_inventory.html";
      form.method = "get";
      form.classList.add("col-sm-6");
      row.appendChild(form);

      fillFormWithHiddenInput(form, propertyList);

      let btnUpdate = document.createElement("button");
      btnUpdate.type = "submit";
      btnUpdate.name = "operationtype";
      btnUpdate.value = "update";
      btnUpdate.innerHTML = "Update";
      btnUpdate.classList.add("btn", "btn-outline-warning");
      form.appendChild(btnUpdate);

      form = document.createElement("form");
      form.action = "./update_inventory.php";
      form.method = "post";
      form.classList.add("col-sm-6");
      row.appendChild(form);

      fillFormWithHiddenInput(form, propertyList);

      let btnDelete = document.createElement("button");
      btnDelete.type = "submit";
      btnDelete.name = "operationtype";
      btnDelete.value = "delete";
      btnDelete.innerHTML = "Delete";
      btnDelete.classList.add("btn", "btn-outline-danger");
      btnDelete.hidden = true;
      form.appendChild(btnDelete);
    }
  }
}

window.addEventListener("load", async (e) => {
  const inventory = await readInventoryXML();
  //console.log(inventory);

  const cardContainer = document.getElementById("cardContainer");
  let cardRow = document.createElement("div");
  cardContainer.appendChild(cardRow);
  cardRow.classList.add("row");
  for (let i = 0; i < inventory["product"].length; i++) {
    let product = inventory["product"][i];

    let card = document.createElement("div");
    cardRow.appendChild(card);
    card.classList.add("card", "col-lg-12", "px-0");

    let cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    card.appendChild(cardHeader);

    let header = document.createElement("div");
    header.classList.add("row");
    cardHeader.appendChild(header);

    let h5 = document.createElement("h5");
    h5.innerHTML = product["id"];
    h5.classList.add("col-sm-6");
    header.appendChild(h5);

    h5 = document.createElement("h5");
    h5.classList.add("col-sm-6");
    h5.innerHTML = product["name"];
    header.appendChild(h5);

    let cardBody = document.createElement("div");
    card.appendChild(cardBody);
    cardBody.classList.add(
      "card-body",
      "d-flex",
      "flex-column",
      "px-0",
      "py-0"
    );

    let labels = [
      "ID",
      "Aisle",
      "Name",
      "Image",
      "Description",
      "More Description",
    ];
    let keys = [
      "id",
      "aisle",
      "name",
      "image",
      "description",
      "moredescription",
    ];

    //console.log(product);

    let buttonView = document.createElement("button");
    buttonView.classList.add("btn", "btn-outline-info", "mx-0");
    buttonView.setAttribute("data-toggle", "collapse");
    buttonView.setAttribute("data-target", "#collapse" + i);
    buttonView.innerHTML = "View";
    cardHeader.appendChild(buttonView);

    let collapse = document.createElement("div");
    cardBody.appendChild(collapse);
    collapse.id = "collapse" + i;
    collapse.classList.add("collapse", "hide", "container");

    let row = document.createElement("div");
    row.classList.add("row");
    collapse.appendChild(row);

    loadTable(row, labels, keys, product);

    row = document.createElement("div");
    row.classList.add("row");
    collapse.appendChild(row);

    let form = document.createElement("form");
    form.action = "./update_inventory.html";
    form.method = "get";
    form.classList.add("col-sm-6");
    row.appendChild(form);

    let buttonAddOption = document.createElement("button");
    buttonAddOption.type = "submit";
    buttonAddOption.value = "addoption";
    buttonAddOption.innerHTML = "Add Option";
    buttonAddOption.name = "operationtype";
    buttonAddOption.classList.add("btn", "btn-outline-success");
    form.appendChild(buttonAddOption);

    let inputID = document.createElement("input");
    inputID.type = "text";
    inputID.name = "id";
    inputID.hidden = true;
    inputID.value = product["id"];
    form.appendChild(inputID);

    let parent = [{ "id": product["id"] }];

    if (product.hasOwnProperty("options")) {
      loadOptions(collapse, product, parent);
    }
  }
});
