import { xml2json } from "./xml2json.js";

async function readOrdersXML() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const operationType = urlParams.get("operationtype");

  const response = await fetch("./Data/Orders.xml");
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(await response.text(), "text/xml");
  const json = xml2json(xmlDoc, "    ");
  const orders = json["orders"];

  console.log("operation type is");
  console.log(operationType);
  if (operationType == "add") {
    console.log("add");
    const last = orders["order"][orders.order.length - 1];
    const ret = parseInt(last["id"]) + 1;
    return ret;
  } else if (operationType == "update") {
    console.log("is update");
    const id = urlParams.get("id");
    let ret = orders["order"].filter((x) => {
      return x["id"] == id;
    })[0];
    return ret;
  } else {
    return null;
  }
}

function fillTable(container, count, productID, quantity) {
  let row = document.createElement("div");
  row.classList.add("row", "my-2");
  container.appendChild(row);

  let col = document.createElement("div");
  col.classList.add("col-sm-6");
  row.appendChild(col);

  let label = document.createElement("label");
  label.innerHTML = "Product ID";
  col.appendChild(label);

  col = document.createElement("div");
  col.classList.add("col-sm-6");
  row.appendChild(col);

  let input = document.createElement("input");
  input.type = "text";
  input.name = "productid" + count;
  input.value = productID;
  col.appendChild(input);

  row = document.createElement("div");
  row.classList.add("row", "my-2");
  container.appendChild(row);

  col = document.createElement("div");
  col.classList.add("col-sm-6");
  row.appendChild(col);

  label = document.createElement("label");
  label.innerHTML = "Quantity";
  col.appendChild(label);

  col = document.createElement("div");
  col.classList.add("col-sm-6");
  row.appendChild(col);

  input = document.createElement("input");
  input.type = "number";
  input.name = "quantity" + count;
  input.min = "1";
  input.value = quantity;
  col.appendChild(input);

  row = document.createElement("div");
  row.classList.add("row");
  container.appendChild(row);

  let hr = document.createElement("hr");
  hr.style.backgroundColor = "black";
  hr.style.width = "96%";
  hr.style.display = "block";
  row.appendChild(hr);
}

window.addEventListener("load", async (event) => {
  let orderInfo = await readOrdersXML();
  console.log(orderInfo);

  let count = 0;
  let inputCount = document.getElementById("inputCount");
  inputCount.value = count;

  let container = document.getElementById("containerItems");

  let buttonPlus = document.getElementById("buttonPlus");
  buttonPlus.addEventListener("click", (e) => {
    count++;
    inputCount.value = count;

    fillTable(container, count, null, null);
  });
  if (Number.isInteger(orderInfo)) {
    // Add new order
    let textTitleAdd = document.getElementById("textTitleAdd");
    textTitleAdd.hidden = false;

    let btnAdd = document.getElementById("btnAdd");
    btnAdd.hidden = false;

    let textID = document.getElementById("textID");
    textID.innerHTML = orderInfo;
    let inputID = document.getElementById("inputID");
    inputID.value = orderInfo;
    let inputUserID = document.getElementById("inputUserID");
    inputUserID.hidden = false;

    count++;
    inputCount.value = count;
    fillTable(container, count, null, null);
  } else if (orderInfo != null) {
    // Update order
    let textTitleUpdate = document.getElementById("textTitleUpdate");
    textTitleUpdate.hidden = false;

    let btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.hidden = false;

    let id = orderInfo["id"];
    let textID = document.getElementById("textID");
    textID.innerHTML = id;
    let inputID = document.getElementById("inputID");
    inputID.value = id;

    let userID = orderInfo["userid"];
    let textUserID = document.getElementById("textUserID");
    textUserID.innerHTML = userID;
    let inputUserID = document.getElementById("inputUserID");
    inputUserID.value = userID;

    let items = orderInfo["items"];
    let itemList = items["item"];
    if (!Array.isArray(itemList)) {
      itemList = [itemList];
    }
    for (let i = 0; i < itemList.length; i++) {
      let item = itemList[i];
      count++;
      inputCount.value = count;
      let productID = item["id"];
      let quantity = item["quantity"];

      fillTable(container, count, productID, quantity);
    }
  } else {
    // We have a problem
    console.log("We have a problem");
  }
});
