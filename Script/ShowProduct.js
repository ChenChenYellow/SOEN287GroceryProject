import { xml2json } from "./xml2json.js";

function readProductXML() {
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
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("id");
      const ret = data["product"].filter((x) => {
        return x["id"] == id;
      })[0];
      return ret;
    });
}

/*let form1 = document.getElementById('form1')
form1.addEventListener('submit', (e) => {
  e.preventDefault() //no we don't need that, we need the page to reload //or not
  console.log('submit')
  var data = new FormData()
  var items = form1.querySelectorAll(".active")
  for (const item of items) {
    data.append(item.name, item.value)
  }
  for (const [name, value] of data) {
    console.log(name, value)
  }
  console.log(e.target.submitted_value)
  console.log(e.target.submitted_name)
  document.getElementById('description').innerHTML = e.target.submitted_name + " " + e.target.submitted_value
})*/

function fetchOptions(options, containerID) {
  let container = document.getElementById(containerID);
  let row = document.createElement("div");
  container.appendChild(row);
  row.classList.add("row", "my-1", "mx-2");

  let inputGroup = document.createElement("div");
  row.appendChild(inputGroup);
  inputGroup.classList.add("input-group");

  let inputGroupPrepend = document.createElement("div");
  inputGroup.appendChild(inputGroupPrepend);
  inputGroupPrepend.classList.add("input-group-prepend");

  let inputGroupText = document.createElement("span");
  inputGroupPrepend.appendChild(inputGroupText);
  inputGroupText.classList.add("input-group-text");
  let labelValue = options["label"];
  inputGroupText.innerHTML =
    labelValue[0].toUpperCase() + labelValue.substring(1);

  let optionArray = options["option"];
  let activeOptionExist = false;
  let activeOption = 0;
  for (let i = 0; i < optionArray.length; i++) {
    let descriptionValue = optionArray[i]["description"];
    let button = document.createElement("button");
    inputGroup.appendChild(button);
    button.id = "button" + labelValue + descriptionValue;
    button.innerHTML = descriptionValue;
    button.type = "submit";
    button.classList.add("btn", "btn-outline-secondary");
    button.name = labelValue;
    button.value = descriptionValue;
    if (!container.selectedProperties.hasOwnProperty(labelValue)) {
      container.selectedProperties[labelValue] = descriptionValue;
    }
    if (container.selectedProperties[labelValue] == descriptionValue) {
      button.classList.add("active");
      activeOptionExist = true;
      activeOption = i;
    }
    button.onclick = () => {
      container.selectedProperties[labelValue] = descriptionValue;
    };
  }
  if (!activeOptionExist) {
    activeOptionExist = true;
    activeOption = 0;
    let descriptionValue = optionArray[activeOption]["description"];
    container.selectedProperties[labelValue] = descriptionValue;
    let button = document.getElementById(
      "button" + labelValue + descriptionValue
    );
    button.classList.add("active");
  }
  if (optionArray[activeOption].hasOwnProperty("options")) {
    fetchOptions(optionArray[activeOption]["options"], containerID);
  } else {
    container.selectedProperties["price"] = optionArray[activeOption]["price"];
    let inputQuantity = document.getElementById("inputQuantity");
    inputQuantity.value = 1;
    inputQuantity.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

function fetchSelectedOptionProductData(productInfo, selectedProperties) {
  let selectedOption = productInfo;
  while (selectedOption.hasOwnProperty("options")) {
    let options = selectedOption["options"];
    let label = options["label"];
    for (let i = 0; i < options["option"].length; i++) {
      if (selectedProperties[label] == options["option"][i]["description"]) {
        selectedOption = options["option"][i];
      }
    }
  }
  console.log(selectedOption);
  let image = document.getElementById("imageProduct");
  image.src = "/Data/" + selectedOption["image"];
  let description = document.getElementById("textDescriptionProperties");
  description.innerHTML = selectedOption["description"];
  let price = document.getElementById("textPrice");
  price.innerHTML = selectedOption["price"] + "$ per unit";
}

window.addEventListener("load", async (event) => {
  const productInfo = await readProductXML();
  console.log(productInfo);

  let row = document.getElementById("titleRow");
  let colTitle = document.createElement("div");
  row.appendChild(colTitle);
  colTitle.classList.add("col-lg-12", "container");

  row = document.createElement("div");
  colTitle.appendChild(row);
  row.classList.add("row");

  let h3 = document.createElement("h3");
  row.appendChild(h3);
  h3.classList.add("pb-2", "pl-4");
  h3.style.fontFamily = "Calibri, sans-serif";
  h3.innerHTML = productInfo["name"];
  document.getElementById("title").innerHTML = h3.innerHTML;

  row = document.getElementById("mainRow");
  let col = document.createElement("div");
  row.appendChild(col);
  col.classList.add("col-lg-4");
  let image = document.createElement("img");
  col.appendChild(image);
  image.classList.add("py-3", "mx-auto", "mw-100");
  image.src = "/Data/" + productInfo["image"];
  image.id = "imageProduct";

  col = document.createElement("div");
  row.appendChild(col);
  col.classList.add("col-lg-6");

  let hr = document.createElement("hr");
  col.appendChild(hr);
  hr.style.backgrounColor = "rgb(250,250,250,0.1)";
  hr.style.height = "2px";
  hr.style.width = "50%";
  hr.classList.add("ml-0");

  row = document.createElement("div");
  col.appendChild(row);
  row.classList.add("row");

  let p = document.createElement("p");
  row.appendChild(p);
  p.classList.add("py-2", "px-4");
  p.style.fontFamily = "Calibri, sans-serif";
  p.innerHTML = productInfo["description"];

  row = document.createElement("div");
  col.appendChild(row);
  row.classList.add("row");

  p = document.createElement("p");
  row.appendChild(p);
  p.classList.add("py-2", "px-4");
  p.style.fontFamily = "Calibri, sans-serif";
  p.id = "textDescriptionProperties";

  row = document.createElement("div");
  col.appendChild(row);
  row.classList.add("row");

  p = document.createElement("p");
  row.appendChild(p);
  p.classList.add("py-2", "px-4");
  p.style.fontFamily = "Calibri, sans-serif";
  p.id = "textPrice";

  row = document.createElement("div");
  col.appendChild(row);
  row.classList.add("row");

  let form = document.createElement("form");
  row.appendChild(form);
  form.classList.add("container", "mx-2");
  form.id = "formAddToCart";
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    //Here we add item & quantity to cart
  });

  row = document.createElement("div");
  form.appendChild(row);
  row.classList.add("row");

  let label = document.createElement("p");
  row.appendChild(label);
  label.classList.add("col-lg-6", "py-2");
  label.innerHTML = "Quantity of unit";

  let inputQuantity = document.createElement("input");
  row.appendChild(inputQuantity);
  inputQuantity.classList.add("form-control", "col-lg-6", "mx-3", "py-2");
  inputQuantity.type = "number";
  inputQuantity.min = 1;
  inputQuantity.id = "inputQuantity";
  inputQuantity.addEventListener("input", (e) => {
    let formProperties = document.getElementById("formProperties");
    let price = formProperties.selectedProperties["price"];
    let quantity = e.target.value;
    let total = price * quantity;
    total = Math.round(total * 100) / 100;
    let formAddToCart = document.getElementById("formAddToCart");
    formAddToCart.quantity = quantity;
    formAddToCart.total = total;
    let textTotal = document.getElementById("textTotal");
    textTotal.innerHTML = total + "$";
    console.log("Quantity " + formAddToCart.quantity);
    console.log("Total " + formAddToCart.total);
  });

  row = document.createElement("div");
  form.appendChild(row);
  row.classList.add("row");

  label = document.createElement("p");
  row.appendChild(label);
  label.classList.add("col-lg-3", "py-2");
  label.innerHTML = "Total : ";

  let total = document.createElement("p");
  row.appendChild(total);
  total.classList.add("col-lg-3", "py-2");
  total.id = "textTotal";

  let button = document.createElement("button");
  row.appendChild(button);
  button.classList.add(
    "btn",
    "btn-outline-success",
    "col-lg-6",
    "mx-3",
    "py-2",
    "submit"
  );
  button.innerHTML = "Add to cart";
  button.style.fontFamily = "Calibri, sans-serif";

  if (productInfo.hasOwnProperty("options")) {
    row = document.createElement("div");
    colTitle.appendChild(row);
    row.classList.add("row");

    let form = document.createElement("form");
    row.appendChild(form);
    form.classList.add("container");
    form.id = "formProperties";
    form.selectedProperties = {};

    let options = productInfo["options"];
    fetchOptions(options, form.id);
    fetchSelectedOptionProductData(productInfo, form.selectedProperties);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      while (e.target.firstChild) {
        e.target.removeChild(e.target.lastChild);
      }
      fetchOptions(options, form.id);
      console.log(e.target.selectedProperties);
      fetchSelectedOptionProductData(productInfo, e.target.selectedProperties);
    });
  }
});
