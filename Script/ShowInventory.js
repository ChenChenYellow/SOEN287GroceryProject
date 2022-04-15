import { xml2json } from "./xml2json.js";

function readInventoryXML() {
  return fetch("./Data/Inventory.xml")
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data, "text/xml");
      let ret = xml2json(xmlDoc, "    ");
      return ret["inventory"];
    });
}

window.addEventListener("load", async (e) => {
  const inventory = await readInventoryXML();
  console.log(inventory);

  const cardContainer = document.getElementById("cardContainer");
  let cardRow = document.createElement("div");
  cardContainer.appendChild(cardRow);
  cardRow.classList.add("row");
  for (let i = 0; i < inventory["product"].length; i++) {
    let product = inventory["product"][i];

    let card = document.createElement("div");
    cardRow.appendChild(card);
    card.classList.add("card", "col-lg-12");

    let cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    card.appendChild(cardHeader);

    let header = document.createElement("div");
    header.classList.add("row");
    cardHeader.appendChild(header);

    let h5 = document.createElement("h5");
    h5.innerHTML = product["id"];
    h5.classList.add("col-lg-6");
    header.appendChild(h5);

    h5 = document.createElement("h5");
    h5.classList.add("col-lg-6");
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
      "more_description",
    ];

    let accordion = document.createElement("div");
    accordion.id = "accordion" + i;
    cardBody.appendChild(accordion);

    card = document.createElement("div");
    card.classList.add("card");
    accordion.appendChild(card);

    cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    cardHeader.id = "cardheader" + i;
    card.appendChild(cardHeader);

    console.log(product);

    let buttonView = document.createElement("button");
    buttonView.classList.add("btn", "btn-outline-info");
    buttonView.setAttribute("data-toggle", "collapse");
    buttonView.setAttribute("data-target", "#collapse" + i);
    buttonView.setAttribute("aria-expanded", "true");
    buttonView.setAttribute("aria-controls", "collapse" + i);
    buttonView.innerHTML = "View";
    cardHeader.appendChild(buttonView);

    let collapse = document.createElement("div");
    card.appendChild(collapse);
    collapse.id = "collapse" + i;
    collapse.classList.add("collapse", "hide");
    collapse.setAttribute("aria-labelledby", "cardheader" + i);
    collapse.setAttribute("data-parent", "#accordion" + i);

    cardBody = document.createElement("div");
    collapse.appendChild(cardBody);
    cardBody.classList.add("card-body");

    let cardBodyContainer = document.createElement("div");
    cardBodyContainer.classList.add("container");
    cardBody.appendChild(cardBodyContainer);

    let cardBodyContainerRow = document.createElement("div");
    cardBodyContainerRow.classList.add("row");
    cardBodyContainer.appendChild(cardBodyContainerRow);

    for (let j = 0; j < labels.length; j++) {
      let fieldName = document.createElement("h5");
      cardBodyContainerRow.appendChild(fieldName);
      fieldName.classList.add("col-lg-6", "border-left");
      fieldName.innerHTML = labels[j];

      let fieldValue = document.createElement("p");
      cardBodyContainerRow.appendChild(fieldValue);
      fieldValue.classList.add("col-lg-6");
      fieldValue.innerHTML = product[keys[j]];
    }
  }
});
