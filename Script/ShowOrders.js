import { xml2json } from "./xml2json.js";

async function readOrdersXML() {
  const response = await fetch("./Data/Orders.xml");
  const data = await response.text();
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(data, "text/xml");
  let ret = xml2json(xmlDoc, "    ");
  return ret["orders"];
}

function loadTable(container, labels, keys, array) {
  for (let j = 0; j < array.length; j++) {
    let row = document.createElement("div");
    row.classList.add("row", "my-2");
    container.appendChild(row);
    for (let k = 0; k < labels.length; k++) {
      let fieldName = document.createElement("h5");
      row.appendChild(fieldName);
      fieldName.classList.add("col-lg-6", "border-left");
      fieldName.innerHTML = labels[k];

      let fieldValue = document.createElement("p");
      row.appendChild(fieldValue);
      fieldValue.classList.add("col-lg-6");
      fieldValue.innerHTML = array[j][keys[k]];
    }
    row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    let hr = document.createElement("hr");
    hr.style.backgroundColor = "black";
    hr.style.width = "96%";
    hr.style.display = "block";
    row.appendChild(hr);
  }
}

window.addEventListener("load", async (event) => {
  let orders = await readOrdersXML();
  console.log(orders);
  const cardContainer = document.getElementById("cardContainer");
  let cardRow = document.createElement("div");
  cardContainer.appendChild(cardRow);
  cardRow.classList.add("row");

  let labels = ["Product ID", "Quantity"];
  let keys = ["id", "quantity"];

  for (let i = 0; i < orders["order"].length; i++) {
    let order = orders["order"][i];
    let items = order["items"];

    let card = document.createElement("div");
    cardRow.appendChild(card);
    card.classList.add("card", "col-lg-12", "px-0", "my-1");

    let cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    card.appendChild(cardHeader);

    let header = document.createElement("div");
    header.classList.add("row");
    cardHeader.appendChild(header);

    let h5 = document.createElement("h5");
    h5.innerHTML = order["id"];
    h5.classList.add("col-lg-6");
    header.appendChild(h5);

    let cardBody = document.createElement("div");
    card.appendChild(cardBody);
    cardBody.classList.add("card-body", "px-0", "py-0");

    let buttonView = document.createElement("button");
    buttonView.classList.add("btn", "btn-outline-info");
    buttonView.setAttribute("data-toggle", "collapse");
    buttonView.setAttribute("data-target", "#collapse" + i);
    buttonView.innerHTML = "View";
    cardHeader.appendChild(buttonView);

    let collapse = document.createElement("div");
    cardBody.appendChild(collapse);
    collapse.id = "collapse" + i;
    collapse.classList.add("collapse", "hide");

    let container = document.createElement("div");
    container.classList.add("container-fluid");
    collapse.appendChild(container);

    let itemList = items["item"];
    loadTable(container, labels, keys, itemList);

    let row = document.createElement("div");
    row.classList.add("row", "my-2");
    container.appendChild(row);

    let form = document.createElement("form");
    row.appendChild(form);
    form.action = "./update_order.html";
    form.method = "get";
    form.classList.add("col-sm-6");

    let button = document.createElement("button");
    button.type = "submit";
    button.classList.add("btn", "btn-outline-warning", "btn-md", "mr-1");
    button.value = "update";
    button.innerHTML = "Update";
    button.name = "operationtype";
    form.appendChild(button);

    let inputID = document.createElement("input");
    inputID.value = order["id"];
    inputID.hidden = true;
    inputID.name = "id";
    form.appendChild(inputID);

    form = document.createElement("form");
    row.appendChild(form);
    form.action = "./update_order.php";
    form.method = "post";
    form.classList.add("col-sm-6");

    inputID = document.createElement("input");
    inputID.value = order["id"];
    inputID.hidden = true;
    inputID.name = "id";
    form.appendChild(inputID);

    button = document.createElement("button");
    button.type = "submit";
    button.classList.add("btn", "btn-outline-danger", "btn-md", "ml-1");
    button.value = "delete";
    button.innerHTML = "Delete";
    button.name = "operationtype";
    form.appendChild(button);
  }
});
