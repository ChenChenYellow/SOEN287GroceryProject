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
  let container = document.getElementById(containerID)
  let row = document.createElement("div");
  container.appendChild(row);
  row.classList.add("row");
  let p = document.createElement('p')
  row.appendChild(p)
  let labelValue = options['label']
  p.innerHTML = labelValue


  let optionArray = options['option']
  for (let i = 0; i < optionArray.length; i++) {
    let descriptionValue = optionArray[i]['description']
    let button = document.createElement('button')
    row.appendChild(button)
    button.innerHTML = descriptionValue
    button.type = 'submit'
    button.classList.add('btn', 'btn-outline-secondary')
    button.name = labelValue
    button.value = descriptionValue
    if (!container.selectedProperties.hasOwnProperty(labelValue)) {
      container.selectedProperties[labelValue] = descriptionValue
    }
    if (container.selectedProperties[labelValue] == descriptionValue) {
      button.classList.add('active')
    }
    button.onclick = () => {
      container.selectedProperties[labelValue] = descriptionValue
    }
  }
  if (optionArray[0].hasOwnProperty('options')) {
    fetchOptions(optionArray[0]['options'], containerID)
  }
}

function fetchSelectedOptionProductData(productInfo, selectedProperties) {
  let selectedOption = productInfo
  console.log(selectedOption)
  let i = 0;
  while (selectedOption.hasOwnProperty('options')) {
    let options = selectedOption['options']
    let label = options['label']
    for (let i = 0; i < options['option'].length; i++) {
      if (selectedProperties[label] == options['option'][i]['description']) {
        console.log(true)
        selectedOption = options['option'][i]
        console.log(selectedOption)
      } else {
        console.log(false)
        console.log(selectedProperties[label])
        console.log(options['option'][i]['description'])
      }
    }
    i++;
    if (i > 2) {
      break;
    }
  }
  console.log(selectedOption)
}

window.addEventListener("load", async (event) => {
  const productInfo = await readProductXML();
  console.log(productInfo)

  let row = document.getElementById("titleRow");
  let col = document.createElement("div");
  row.appendChild(col);
  col.classList.add("col-lg-12", "container");

  row = document.createElement("div");
  col.appendChild(row);
  row.classList.add("row");

  let h3 = document.createElement("h3");
  row.appendChild(h3);
  h3.classList.add("pb-2", "pl-4");
  h3.style.fontFamily = "Calibri, sans-serif";
  h3.innerHTML = productInfo["name"];
  document.getElementById("title").innerHTML = h3.innerHTML;

  if (productInfo.hasOwnProperty("options")) {
    row = document.createElement("div");
    col.appendChild(row);
    row.classList.add("row");

    let form = document.createElement('form')
    row.appendChild(form)
    form.classList.add('container')
    form.id = 'formProperties'
    form.selectedProperties = {}

    let options = productInfo["options"];
    fetchOptions(options, form.id);

    form.addEventListener('submit', (e) => {
      e.preventDefault() //no we don't need that, we need the page to reload //or not
      /*var data = new FormData()
      var items = e.target.querySelectorAll(".active")
      for (const item of items) {
        data.append(item.name, item.value)
      }
      for (const [name, value] of data) {
        console.log(name, value)
      }*/

      console.log(e.target.selectedProperties)
      while (e.target.firstChild) {
        e.target.removeChild(e.target.lastChild)
      }
      fetchOptions(options, form.id);
      //fetchSelectedOptionProductData(productInfo, e.target.selectedProperties)
    })
  }

  row = document.getElementById("mainRow");
  col = document.createElement("div");
  row.appendChild(col);
  col.classList.add("col-lg-4");
  let image = document.createElement("img");
  col.appendChild(image);
  image.classList.add("py-3", "mx-auto", "mw-100");
  image.src = "/Data/" + productInfo["image"];

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
  p.classList.add("pt-2", "pb-2", "pl-4");
  p.style.fontFamily = "Calibri, sans-serif";
  p.innerHTML = productInfo["description"];

  row = document.createElement("div");
  col.appendChild(row);
  row.classList.add("row");

  p = document.createElement("p");
  row.appendChild(p);
  p.classList.add("pt-2", "pb-2", "pl-4");
  p.style.fontFamily = "Calibri, sans-serif";
  p.id = 'textDescriptionProperties'


  row = document.createElement("div");
  col.appendChild(row);
  row.classList.add("row");
  p = document.createElement("p");
  row.appendChild(p);
  p.classList.add("pt-2", "pb-2", "pl-4");
  p.style.fontFamily = "Calibri, sans-serif";
  p.id = 'textPrice'

  row = document.createElement("div");
  col.appendChild(row);
  row.classList.add("row");
  let button = document.createElement("button");
  row.appendChild(button);
  button.classList.add("btn", "btn-outline-success", "ml-4");
  button.innerHTML = "Add to cart";
  button.style.fontFamily = "Calibri, sans-serif";
});

